package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"arcsense/backend/internal/ai"
	"arcsense/backend/internal/news"
	"github.com/joho/godotenv"
)

type analyzeRequest struct {
	Topic string `json:"topic"`
	Limit int    `json:"limit"`
}

type analyzeResponse struct {
	Topic          string            `json:"topic"`
	FetchedAt      string            `json:"fetchedAt"`
	Articles       []news.Item       `json:"articles"`
	Timeline       []ai.TimelineEvent `json:"timeline"`
	Sentiment      ai.Sentiment      `json:"sentiment"`
	ModelOutputRaw string            `json:"modelOutputRaw"`
}

func main() {
	loadEnvFiles()

	mux := http.NewServeMux()
	mux.HandleFunc("/health", withCORS(healthHandler))
	mux.HandleFunc("/api/v1/news", withCORS(newsHandler))
	mux.HandleFunc("/api/v1/analyze", withCORS(analyzeHandler))

	port := strings.TrimSpace(os.Getenv("GO_BACKEND_PORT"))
	if port == "" {
		port = "8080"
	}

	server := &http.Server{
		Addr:              ":" + port,
		Handler:           mux,
		ReadHeaderTimeout: 10 * time.Second,
	}

	log.Printf("ArcSense Go backend running on :%s", port)
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

func loadEnvFiles() {
	// Priority order: backend local env, then repository root .env.local
	_ = godotenv.Overload(".env")
	_ = godotenv.Overload(".env.local")
	_ = godotenv.Overload("../.env.local")
}

func healthHandler(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"ok":        true,
		"service":   "arcsense-go-backend",
		"timestamp": time.Now().UTC().Format(time.RFC3339),
	})
}

func newsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}
	if r.Method != http.MethodGet {
		writeJSON(w, http.StatusMethodNotAllowed, map[string]string{"error": "method not allowed"})
		return
	}

	topic := strings.TrimSpace(r.URL.Query().Get("topic"))
	limit := 12
	if raw := strings.TrimSpace(r.URL.Query().Get("limit")); raw != "" {
		if parsed, err := strconv.Atoi(raw); err == nil {
			limit = parsed
		}
	}

	items, err := news.ScrapeLatest(topic, limit)
	if err != nil {
		writeJSON(w, http.StatusBadGateway, map[string]string{"error": err.Error()})
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"topic":     topic,
		"fetchedAt": time.Now().UTC().Format(time.RFC3339),
		"count":     len(items),
		"articles":  items,
	})
}

func analyzeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusNoContent)
		return
	}
	if r.Method != http.MethodPost {
		writeJSON(w, http.StatusMethodNotAllowed, map[string]string{"error": "method not allowed"})
		return
	}

	var req analyzeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid JSON payload"})
		return
	}
	if strings.TrimSpace(req.Topic) == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "topic is required"})
		return
	}
	if req.Limit <= 0 {
		req.Limit = 12
	}

	items, err := news.ScrapeLatest(req.Topic, req.Limit)
	if err != nil {
		writeJSON(w, http.StatusBadGateway, map[string]string{"error": err.Error()})
		return
	}

	result, rawModelOutput, err := ai.AnalyzeWithGroq(req.Topic, items)
	if err != nil {
		writeJSON(w, http.StatusBadGateway, map[string]string{"error": err.Error()})
		return
	}

	writeJSON(w, http.StatusOK, analyzeResponse{
		Topic:          req.Topic,
		FetchedAt:      time.Now().UTC().Format(time.RFC3339),
		Articles:       items,
		Timeline:       result.Timeline,
		Sentiment:      result.Sentiment,
		ModelOutputRaw: rawModelOutput,
	})
}

func withCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		next(w, r)
	}
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}
