import { Persona, LanguageOption } from '@/types';

export const personas: Persona[] = [
  {
    id: 'investor',
    name: 'Investor',
    icon: '📈',
    description: 'Market impact, stock movements, portfolio relevance',
    color: 'emerald',
  },
  {
    id: 'founder',
    name: 'Startup Founder',
    icon: '🚀',
    description: 'Competitive intelligence, funding trends, action items',
    color: 'violet',
  },
  {
    id: 'student',
    name: 'Student',
    icon: '📚',
    description: 'Simplified summaries, term definitions, explainers',
    color: 'blue',
  },
  {
    id: 'journalist',
    name: 'Journalist',
    icon: '🔍',
    description: 'Source analysis, story angles, fact-check notes',
    color: 'amber',
  },
];

export const languages: LanguageOption[] = [
  { id: 'hindi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari' },
  { id: 'tamil', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil' },
  { id: 'telugu', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu' },
  { id: 'bengali', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali' },
];
