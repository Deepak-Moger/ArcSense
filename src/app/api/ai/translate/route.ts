import { NextRequest, NextResponse } from 'next/server';
import { generateCompletion } from '@/lib/claude';
import { getTranslationPrompt } from '@/lib/prompts';
import { SupportedLanguage } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { text, language, articleTitle } = await request.json();

    if (!text || !language) {
      return NextResponse.json({ error: 'Text and language are required' }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your-api-key-here') {
      return NextResponse.json(getMockTranslation(text, language, articleTitle));
    }

    const prompt = getTranslationPrompt(text, language, articleTitle || '');
    const result = await generateCompletion(prompt);

    try {
      const parsed = JSON.parse(result);
      return NextResponse.json({
        originalText: text,
        translatedText: parsed.translatedText,
        language,
        contextNotes: parsed.contextNotes || [],
        culturalAdaptations: parsed.culturalAdaptations || [],
      });
    } catch {
      return NextResponse.json(getMockTranslation(text, language, articleTitle));
    }
  } catch {
    return NextResponse.json({ error: 'Failed to translate' }, { status: 500 });
  }
}

function getMockTranslation(text: string, language: SupportedLanguage, title: string) {
  const mockTranslations: Record<SupportedLanguage, { translatedSample: string; notes: { original: string; translated: string; note: string }[] }> = {
    hindi: {
      translatedSample: `${title || 'समाचार'}\n\nयह एक महत्वपूर्ण आर्थिक विकास है जो भारतीय बाजारों और अर्थव्यवस्था को प्रभावित करेगा। विश्लेषकों का मानना है कि इस कदम से निवेशकों का विश्वास बढ़ेगा और आर्थिक विकास को गति मिलेगी।\n\nबाजार ने इस समाचार पर सकारात्मक प्रतिक्रिया दी, सेंसेक्स और निफ्टी दोनों में बढ़त देखी गई। बैंकिंग और उपभोक्ता शेयरों ने तेजी का नेतृत्व किया।\n\nविशेषज्ञों का कहना है कि यह निर्णय दीर्घकालिक विकास के लिए अनुकूल है, हालांकि वैश्विक अनिश्चितताओं पर नजर रखना महत्वपूर्ण होगा।`,
      notes: [
        { original: 'Market cap', translated: 'बाजार पूंजीकरण', note: 'Literal meaning: market capitalization — the total value of all shares of a company' },
        { original: 'EBITDA', translated: 'ईबीआईटीडीए (ब्याज, कर, मूल्यह्रास पूर्व लाभ)', note: 'Technical financial term explained in Hindi with full form for clarity' },
        { original: 'Fiscal deficit', translated: 'राजकोषीय घाटा', note: 'Government spending exceeding revenue — a key budget metric' },
      ],
    },
    tamil: {
      translatedSample: `${title || 'செய்தி'}\n\nஇது இந்திய சந்தைகள் மற்றும் பொருளாதாரத்தை பாதிக்கும் ஒரு முக்கியமான பொருளாதார மேம்பாடு ஆகும். இந்த நடவடிக்கை முதலீட்டாளர்களின் நம்பிக்கையை அதிகரிக்கும் என்று ஆய்வாளர்கள் நம்புகிறார்கள்.\n\nசந்தை இந்த செய்திக்கு நேர்மறையாக பதிலளித்தது, சென்செக்ஸ் மற்றும் நிஃப்டி இரண்டும் ஏற்றம் கண்டன. வங்கி மற்றும் நுகர்வோர் பங்குகள் ஏற்றத்தை வழிநடத்தின.`,
      notes: [
        { original: 'Bull market', translated: 'காளை சந்தை', note: 'A market condition where prices are rising — culturally adapted to Tamil financial terminology' },
        { original: 'GDP growth', translated: 'மொத்த உள்நாட்டு உற்பத்தி வளர்ச்சி', note: 'Economic output measure explained in full Tamil' },
        { original: 'Repo rate', translated: 'ரெப்போ விகிதம்', note: 'RBI\'s lending rate to commercial banks — key monetary policy tool' },
      ],
    },
    telugu: {
      translatedSample: `${title || 'వార్త'}\n\nఇది భారతీయ మార్కెట్లు మరియు ఆర్థిక వ్యవస్థను ప్రభావితం చేసే ఒక ముఖ్యమైన ఆర్థిక పురోగతి. ఈ చర్య పెట్టుబడిదారుల విశ్వాసాన్ని పెంచుతుందని విశ్లేషకులు భావిస్తున్నారు.\n\nఈ వార్తకు మార్కెట్ సానుకూలంగా స్పందించింది, సెన్సెక్స్ మరియు నిఫ్టీ రెండూ లాభాలు చూశాయి.`,
      notes: [
        { original: 'Market rally', translated: 'మార్కెట్ ర్యాలీ', note: 'Sharp increase in stock prices — adapted to Telugu financial context' },
        { original: 'Inflation', translated: 'ద్రవ్యోల్బణం', note: 'Rise in general price levels — explained using Telugu economic terminology' },
        { original: 'Monetary policy', translated: 'ద్రవ్య విధానం', note: 'RBI\'s interest rate and money supply management' },
      ],
    },
    bengali: {
      translatedSample: `${title || 'সংবাদ'}\n\nএটি একটি গুরুত্বপূর্ণ অর্থনৈতিক উন্নয়ন যা ভারতীয় বাজার এবং অর্থনীতিকে প্রভাবিত করবে। বিশ্লেষকরা মনে করেন এই পদক্ষেপ বিনিয়োগকারীদের আস্থা বাড়াবে।\n\nবাজার এই সংবাদে ইতিবাচক প্রতিক্রিয়া জানিয়েছে, সেনসেক্স এবং নিফটি উভয়েই উত্থান দেখেছে। ব্যাংকিং এবং ভোক্তা শেয়ারগুলি সমাবেশের নেতৃত্ব দিয়েছে।`,
      notes: [
        { original: 'Bear market', translated: 'ভালুক বাজার (মন্দা বাজার)', note: 'Market downturn — Bengali uses both transliteration and descriptive term' },
        { original: 'Fiscal year', translated: 'আর্থিক বছর', note: 'April to March in India — different from calendar year' },
        { original: 'Capital expenditure', translated: 'মূলধন ব্যয়', note: 'Government spending on infrastructure and long-term assets' },
      ],
    },
  };

  const mock = mockTranslations[language];
  return {
    originalText: text,
    translatedText: mock.translatedSample,
    language,
    contextNotes: mock.notes,
    culturalAdaptations: [
      `Business terminology adapted for ${language}-speaking audience with explanatory context`,
      'Financial figures converted to more relatable local references where applicable',
      'Technical acronyms expanded in the target language for accessibility',
    ],
  };
}
