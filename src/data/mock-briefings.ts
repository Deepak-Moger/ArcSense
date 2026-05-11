import { Briefing, BriefingTopic } from '@/types';

export const briefingTopics: BriefingTopic[] = [
  { id: 'budget-2026', title: 'Union Budget 2026', description: 'Comprehensive analysis of FM Sitharaman\'s budget proposals, tax reforms, and market impact', articleCount: 8, icon: '📊' },
  { id: 'rbi-policy', title: 'RBI Monetary Policy', description: 'Rate decisions, inflation outlook, and impact on banking, bonds, and borrowers', articleCount: 6, icon: '🏦' },
  { id: 'startup-ecosystem', title: 'Indian Startup Ecosystem', description: 'Funding trends, IPO pipeline, and the evolving landscape of Indian startups', articleCount: 7, icon: '🚀' },
  { id: 'digital-india', title: 'Digital India Stack', description: 'UPI growth, digital payments revolution, and India\'s tech infrastructure', articleCount: 5, icon: '💳' },
  { id: 'green-energy', title: 'Green Energy Transition', description: 'Renewable energy capacity, EV adoption, and India\'s net-zero journey', articleCount: 6, icon: '🌱' },
];

export const mockBriefings: Briefing[] = [
  {
    id: 'brief-1',
    topicId: 'budget-2026',
    title: 'Union Budget 2026-27: A Growth-Oriented Blueprint',
    generatedAt: '2026-02-01T18:00:00Z',
    articleIds: ['art-1', 'art-16', 'art-21'],
    sections: [
      {
        title: 'Key Highlights',
        type: 'highlights',
        content: `The Union Budget 2026-27 delivered several landmark announcements:\n\n• **Tax Relief**: Income up to ₹12 lakh made tax-free under the new regime, benefiting 4 crore+ taxpayers. Revenue foregone estimated at ₹1.2 lakh crore.\n\n• **Capital Expenditure**: ₹11.2 lakh crore allocated for capex, up 15% YoY, with major focus on railways (₹2.8 lakh crore), highways (₹2.2 lakh crore), and urban infrastructure.\n\n• **Fiscal Discipline**: Fiscal deficit target maintained at 4.4% of GDP, balancing growth spending with consolidation.\n\n• **Green Push**: ₹12,000 crore for green hydrogen, ₹8,000 crore for EV infrastructure, and production-linked incentives for solar manufacturing expanded.\n\n• **Market Response**: Sensex surged 1,200 points; banking and consumer sectors led the rally.`,
      },
      {
        title: 'Deep Dive: Tax Reforms',
        type: 'deep-dive',
        content: `The most significant reform is the restructuring of the new tax regime. The revised slabs effectively make the first ₹12 lakh of income tax-free through a combination of standard deduction enhancement and marginal relief.\n\nFor salaried employees earning ₹15 lakh, the effective tax saving is approximately ₹42,000 annually. Those earning ₹25 lakh save around ₹1.1 lakh. The government hopes this will boost discretionary consumption, which has been sluggish in urban India.\n\nHowever, the old tax regime remains unchanged, creating a growing divergence that may eventually force a complete migration to the new regime. Tax experts note that for individuals with significant home loan interest and equity-linked savings, the old regime may still be beneficial at higher income levels.\n\nCorporate tax rates remain unchanged, but the budget introduced a 15% concessional tax rate for new manufacturing units in semiconductors and defense, valid till March 2030.`,
      },
      {
        title: 'Sector Impact',
        type: 'sector-impact',
        content: `**Banking & Financial Services**: Major beneficiary of tax cuts (more disposable income = more deposits and loan demand). HDFC Bank, ICICI Bank rose 3-4%. Home loan interest deduction limit raised to ₹3 lakh.\n\n**Consumer & FMCG**: Direct beneficiary of higher disposable incomes. HUL, ITC, Dabur gained 2-5%. Rural consumption boost expected from higher MGNREGA allocation.\n\n**Infrastructure**: ₹11.2 lakh crore capex is a massive order pipeline. L&T, Adani Ports, UltraTech Cement saw buying interest. National Infrastructure Pipeline projects worth ₹15 lakh crore to be fast-tracked.\n\n**IT Services**: Neutral impact. No significant policy changes. Digital India budget at ₹8,500 crore supports government digitization projects.\n\n**Real Estate**: Positive. Higher tax-free income + raised home loan deduction limit. Stamp duty rationalization recommended to states. DLF, Godrej Properties rallied.\n\n**Auto**: Mixed. No change in auto PLI. But EV subsidies extended and charging infra budget doubled to ₹8,000 crore.`,
      },
      {
        title: 'Expert Takes',
        type: 'expert-takes',
        content: `**Ridham Desai, MD Morgan Stanley India**: "This budget strikes the right balance between consumption boost and investment push. The tax relief will add 30-50 bps to GDP growth through the consumption multiplier."\n\n**Neelkanth Mishra, Chief Economist, Axis Bank**: "The fiscal math is credible. The government has been conservative on revenue estimates, which means there's upside risk to spending if collections surprise positively."\n\n**Sajjid Chinoy, Chief India Economist, JP Morgan**: "The shift towards consumption stimulus is welcome but the government must ensure capex execution keeps pace. The H1 capex underspend of 30% needs to be addressed."\n\n**Monika Halan, Financial Literacy Expert**: "For the first time, a budget genuinely simplifies taxation for the common person. The ₹12 lakh threshold sends a powerful signal about rewarding formal employment."`,
      },
      {
        title: 'What\'s Next',
        type: 'whats-next',
        content: `**Near-term (1-3 months)**:\n• RBI likely to view the consumption boost favorably, potentially accelerating rate cuts\n• Corporate India's Q4 results will reflect early impact of tax relief on consumer spending\n• States may follow with their own tax rationalization measures\n\n**Medium-term (3-12 months)**:\n• Infrastructure project awarding to accelerate in H1 FY27\n• FDI inflows expected to rise with improved business environment scores\n• SEBI may ease listing norms for infrastructure investment trusts\n\n**Risks to Watch**:\n• Global trade tensions and tariff escalation could offset domestic demand boost\n• Oil prices above $85/barrel would pressure fiscal math\n• Monsoon performance critical for food inflation and rural income estimates`,
      },
    ],
  },
  {
    id: 'brief-2',
    topicId: 'rbi-policy',
    title: 'RBI Policy Direction: Navigating the Easing Cycle',
    generatedAt: '2026-02-08T14:00:00Z',
    articleIds: ['art-2', 'art-12', 'art-16'],
    sections: [
      {
        title: 'Key Highlights',
        type: 'highlights',
        content: `• **Rate Decision**: MPC voted 4-2 to hold repo rate at 6.25% in February 2026 review.\n\n• **Stance Change**: Shifted to "accommodative" from "neutral" — strongest signal yet that cuts are imminent.\n\n• **Growth Upgrade**: FY27 GDP forecast revised up to 6.8% from 6.5%, reflecting confidence in domestic demand.\n\n• **Inflation Comfort**: CPI at 4.2% in January, within comfort zone. Food inflation easing with vegetable price normalization.\n\n• **Market Impact**: 10-year bond yield fell 8 bps to 6.72%. Banking stocks gained 1.5-2%. Rupee stable at 85.42.`,
      },
      {
        title: 'Deep Dive: The Easing Pathway',
        type: 'deep-dive',
        content: `Governor Malhotra's second policy review as RBI chief has laid a clear roadmap for monetary easing. The shift to accommodative stance effectively pre-commits the MPC to cutting rates unless inflation surprises significantly upward.\n\nThe 4-2 vote on the rate hold suggests that two members already wanted a cut in February. Market pricing implies a near-certain 25 bps cut in April, followed by 50 bps more through the rest of FY27.\n\nKey factors supporting the easing case:\n1. Headline CPI at 4.2% — comfortably below the 4.5% threshold that RBI traditionally targets\n2. Core inflation at 3.8% — indicating minimal demand-side pressures\n3. Global easing — Fed has cut 75 bps since Sept 2024, ECB by 100 bps\n4. Fiscal responsibility — Government's 4.4% deficit target removes fiscal dominance concerns\n\nThe terminal rate in this cycle is debated between 5.50-5.75%, implying 50-75 bps of additional cuts from current levels.`,
      },
      {
        title: 'Sector Impact',
        type: 'sector-impact',
        content: `**Banking**: Net interest margins may compress 15-20 bps over the next year as lending rates fall faster than deposit rates. CASA-heavy banks (SBI, HDFC Bank) better positioned. Credit growth to remain strong at 14-16%.\n\n**Real Estate & Housing Finance**: Home loan rates expected to fall from 8.5% to ~7.75% by March 2027. This could boost housing demand by 8-12% in the affordable segment. Housing finance companies like HDFC, LIC HFL to benefit.\n\n**NBFCs**: Lower cost of borrowing directly benefits NBFCs. Bajaj Finance, Shriram Finance likely to see margin expansion.\n\n**Bonds & Fixed Income**: 10-year G-sec yield may test 6.40% levels by year-end. Corporate bond issuance to pick up.\n\n**Equities**: Rate cuts historically supportive of equity valuations. Mid and small-cap segments may outperform.`,
      },
      {
        title: 'Expert Takes',
        type: 'expert-takes',
        content: `**A. Prasanna, Chief Economist, ICICI Securities**: "The accommodative stance is a clear green signal. We expect 75 bps of cumulative cuts by March 2027, bringing the repo rate to 5.50%."\n\n**Abheek Barua, Chief Economist, HDFC Bank**: "RBI has done well to wait for data confirmation before easing. The February pause gives them optionality while the stance change manages market expectations effectively."\n\n**Pranjul Bhandari, Chief India Economist, HSBC**: "The growth-inflation balance is the most favorable it's been in three years. RBI has the room and the reason to cut — the only question is the pace."`,
      },
      {
        title: 'What\'s Next',
        type: 'whats-next',
        content: `**April 2026 MPC**: Near-certain 25 bps cut to 6.00%. Focus on inflation projections for FY27.\n\n**Liquidity Management**: RBI to maintain surplus liquidity conditions through OMO purchases and forex intervention.\n\n**Global Risks**: US tariff escalation and oil price volatility remain key wildcards. A Fed reversal to hiking would complicate RBI's calculus.\n\n**Transmission Watch**: Banks have transmitted only 40% of the February 2025 cut. RBI may use moral suasion to accelerate deposit rate reductions.\n\n**Impact on Rupee**: The easing cycle, combined with strong FDI and portfolio inflows, should keep the rupee stable in the 84-86 range against the dollar.`,
      },
    ],
  },
  {
    id: 'brief-3',
    topicId: 'startup-ecosystem',
    title: 'Indian Startup Ecosystem: The Road to Maturity',
    generatedAt: '2026-02-16T10:00:00Z',
    articleIds: ['art-4', 'art-18', 'art-22'],
    sections: [
      {
        title: 'Key Highlights',
        type: 'highlights',
        content: `• **Funding Recovery**: Indian startups raised $18 billion in 2025, up 40% from 2024's $13 billion but still below the 2021 peak of $35 billion.\n\n• **IPO Wave**: 12 startup IPOs in 2025-26, with Ola Electric, FirstCry, and Swiggy listing successfully. Combined market cap exceeding ₹2.5 lakh crore.\n\n• **Profitability Focus**: 65% of top-100 startups now EBITDA-positive, up from 30% in 2023. Unit economics have become the primary investor metric.\n\n• **Zepto's Mega Round**: $750M at $8.5B valuation — largest round of 2026, signaling investor appetite for proven business models.\n\n• **Quick Commerce Dominance**: Fastest-growing segment at $12B GMV, with Blinkit, Zepto, and Swiggy Instamart processing 15M daily orders.`,
      },
      {
        title: 'Deep Dive: The Profitability Pivot',
        type: 'deep-dive',
        content: `The Indian startup ecosystem has undergone a fundamental transformation since the funding winter of 2022-23. The era of growth-at-all-costs has given way to a disciplined focus on unit economics and path to profitability.\n\nZepto's journey epitomizes this shift — from burning ₹300 crore monthly in 2023 to achieving EBITDA-positive operations in top cities by December 2025. The company's dark store model has matured, with average order values rising to ₹520 and delivery costs optimized through route aggregation.\n\nSimilar stories are playing out across the ecosystem. Swiggy turned restaurant delivery profitable in H1 FY26. PhonePe achieved EBITDA breakeven. Even Ola Electric, despite heavy R&D spending, showed improving contribution margins.\n\nThe public markets have reinforced this discipline. Paytm's painful post-IPO journey (stock fell 75% from listing) served as a cautionary tale. In contrast, Zomato's 5x appreciation from IPO price rewarded its profitability-first approach.`,
      },
      {
        title: 'Sector Impact',
        type: 'sector-impact',
        content: `**Quick Commerce**: The $12B category is reshaping Indian retail. Traditional retailers like DMart and Reliance Retail investing heavily in instant delivery. Dark store density in top cities approaching saturation.\n\n**Enterprise SaaS**: Quietly emerging as India's most valuable startup category. Freshworks, Zoho, and new entrants like Postman collectively serving 200,000+ global customers.\n\n**Fintech**: Regulatory tightening (digital lending guidelines, UPI interchange) has forced consolidation. Winners emerging: PhonePe, Razorpay, CRED.\n\n**EV & Climate Tech**: Attracted $3.5B in 2025. Ola Electric, Ather Energy, and Log9 Materials leading the charge.\n\n**AI/ML Startups**: Fastest-growing funding category at 85% YoY growth. Sarvam AI, Krutrim, and Fractal Analytics leading indigenous AI development.`,
      },
      {
        title: 'Expert Takes',
        type: 'expert-takes',
        content: `**Kunal Shah, Founder CRED**: "The best time to build in India is now. The infrastructure layer — payments, logistics, identity — is mature. Startups can focus on building exceptional products rather than solving plumbing problems."\n\n**Rajan Anandan, MD Sequoia Capital India**: "We're seeing the emergence of a truly world-class startup ecosystem. Indian founders are now building global products from day one, not just India-first solutions."\n\n**Nithin Kamath, CEO Zerodha**: "The IPO market has been a great filter. Companies that can stand public market scrutiny are the ones that will build lasting businesses. The froth has cleared."`,
      },
      {
        title: 'What\'s Next',
        type: 'whats-next',
        content: `**2026 IPO Pipeline**: Zepto, PhonePe, Meesho, and Lenskart are expected to file for IPOs. Combined estimated listing value: ₹3-4 lakh crore.\n\n**AI-First Startups**: The next wave of unicorns will likely be AI-native companies. India's AI startup count has grown from 500 to 3,000+ in two years.\n\n**Global Expansion**: Indian startups like Freshworks, Postman, and Razorpay are proving that Indian-built SaaS can compete globally.\n\n**Regulatory Watch**: New Digital Competition Bill and startup tax reforms (angel tax abolition) will shape the ecosystem's next phase.\n\n**Risks**: Global recession risks, geopolitical tensions affecting FDI flows, and potential regulatory overreach in fintech and AI sectors.`,
      },
    ],
  },
];
