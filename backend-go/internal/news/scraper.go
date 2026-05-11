package news

import (
	"fmt"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
)

// Item represents a single scraped news article card.
type Item struct {
	Title       string `json:"title"`
	URL         string `json:"url"`
	Source      string `json:"source"`
	Summary     string `json:"summary,omitempty"`
	PublishedAt string `json:"publishedAt,omitempty"`
}

// ScrapeLatest fetches fresh article links from real news websites.
func ScrapeLatest(topic string, limit int) ([]Item, error) {
	if limit <= 0 {
		limit = 10
	}
	if limit > 40 {
		limit = 40
	}

	results := make([]Item, 0, limit)
	seen := map[string]bool{}

	et, _ := scrapeEconomicTimes(topic, limit)
	for _, item := range et {
		if len(results) >= limit {
			break
		}
		if seen[item.URL] {
			continue
		}
		seen[item.URL] = true
		results = append(results, item)
	}

	mint, _ := scrapeMint(topic, limit)
	for _, item := range mint {
		if len(results) >= limit {
			break
		}
		if seen[item.URL] {
			continue
		}
		seen[item.URL] = true
		results = append(results, item)
	}

	if len(results) == 0 {
		return nil, fmt.Errorf("no live articles scraped from configured sources")
	}

	return results, nil
}

func scrapeEconomicTimes(topic string, limit int) ([]Item, error) {
	base := "https://economictimes.indiatimes.com/news"
	if strings.TrimSpace(topic) != "" {
		base = "https://economictimes.indiatimes.com/topic/" + url.PathEscape(strings.TrimSpace(topic))
	}

	doc, err := fetchDocument(base)
	if err != nil {
		return nil, err
	}

	items := make([]Item, 0, limit)
	doc.Find("a").EachWithBreak(func(_ int, sel *goquery.Selection) bool {
		if len(items) >= limit {
			return false
		}

		href, ok := sel.Attr("href")
		if !ok {
			return true
		}
		if !strings.Contains(href, "/articleshow/") {
			return true
		}

		title := strings.TrimSpace(sel.Text())
		if len(title) < 30 {
			return true
		}

		full := normalizeURL("https://economictimes.indiatimes.com", href)
		items = append(items, Item{
			Title:       title,
			URL:         full,
			Source:      "Economic Times",
			PublishedAt: time.Now().UTC().Format(time.RFC3339),
		})
		return true
	})

	return items, nil
}

func scrapeMint(topic string, limit int) ([]Item, error) {
	base := "https://www.livemint.com/latest-news"
	if strings.TrimSpace(topic) != "" {
		base = "https://www.livemint.com/search?query=" + url.QueryEscape(strings.TrimSpace(topic))
	}

	doc, err := fetchDocument(base)
	if err != nil {
		return nil, err
	}

	items := make([]Item, 0, limit)
	doc.Find("a").EachWithBreak(func(_ int, sel *goquery.Selection) bool {
		if len(items) >= limit {
			return false
		}

		href, ok := sel.Attr("href")
		if !ok {
			return true
		}
		if !strings.Contains(href, "/news/") {
			return true
		}

		title := strings.TrimSpace(sel.Text())
		if len(title) < 30 {
			return true
		}

		full := normalizeURL("https://www.livemint.com", href)
		items = append(items, Item{
			Title:       title,
			URL:         full,
			Source:      "Mint",
			PublishedAt: time.Now().UTC().Format(time.RFC3339),
		})
		return true
	})

	return items, nil
}

func fetchDocument(pageURL string) (*goquery.Document, error) {
	req, err := http.NewRequest(http.MethodGet, pageURL, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", "ArcSenseBot/1.0 (+https://github.com/Deepak-Moger/ArcSense)")

	client := &http.Client{Timeout: 20 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return nil, fmt.Errorf("scrape failed with status %d for %s", resp.StatusCode, pageURL)
	}

	return goquery.NewDocumentFromReader(resp.Body)
}

func normalizeURL(base, href string) string {
	href = strings.TrimSpace(href)
	if strings.HasPrefix(href, "http://") || strings.HasPrefix(href, "https://") {
		return href
	}
	if strings.HasPrefix(href, "//") {
		return "https:" + href
	}
	if strings.HasPrefix(href, "/") {
		return base + href
	}
	return base + "/" + href
}
