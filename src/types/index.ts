export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  author: string;
  date: string;
  source: string;
  imageUrl: string;
  tags: string[];
}

export type PersonaType = 'investor' | 'founder' | 'student' | 'journalist';

export interface Persona {
  id: PersonaType;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface AdaptedArticle extends Article {
  personaInsights: string;
  highlights: string[];
  relevanceScore?: number;
  actionItems?: string[];
  explainerNotes?: string[];
  sourceAnalysis?: string;
}

export interface BriefingTopic {
  id: string;
  title: string;
  description: string;
  articleCount: number;
  icon: string;
}

export interface BriefingSection {
  title: string;
  content: string;
  type: 'highlights' | 'deep-dive' | 'sector-impact' | 'expert-takes' | 'whats-next';
}

export interface Briefing {
  id: string;
  topicId: string;
  title: string;
  sections: BriefingSection[];
  generatedAt: string;
  articleIds: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface VideoSlide {
  id: string;
  type: 'title' | 'narration' | 'data' | 'quote' | 'conclusion';
  narration: string;
  displayText: string;
  duration: number;
  dataPoints?: { label: string; value: number; color?: string }[];
  quote?: { text: string; author: string };
}

export interface VideoScript {
  id: string;
  articleId: string;
  title: string;
  slides: VideoSlide[];
  totalDuration: number;
}

export interface StoryArcEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  sources: string[];
}

export interface StoryArcPlayer {
  id: string;
  name: string;
  role: string;
  description: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  imageInitials: string;
}

export interface SentimentDataPoint {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}

export interface StoryArc {
  id: string;
  title: string;
  description: string;
  category: string;
  events: StoryArcEvent[];
  players: StoryArcPlayer[];
  sentimentData: SentimentDataPoint[];
  predictions: string[];
  contrarianView: string;
}

export interface TranslationResult {
  originalText: string;
  translatedText: string;
  language: string;
  contextNotes: { original: string; translated: string; note: string }[];
  culturalAdaptations: string[];
}

export type SupportedLanguage = 'hindi' | 'tamil' | 'telugu' | 'bengali';

export interface LanguageOption {
  id: SupportedLanguage;
  name: string;
  nativeName: string;
  script: string;
}
