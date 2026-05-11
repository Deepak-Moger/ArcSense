package ai

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"arcsense/backend/internal/news"
)

type AnalysisResult struct {
	Timeline  []TimelineEvent `json:"timeline"`
	Sentiment Sentiment       `json:"sentiment"`
}

type TimelineEvent struct {
	Date        string `json:"date"`
	Event       string `json:"event"`
	Explanation string `json:"explanation"`
}

type Sentiment struct {
	Overall string `json:"overall"`
	Score   int    `json:"score"`
	Reason  string `json:"reason"`
}

type groqRequest struct {
	Model       string        `json:"model"`
	Temperature float64       `json:"temperature"`
	Messages    []groqMessage `json:"messages"`
}

type groqMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type groqResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
}

func AnalyzeWithGroq(topic string, items []news.Item) (*AnalysisResult, string, error) {
	apiKey := strings.TrimSpace(os.Getenv("GROQ_API_KEY"))
	if apiKey == "" {
		return nil, "", fmt.Errorf("GROQ_API_KEY is required for live GenAI analysis")
	}

	model := strings.TrimSpace(os.Getenv("GROQ_MODEL"))
	if model == "" {
		model = "llama-3.3-70b-versatile"
	}

	prompt := buildPrompt(topic, items)
	requestBody := groqRequest{
		Model:       model,
		Temperature: 0.2,
		Messages: []groqMessage{
			{Role: "system", Content: "You are a financial analyst. Output strict JSON only."},
			{Role: "user", Content: prompt},
		},
	}

	payload, err := json.Marshal(requestBody)
	if err != nil {
		return nil, "", err
	}

	req, err := http.NewRequest(http.MethodPost, "https://api.groq.com/openai/v1/chat/completions", bytes.NewReader(payload))
	if err != nil {
		return nil, "", err
	}
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 45 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return nil, "", fmt.Errorf("groq request failed with status %d", resp.StatusCode)
	}

	var parsed groqResponse
	if err := json.NewDecoder(resp.Body).Decode(&parsed); err != nil {
		return nil, "", err
	}
	if len(parsed.Choices) == 0 {
		return nil, "", fmt.Errorf("empty Groq response")
	}

	raw := strings.TrimSpace(parsed.Choices[0].Message.Content)
	cleanJSON := extractJSONObject(raw)

	var result AnalysisResult
	if err := json.Unmarshal([]byte(cleanJSON), &result); err != nil {
		return nil, raw, fmt.Errorf("failed to parse model JSON: %w", err)
	}

	return &result, raw, nil
}

func buildPrompt(topic string, items []news.Item) string {
	var b strings.Builder
	b.WriteString("Analyze the latest business news and return strict JSON with timeline and sentiment.\n")
	b.WriteString("Topic: ")
	b.WriteString(topic)
	b.WriteString("\n\nArticles:\n")

	for i, item := range items {
		b.WriteString(fmt.Sprintf("%d. [%s] %s\nURL: %s\n", i+1, item.Source, item.Title, item.URL))
	}

	b.WriteString("\nReturn JSON only in this exact shape:\n")
	b.WriteString(`{"timeline":[{"date":"YYYY-MM-DD","event":"...","explanation":"..."}],"sentiment":{"overall":"positive|neutral|negative","score":0,"reason":"..."}}`)
	b.WriteString("\nRules: timeline should have 4 to 7 items, sentiment score should be between -100 and 100.")
	return b.String()
}

func extractJSONObject(raw string) string {
	clean := strings.TrimSpace(raw)
	clean = strings.TrimPrefix(clean, "```json")
	clean = strings.TrimPrefix(clean, "```")
	clean = strings.TrimSuffix(clean, "```")
	clean = strings.TrimSpace(clean)

	start := strings.Index(clean, "{")
	end := strings.LastIndex(clean, "}")
	if start >= 0 && end > start {
		return clean[start : end+1]
	}
	return clean
}
