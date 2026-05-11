import { Article } from '@/types';

export const mockArticles: Article[] = [
  {
    id: 'art-1',
    title: 'Union Budget 2026: FM Proposes ₹12 Lakh Tax-Free Income, Markets Rally',
    content: `Finance Minister Nirmala Sitharaman presented the Union Budget 2026-27 with a headline announcement of raising the tax-free income limit to ₹12 lakh, a move expected to benefit over 4 crore taxpayers. The new tax slabs under the revised regime offer significant relief to the middle class, with the government estimating a revenue foregone of ₹1.2 lakh crore.

Markets responded positively with the Sensex surging 1,200 points and the Nifty crossing the 24,500 mark within the first hour of trading. Banking and consumer stocks led the rally, with HDFC Bank gaining 4.2% and Hindustan Unilever rising 3.8%.

The budget also allocated ₹11.2 lakh crore for capital expenditure, a 15% increase over last year, with major focus on infrastructure, railways, and green energy. Defense spending was pegged at ₹7.2 lakh crore, up 9.5% from the previous year.

Economists at Goldman Sachs termed the budget "growth-oriented with fiscal prudence," noting the fiscal deficit target of 4.4% of GDP was in line with expectations. However, some analysts flagged concerns about the ambitious disinvestment target of ₹80,000 crore.`,
    summary: 'FM proposes ₹12 lakh tax-free income in Budget 2026, markets rally with Sensex up 1,200 points. CapEx allocation rises 15% to ₹11.2 lakh crore.',
    category: 'Economy',
    author: 'Deepshikha Sikarwar',
    date: '2026-02-01',
    source: 'Economic Times',
    imageUrl: '/placeholder-1.jpg',
    tags: ['budget', 'taxation', 'fiscal-policy', 'markets'],
  },
  {
    id: 'art-2',
    title: 'RBI Holds Repo Rate at 6.25% Amid Global Uncertainty, Signals Easing Bias',
    content: `The Reserve Bank of India's Monetary Policy Committee (MPC) voted 4-2 to maintain the repo rate at 6.25% in its February 2026 review, while changing its stance to "accommodative" from "neutral," signaling potential rate cuts in the upcoming meetings.

RBI Governor Sanjay Malhotra highlighted the need for caution amid volatile global capital flows and geopolitical tensions, while noting that domestic inflation had moderated to 4.2% in January, within the central bank's comfort zone. GDP growth forecast for FY27 was revised upward to 6.8% from the earlier estimate of 6.5%.

The bond market reacted positively, with the 10-year benchmark yield falling 8 basis points to 6.72%. Banking stocks gained, with SBI rising 2.1% and Bank of Baroda up 1.8%. The rupee strengthened marginally against the dollar to 85.42.

Analysts at ICICI Securities expect the RBI to deliver a 25 bps rate cut in April, followed by another 25 bps cut in June, bringing the repo rate to 5.75% by end of the fiscal year.`,
    summary: 'RBI keeps repo rate at 6.25% but shifts to accommodative stance, signaling future rate cuts. GDP forecast revised up to 6.8%.',
    category: 'Banking & Finance',
    author: 'Gayatri Nayak',
    date: '2026-02-07',
    source: 'Economic Times',
    imageUrl: '/placeholder-2.jpg',
    tags: ['rbi', 'monetary-policy', 'interest-rates', 'banking'],
  },
  {
    id: 'art-3',
    title: 'Adani Group Reports Record Q3 Earnings, EBITDA Crosses ₹25,000 Crore',
    content: `Adani Group's listed companies posted combined EBITDA of ₹25,420 crore in Q3 FY26, a 22% year-on-year increase, driven by strong performance in the ports, energy, and cement businesses. Adani Enterprises, the group's flagship, reported revenue of ₹24,800 crore, up 18% YoY.

Adani Ports and SEZ saw volume growth of 14% at its ports, handling 108 million tonnes during the quarter. The company maintained its guidance of becoming the world's largest private port operator by 2028. Adani Green Energy added 1.2 GW of operational capacity, taking its total to 12.4 GW.

The group continued its deleveraging strategy, with net debt to EBITDA ratio improving to 3.1x from 3.8x a year ago. Total group cash and equivalents stood at ₹52,000 crore, providing a comfortable liquidity buffer.

Chairman Gautam Adani stated that the group's focus on infrastructure and energy transition was yielding results, and announced plans to invest ₹80,000 crore in green hydrogen over the next five years.`,
    summary: 'Adani Group posts record Q3 EBITDA of ₹25,420 crore, up 22% YoY. Net debt ratio improves to 3.1x as deleveraging continues.',
    category: 'Corporate',
    author: 'Suman Layak',
    date: '2026-02-10',
    source: 'Economic Times',
    imageUrl: '/placeholder-3.jpg',
    tags: ['adani', 'earnings', 'infrastructure', 'green-energy'],
  },
  {
    id: 'art-4',
    title: 'Zepto Raises $750M at $8.5B Valuation, Eyes 2027 IPO',
    content: `Quick commerce startup Zepto has raised $750 million in its latest funding round at a valuation of $8.5 billion, making it one of India's most valuable startups. The Series G round was led by Lightspeed Venture Partners and General Catalyst, with participation from existing investors StepStone Group and Nexus Venture Partners.

CEO Aadit Palicha confirmed the company has turned EBITDA-positive in December 2025 across its top 8 cities and is now focused on achieving company-wide profitability by Q2 FY27. The fresh funds will be deployed for expanding the dark store network from 850 to 1,500 by March 2027.

Zepto's revenue for the nine months ended December 2025 crossed ₹8,000 crore, more than doubling from the same period last year. The company now processes over 5 million orders daily with an average delivery time of 8.5 minutes.

The funding comes ahead of Zepto's planned IPO, with Palicha indicating a public listing on Indian exchanges by mid-2027. Investment bankers at Morgan Stanley and Kotak Mahindra Capital have been appointed as lead managers for the offering.`,
    summary: 'Zepto raises $750M at $8.5B valuation, turns EBITDA-positive in top cities. Plans IPO by mid-2027 with 1,500 dark stores target.',
    category: 'Startups',
    author: 'Samidha Sharma',
    date: '2026-02-15',
    source: 'Economic Times',
    imageUrl: '/placeholder-4.jpg',
    tags: ['startup', 'funding', 'quick-commerce', 'ipo'],
  },
  {
    id: 'art-5',
    title: 'India\'s EV Sales Cross 3 Million Units in 2025, Tata Motors Leads Market',
    content: `India's electric vehicle market reached a historic milestone in 2025 with total sales crossing 3 million units, a 45% increase from 2024. Two-wheelers dominated with 2.1 million units sold, while electric cars crossed the 400,000-unit mark for the first time.

Tata Motors maintained its leadership in the electric car segment with a 62% market share, selling over 248,000 EVs. The Nexon EV continued as the bestseller, while the newly launched Curvv EV gained rapid traction with 45,000 units sold in just five months. Mahindra's XEV 9e and BE 6e captured 15% market share collectively.

The government's extension of FAME III subsidy scheme and state-level EV policies contributed significantly to adoption. Charging infrastructure saw a 3x expansion with over 15,000 fast-charging stations operational across major highways and cities.

Industry body SMEV projected EV penetration to reach 20% of total vehicle sales by 2028, up from the current 8%. Battery costs have declined 18% over the past year, with local cell manufacturing by Ola and Exide expected to further reduce costs.`,
    summary: 'India EV sales cross 3M units in 2025, up 45% YoY. Tata Motors leads with 62% market share. EV penetration projected to hit 20% by 2028.',
    category: 'Auto',
    author: 'Ketan Thakkar',
    date: '2026-01-28',
    source: 'Economic Times',
    imageUrl: '/placeholder-5.jpg',
    tags: ['ev', 'auto', 'tata-motors', 'green-transport'],
  },
  {
    id: 'art-6',
    title: 'India Proposes AI Regulation Framework, Mandates Safety Testing for Frontier Models',
    content: `The Ministry of Electronics and IT (MeitY) has released a draft framework for artificial intelligence regulation in India, proposing mandatory safety testing and risk assessment for "frontier AI models" before deployment. The Digital India AI Governance Framework applies to models with over 100 billion parameters.

Key provisions include mandatory registration of high-risk AI systems, algorithmic impact assessments, and the establishment of an AI Safety Board under MeitY. Companies deploying AI in healthcare, finance, and criminal justice will face stricter scrutiny.

Tech industry body NASSCOM expressed measured support, welcoming the "risk-based approach" while cautioning against excessive compliance burden on startups. Major tech companies including Google, Microsoft, and homegrown firms like Infosys and TCS participated in the consultation process.

The framework also proposes a "regulatory sandbox" for AI startups, allowing controlled testing of innovative applications. A dedicated ₹5,000 crore AI Innovation Fund was announced in the recent budget to support indigenous AI development.`,
    summary: 'MeitY releases draft AI regulation framework mandating safety testing for frontier models. Regulatory sandbox proposed for AI startups.',
    category: 'Technology',
    author: 'Surabhi Agarwal',
    date: '2026-02-20',
    source: 'Economic Times',
    imageUrl: '/placeholder-1.jpg',
    tags: ['ai', 'regulation', 'technology', 'policy'],
  },
  {
    id: 'art-7',
    title: 'Crypto Bill 2026: Government Plans Regulated Framework, 20% Tax on Gains Stays',
    content: `The government has introduced the Cryptocurrency Regulation Bill 2026 in the Lok Sabha, proposing a comprehensive regulatory framework for digital assets while maintaining the 20% flat tax on crypto gains and 1% TDS on transactions above ₹50,000.

The bill defines cryptocurrencies as "digital financial assets" rather than legal tender, establishing a licensing regime for exchanges and custodial services. SEBI has been designated as the primary regulator for crypto trading platforms, while RBI will oversee stablecoin issuance.

Major exchanges Binance, WazirX, and CoinDCX welcomed the regulatory clarity, with CoinDCX CEO Sumit Gupta stating that "regulatory certainty will unlock institutional participation in Indian crypto markets." The bill also mandates cold storage of at least 95% of customer assets.

Blockchain industry association IndiaCrypto estimated that the regulated framework could attract $5 billion in institutional investment over the next three years. However, the crypto tax regime continues to draw criticism, with industry players lobbying for reduction to 10%.`,
    summary: 'Crypto Regulation Bill 2026 introduced with SEBI as primary regulator. 20% flat tax on gains maintained with 1% TDS on transactions.',
    category: 'Policy',
    author: 'Saloni Shukla',
    date: '2026-02-18',
    source: 'Economic Times',
    imageUrl: '/placeholder-2.jpg',
    tags: ['crypto', 'regulation', 'digital-assets', 'sebi'],
  },
  {
    id: 'art-8',
    title: 'India-US Trade Deal: Tariff Reductions on $25B Worth of Goods Announced',
    content: `India and the United States signed a landmark trade agreement reducing tariffs on goods worth $25 billion, covering sectors including agriculture, technology hardware, and pharmaceuticals. The deal, signed during PM Modi's visit to Washington, is the most comprehensive bilateral trade pact between the two nations.

Under the agreement, India will reduce tariffs on US agricultural products including almonds, apples, and dairy by 15-25%, while the US will lower duties on Indian textiles, gems, and pharmaceuticals by 10-20%. The deal also includes provisions for mutual recognition of quality standards.

Commerce Minister Piyush Goyal described the agreement as "a new chapter in India-US economic relations," while US Trade Representative Katherine Tai called it "a win-win for businesses and consumers in both countries."

Indian pharmaceutical exporters stand to benefit significantly, with industry body Pharmexcil estimating an additional $3 billion in exports over the next three years. IT services were kept outside the scope of this agreement, with separate negotiations ongoing.`,
    summary: 'India-US trade deal covers $25B in goods with tariff reductions of 15-25%. Indian pharma and textiles among key beneficiaries.',
    category: 'Trade',
    author: 'Arun S',
    date: '2026-02-25',
    source: 'Economic Times',
    imageUrl: '/placeholder-3.jpg',
    tags: ['trade', 'india-us', 'tariffs', 'commerce'],
  },
  {
    id: 'art-9',
    title: 'IT Sector Q3 Results: TCS, Infosys Beat Estimates on Strong Deal Wins',
    content: `India's top IT companies reported better-than-expected Q3 FY26 results, with TCS and Infosys beating street estimates on revenue and deal wins. TCS reported revenue of ₹64,500 crore, up 6.2% YoY in constant currency, while net profit grew 11% to ₹12,800 crore.

Infosys raised its FY26 revenue growth guidance to 5-6% from 4-5%, citing strong demand in AI transformation and cloud migration projects. The company signed large deals worth $4.2 billion during the quarter, the highest in six quarters.

Wipro showed improvement with 2.8% sequential growth, ending four quarters of decline. HCLTech maintained its momentum with 7.1% YoY growth, led by its engineering and R&D services segment.

Industry analysts noted that AI-related services are emerging as a new growth driver, with GenAI projects contributing 3-5% of overall revenue for top-tier IT firms. NASSCOM estimated that AI services could add $50 billion to India's IT export revenue by 2030.`,
    summary: 'TCS and Infosys beat Q3 estimates with strong deal wins. Infosys raises FY26 guidance. AI services emerge as key growth driver.',
    category: 'Technology',
    author: 'Jochelle Mendonca',
    date: '2026-01-15',
    source: 'Economic Times',
    imageUrl: '/placeholder-4.jpg',
    tags: ['it-sector', 'tcs', 'infosys', 'earnings'],
  },
  {
    id: 'art-10',
    title: 'Real Estate Boom: Housing Sales in Top 7 Cities Hit All-Time High in 2025',
    content: `Residential real estate in India's top 7 cities recorded sales of 4.8 lakh units in 2025, the highest ever, driven by strong demand in the ₹80 lakh to ₹2 crore segment. Mumbai Metropolitan Region led with 1.35 lakh units, followed by Pune (72,000) and Bengaluru (68,000).

Developers like Godrej Properties, DLF, and Prestige Estates reported record pre-sales during the year. Godrej Properties crossed ₹28,000 crore in bookings, a 35% YoY increase, while DLF's luxury segment saw 2x demand growth.

The premium and luxury segments (above ₹2 crore) grew fastest at 52% YoY, reflecting the growing affluence of India's upper-middle class. New project launches totaled 5.2 lakh units, indicating strong developer confidence.

Knight Frank India's chairman noted that "the Indian real estate market has entered a structural upcycle supported by rising incomes, urbanization, and favorable home loan rates." Unsold inventory across top cities declined to 18-month levels from 24 months two years ago.`,
    summary: 'Housing sales in top 7 cities hit all-time high of 4.8 lakh units in 2025. Luxury segment grows 52% YoY. Unsold inventory at 18-month low.',
    category: 'Real Estate',
    author: 'Kailash Babar',
    date: '2026-01-20',
    source: 'Economic Times',
    imageUrl: '/placeholder-5.jpg',
    tags: ['real-estate', 'housing', 'property', 'construction'],
  },
  {
    id: 'art-11',
    title: 'Pharma Exports Surge 18% to $32 Billion in 2025, US Remains Top Market',
    content: `India's pharmaceutical exports surged 18% to $32 billion in calendar year 2025, with the United States remaining the largest market accounting for 31% of total exports. Generic medicines drove the growth, with biosimilars emerging as the fastest-growing sub-segment.

Sun Pharma, Dr Reddy's, and Cipla led the export growth, with Sun Pharma's US sales crossing $2.5 billion. The company's specialty portfolio, including Ilumya and Winlevi, contributed significantly to the premium product mix.

India's share in global generic medicines supply increased to 22% from 20% in 2024. The government's PLI scheme for pharmaceuticals disbursed ₹4,500 crore in incentives during the year, supporting capacity expansion in API manufacturing.

The WHO prequalification of 12 new Indian vaccine facilities also boosted the country's position in the global healthcare supply chain. Industry body Pharmexcil projected exports to touch $40 billion by 2028.`,
    summary: 'India pharma exports hit $32B in 2025, up 18%. Biosimilars fastest growing segment. PLI scheme disburses ₹4,500 crore in incentives.',
    category: 'Pharma',
    author: 'Vikas Dandekar',
    date: '2026-02-05',
    source: 'Economic Times',
    imageUrl: '/placeholder-1.jpg',
    tags: ['pharma', 'exports', 'healthcare', 'generics'],
  },
  {
    id: 'art-12',
    title: 'Banking NPAs Fall to Decade Low of 2.8%, Credit Growth Robust at 15%',
    content: `Indian banks' gross non-performing assets (NPAs) declined to a decade-low of 2.8% of total advances in December 2025, down from 3.2% in March 2025, reflecting improved asset quality across the sector. Net NPAs stood at 0.6%, the lowest since 2011.

Credit growth remained robust at 15.2% YoY, led by retail loans (19%) and MSME lending (22%). However, unsecured lending growth moderated to 16% from 24% a year ago following RBI's risk-weight guidelines.

State Bank of India reported its best-ever quarterly profit of ₹19,500 crore in Q3 FY26, with return on equity improving to 21%. Private banks HDFC Bank and ICICI Bank also posted strong results with 18% and 25% profit growth respectively.

RBI's Financial Stability Report noted that the Indian banking system's capital adequacy ratio at 16.8% was well above the regulatory minimum of 11.5%, providing ample buffer for future growth.`,
    summary: 'Bank NPAs at decade low of 2.8%. Credit growth strong at 15.2%. SBI posts record ₹19,500 crore quarterly profit.',
    category: 'Banking & Finance',
    author: 'MC Govardhana Rangan',
    date: '2026-02-12',
    source: 'Economic Times',
    imageUrl: '/placeholder-2.jpg',
    tags: ['banking', 'npa', 'credit', 'sbi'],
  },
  {
    id: 'art-13',
    title: 'UPI Transactions Cross 20 Billion Monthly, India Stack Goes Global',
    content: `India's Unified Payments Interface (UPI) crossed 20 billion monthly transactions in January 2026, processing payments worth ₹24 lakh crore. The platform now has 450 million active users, covering 65% of India's adult population.

NPCI International signed agreements with 12 new countries for UPI deployment, bringing the total to 23 nations. Singapore and UAE saw the highest overseas UPI adoption, with cross-border remittance volume growing 180% YoY.

PhonePe maintained market leadership with 48% transaction share, followed by Google Pay at 36% and Paytm at 11%. PhonePe processed over 9.6 billion transactions during the month, a company record.

The success of UPI has positioned India as a global leader in digital payments infrastructure. The World Bank cited India Stack as a "model for developing nations" and recommended its adoption framework for 15 emerging economies.`,
    summary: 'UPI crosses 20B monthly transactions worth ₹24 lakh crore. NPCI signs up 12 new countries for UPI deployment.',
    category: 'Technology',
    author: 'Pratik Bhakta',
    date: '2026-02-08',
    source: 'Economic Times',
    imageUrl: '/placeholder-3.jpg',
    tags: ['upi', 'digital-payments', 'fintech', 'npci'],
  },
  {
    id: 'art-14',
    title: 'Green Energy: India Adds 25 GW Renewable Capacity in 2025, Solar Leads',
    content: `India added a record 25 GW of renewable energy capacity in calendar year 2025, taking total installed renewable capacity to 220 GW. Solar energy led with 18 GW additions, followed by wind at 5 GW and hybrid projects at 2 GW.

Adani Green Energy and NTPC Green Energy were the top capacity adders, with 4.5 GW and 3.2 GW respectively. Reliance Industries commenced operations at its Jamnagar solar giga-factory, with initial module production capacity of 10 GW.

The government's target of 500 GW non-fossil fuel capacity by 2030 is now considered achievable, with CRISIL estimating India will reach 480-520 GW. Tariffs for solar projects hit a record low of ₹2.15 per unit, making solar cheaper than new coal capacity.

Green hydrogen projects worth $12 billion were announced during the year, with ACME Group and Indian Oil leading the charge. The National Green Hydrogen Mission aims for 5 million tonnes annual production capacity by 2030.`,
    summary: 'India adds record 25 GW renewable capacity in 2025. Solar tariffs hit ₹2.15/unit low. 500 GW target by 2030 looks achievable.',
    category: 'Energy',
    author: 'Sarita Singh',
    date: '2026-01-25',
    source: 'Economic Times',
    imageUrl: '/placeholder-4.jpg',
    tags: ['renewable-energy', 'solar', 'green-hydrogen', 'sustainability'],
  },
  {
    id: 'art-15',
    title: 'Semiconductor Push: Tata-PSMC Fab Begins Trial Production in Dholera',
    content: `The Tata Electronics-PSMC semiconductor fab in Dholera, Gujarat, has commenced trial production of 28nm chips, marking a historic milestone for India's semiconductor ambitions. The ₹91,000 crore facility is expected to begin commercial production by Q3 2026.

The fab will initially produce automotive and industrial-grade chips, targeting the growing demand from India's auto and electronics manufacturing sectors. Annual capacity is planned at 50,000 wafer starts per month, scalable to 100,000 by 2028.

Tata Electronics CEO Dr. Randhir Thakur stated that the fab has already secured $2 billion in advance orders from automotive OEMs including Tata Motors, Mahindra, and international clients. The company plans to build a second fab focused on 12nm advanced nodes.

The India Semiconductor Mission has approved four semiconductor facilities with total investment of ₹1.76 lakh crore, positioning India as a key node in the global chip supply chain.`,
    summary: 'Tata-PSMC fab begins trial production of 28nm chips in Dholera. ₹91,000 crore facility targets auto and industrial sectors.',
    category: 'Technology',
    author: 'Megha Mandavia',
    date: '2026-02-22',
    source: 'Economic Times',
    imageUrl: '/placeholder-5.jpg',
    tags: ['semiconductor', 'manufacturing', 'tata', 'chips'],
  },
  {
    id: 'art-16',
    title: 'Food Inflation Eases to 4.5% in January as Vegetable Prices Normalize',
    content: `Consumer food inflation eased to 4.5% in January 2026 from 8.2% in October 2025, as vegetable prices normalized following a good rabi season. Tomato prices dropped 45% from their October peak, while onion prices stabilized after government intervention.

Overall CPI inflation moderated to 4.2%, well within RBI's target band of 2-6%. Core inflation remained benign at 3.8%, reflecting subdued demand-side pressures. The moderation in food prices was a key factor behind the RBI's shift to an accommodative stance.

Wheat procurement by the Food Corporation of India was 12% higher at 28 million tonnes, building comfortable buffer stocks. The government's targeted interventions, including open market sales and import duty adjustments, helped manage price volatility.

Agricultural economists at ICRIER projected food inflation to remain in the 4-5% range through H1 FY27, supported by favorable monsoon forecasts and improved supply chain logistics through the PM Gati Shakti program.`,
    summary: 'Food inflation eases to 4.5% in Jan from 8.2% peak. Overall CPI at 4.2% supports RBI rate cut expectations.',
    category: 'Economy',
    author: 'Ravi Dutta Mishra',
    date: '2026-02-14',
    source: 'Economic Times',
    imageUrl: '/placeholder-1.jpg',
    tags: ['inflation', 'food-prices', 'cpi', 'economy'],
  },
  {
    id: 'art-17',
    title: 'SEBI Tightens F&O Rules: Lot Sizes Doubled, Weekly Expiries Limited',
    content: `SEBI has implemented sweeping changes to the futures and options (F&O) segment, doubling minimum lot sizes and restricting weekly option expiries to one per exchange. The new rules, effective April 1, 2026, aim to curb speculative retail participation in derivatives.

Under the new framework, minimum contract sizes have been increased from ₹5 lakh to ₹10 lakh, while margin requirements for option sellers have been raised by 25%. BSE and NSE will each be limited to one weekly expiry, down from the current multiple-day offerings.

Market participants estimated that daily options premium turnover could decline by 30-40% following the implementation. Discount brokers Zerodha and Groww have already adjusted their risk management systems, with Zerodha CEO Nithin Kamath noting the impact on "speculative volumes."

SEBI Chairman Madhabi Puri Buch defended the measures, citing data showing that 90% of individual F&O traders incurred losses. "These measures are designed to protect retail investors while maintaining market integrity," she stated.`,
    summary: 'SEBI doubles F&O lot sizes to ₹10 lakh, limits weekly expiries to one per exchange. Daily options turnover may fall 30-40%.',
    category: 'Markets',
    author: 'Reena Zachariah',
    date: '2026-02-28',
    source: 'Economic Times',
    imageUrl: '/placeholder-2.jpg',
    tags: ['sebi', 'f&o', 'derivatives', 'regulation'],
  },
  {
    id: 'art-18',
    title: 'E-Commerce Hits $120 Billion GMV, Meesho Emerges as Dark Horse',
    content: `India's e-commerce market reached $120 billion in gross merchandise value (GMV) in 2025, growing 22% YoY. While Flipkart and Amazon maintained their dominance, social commerce platform Meesho emerged as the dark horse with 150% GMV growth to $8 billion.

Flipkart's GMV crossed $50 billion, driven by strong growth in fashion, electronics, and grocery segments. Amazon India's GMV was estimated at $32 billion, with the company investing heavily in same-day delivery across 50 cities.

Meesho's success story was driven by its zero-commission model and deep penetration in tier-2 and tier-3 cities, where it claims 60% of its orders originate. The platform now has 150 million monthly active users and 1.2 million seller partners.

Quick commerce emerged as the fastest-growing segment, with Blinkit, Zepto, and Swiggy Instamart collectively processing 15 million daily orders. Bernstein estimates quick commerce GMV at $12 billion in 2025, projected to reach $30 billion by 2028.`,
    summary: 'India e-commerce GMV hits $120B, up 22%. Meesho grows 150% to $8B GMV. Quick commerce emerges as fastest-growing segment at $12B.',
    category: 'E-Commerce',
    author: 'Rasul Bailay',
    date: '2026-01-30',
    source: 'Economic Times',
    imageUrl: '/placeholder-3.jpg',
    tags: ['ecommerce', 'flipkart', 'meesho', 'quick-commerce'],
  },
  {
    id: 'art-19',
    title: 'Infosys Co-founder Narayana Murthy Backs New AI Education Initiative',
    content: `Infosys co-founder N.R. Narayana Murthy has pledged ₹500 crore to launch the 'AI for Bharat' education initiative, aimed at training 10 million students in AI and machine learning skills by 2030. The program will partner with 500 engineering colleges across India.

The initiative will offer free online courses, hands-on projects, and mentorship from industry professionals. Courses will be available in English, Hindi, and six regional languages to ensure accessibility. The curriculum has been developed in collaboration with Stanford HAI and IIT Madras.

Murthy emphasized the urgency: "India has a unique window of opportunity to become the AI talent capital of the world. We must act now or risk being left behind in this transformative era."

The program has already received support from Google, Microsoft, and AWS, which will provide cloud computing credits worth $50 million for student projects. NASSCOM will serve as the implementation partner.`,
    summary: 'Narayana Murthy pledges ₹500 crore for AI education initiative targeting 10M students by 2030. Google, Microsoft, AWS provide support.',
    category: 'Education',
    author: 'Alnoor Peermohamed',
    date: '2026-02-03',
    source: 'Economic Times',
    imageUrl: '/placeholder-4.jpg',
    tags: ['education', 'ai', 'infosys', 'skills'],
  },
  {
    id: 'art-20',
    title: 'Reliance Jio Launches 5.5G Services, Promises 10 Gbps Speeds',
    content: `Reliance Jio has commercially launched 5.5G (5G-Advanced) services in Mumbai, Delhi, and Bengaluru, promising peak speeds of up to 10 Gbps. The company plans to expand 5.5G coverage to 50 cities by December 2026.

Jio 5.5G leverages carrier aggregation across multiple spectrum bands and advanced MIMO technology to deliver speeds 10x faster than current 5G. The service will initially be available on select flagship smartphones from Samsung, Apple, and OnePlus.

Jio Chairman Akash Ambani stated that 5.5G will enable "truly immersive AR/VR experiences, real-time AI applications, and industrial IoT at scale." The company has invested ₹35,000 crore in network upgrades over the past year.

Rival Airtel announced plans to launch 5.5G services by Q3 2026, while Vi (Vodafone Idea) continues to focus on expanding its 5G footprint. Industry analysts expect 5.5G to primarily benefit enterprise customers initially, with consumer use cases maturing by 2027.`,
    summary: 'Jio launches 5.5G in 3 cities with 10 Gbps speeds. Plans 50-city expansion by Dec 2026. ₹35,000 crore invested in upgrades.',
    category: 'Telecom',
    author: 'Danish Khan',
    date: '2026-03-01',
    source: 'Economic Times',
    imageUrl: '/placeholder-5.jpg',
    tags: ['telecom', 'jio', '5g', 'technology'],
  },
  {
    id: 'art-21',
    title: 'India GDP Grows 7.1% in Q3 FY26, Manufacturing Sector Shines',
    content: `India's GDP grew 7.1% year-on-year in Q3 FY26 (October-December 2025), beating the consensus estimate of 6.7%. Manufacturing sector growth accelerated to 8.4%, the highest in 12 quarters, driven by strong industrial production and export demand.

Agriculture grew 4.2%, benefiting from a good kharif harvest, while services expanded 6.8%. The construction sector posted 9.1% growth, supported by government infrastructure spending and the housing boom.

Government expenditure grew 8.5% after remaining subdued in H1, indicating a catch-up in capex deployment. Private consumption grew 6.2%, reflecting improving consumer sentiment post the festive season.

Chief Economic Adviser V. Anantha Nageswaran projected full-year FY26 GDP growth at 6.9%, slightly above the advance estimate of 6.7%. India maintained its position as the fastest-growing major economy, ahead of China's 4.8%.`,
    summary: 'India GDP grows 7.1% in Q3 FY26, beating estimates. Manufacturing at 8.4% — highest in 12 quarters. India outpaces China at 4.8%.',
    category: 'Economy',
    author: 'Dhruva Raj Chatterjee',
    date: '2026-02-28',
    source: 'Economic Times',
    imageUrl: '/placeholder-1.jpg',
    tags: ['gdp', 'economy', 'manufacturing', 'growth'],
  },
  {
    id: 'art-22',
    title: 'Ola Electric IPO: Stock Lists at 30% Premium, Market Cap Crosses ₹50,000 Crore',
    content: `Ola Electric made a strong stock market debut, listing at ₹104 against the issue price of ₹80 — a premium of 30%. The stock further rallied to ₹118 during the session, giving the company a market capitalization of over ₹50,000 crore.

The ₹6,146 crore IPO was oversubscribed 5.2 times, with strong institutional demand. QIB portion was subscribed 12.8 times, while retail investors subscribed 2.1 times. Anchor investors including GIC, Fidelity, and BlackRock picked up shares worth ₹2,760 crore.

CEO Bhavish Aggarwal credited the strong listing to Ola's market leadership with 35% share in electric two-wheelers and its vertically integrated cell-to-vehicle strategy. The company's Krishnagiri gigafactory is producing 5 GWh of cells annually, the first in India.

Analysts at Jefferies initiated coverage with a "Buy" rating and target price of ₹135, citing the massive addressable market and Ola's technology moat. However, concerns remain around the company's cash burn rate and customer service track record.`,
    summary: 'Ola Electric lists at 30% premium. Market cap crosses ₹50,000 crore. Strong institutional demand with 5.2x oversubscription.',
    category: 'Markets',
    author: 'Reena Zachariah',
    date: '2026-03-05',
    source: 'Economic Times',
    imageUrl: '/placeholder-2.jpg',
    tags: ['ipo', 'ola-electric', 'ev', 'markets'],
  },
];
