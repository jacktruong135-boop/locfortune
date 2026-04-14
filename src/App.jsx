import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, ArrowLeft, Menu, X, ExternalLink } from "lucide-react";

// ─── Company Data ───
const COMPANIES = {
  "norg-ai": {
    name: "Norg AI", sector: "Technology", url: "https://www.norg.ai",
    headline: "Get your brand showing in AI.",
    overview: "Norg AI helps brands dominate LLMs and AI search results, reaching billions of shoppers who ask AI before they buy. Their platform creates and enriches content optimised for AI models including ChatGPT, Claude, Gemini, Perplexity, DeepSeek, and Grok.",
    stats: [{ value: "1M+", label: "Pieces of content created" }, { value: "4.9/5", label: "Customer rating" }, { value: "6+", label: "AI models supported" }],
    points: ["AI search optimisation platform for brands and retailers", "Helps businesses get discovered through AI-powered search and recommendations", "Over 1,000,000 pieces of content created and enriched", "Australian made, supporting major AI models globally"],
  },
  "tma-solutions": {
    name: "TMA Solutions", sector: "Technology", url: "https://www.tmasolutions.com",
    headline: "Leading software outsourcing from Vietnam.",
    overview: "TMA Solutions is one of Vietnam's premier software outsourcing companies, providing agile development, software testing, digital transformation, and innovation services. Their highly skilled engineers deliver exceptional IT solutions across telecom, finance, healthcare, automotive, and more.",
    stats: [{ value: "500+", label: "Engineers" }, { value: "7+", label: "Industries served" }, { value: "25+", label: "Years of operation" }],
    points: ["Full-service software development and testing", "Expertise in AI/ML, Big Data, IoT, Cloud, and 5G technologies", "Serving global clients across telecom, finance, insurance, healthcare, and logistics", "Digital transformation and innovation-as-a-service capabilities"],
  },
  "pyrochar": {
    name: "Pyrochar", sector: "Sustainability", url: "https://pyrochar.com.au",
    headline: "Decarbonising steel with biochar.",
    overview: "Pyrochar is commercialising CSIRO-developed technology to produce net-zero emission metallurgical char (MetChar) that replaces coal and coke in the primary metals industry. Their self-sustaining pyrolysis process creates clean char — an inexpensive, net-zero alternative to coal for steel production. The technology has been researched and developed over 13+ years.",
    stats: [{ value: "90,000t", label: "Facility capacity" }, { value: "13+", label: "Years of R&D" }, { value: "6.7%", label: "Global CO₂ from steel" }],
    points: ["First-of-its-kind MetChar for primary metals manufacture", "CSIRO-developed technology scaled for commercial production", "Constructing a 90,000-tonne facility in Collie, Western Australia", "30-year offtake agreement with Magnium Australia for green magnesium refining", "Self-sustaining pyrolysis process using organic waste feedstock"],
  },
  "magnium": {
    name: "Magnium", sector: "Sustainability", url: "https://www.magnium.com.au",
    headline: "Net-zero magnesium for a critical future.",
    overview: "Magnium commercialises world-leading research from Australia's national science agency to manufacture net-zero carbon, zero-toxin magnesium metal — a critical mineral. They aim to reduce global carbon dioxide emissions by 1% by 2050 through the deployment of net-zero magnesium. Their facility in Western Australia will be the first fully integrated green magnesium production plant in the world.",
    stats: [{ value: "1%", label: "Global CO₂ reduction target" }, { value: "2050", label: "Target year" }, { value: "1st", label: "Green magnesium plant globally" }],
    points: ["Manufacturing net-zero carbon, zero-toxin magnesium metal", "Magnesium is classified as a critical mineral globally", "Partnered with Pyrochar for net-zero carbon supply", "First fully integrated green magnesium production facility in the world", "Targeting 1% reduction in global CO₂ emissions by 2050"],
  },
  "number": {
    name: "Number", sector: "Technology", url: "https://number.com.au",
    headline: "AI voice calls and search optimisation for Australian businesses.",
    overview: "Number provides AI-powered voice calls, AI search optimisation (GEO), and custom AI solutions for Australian businesses. Their platform helps companies get found by AI search engines like ChatGPT, book more meetings through AI-driven outbound calls, and build custom AI solutions tailored to their needs.",
    stats: [{ value: "AI", label: "Voice calls" }, { value: "GEO", label: "Search optimisation" }, { value: "AU", label: "Built for Australia" }],
    points: ["AI-powered voice calls that book meetings and handle customer enquiries", "AI search optimisation (GEO) helping brands get discovered by ChatGPT and other AI engines", "Custom AI solutions tailored to Australian businesses", "Helping businesses automate outreach and scale conversations"],
  },
};

const PORTFOLIO = [
  { name: "Pyrochar", slug: "pyrochar", desc: "Scaling CSIRO-developed technology to produce net-zero metallurgical char, replacing coal in steel and primary metals production.", stat: "90,000t" },
  { name: "Magnium", slug: "magnium", desc: "Commercialising world-leading research to manufacture net-zero carbon magnesium, a critical mineral, targeting 1% global CO₂ reduction by 2050.", stat: "1%" },
  { name: "Norg AI", slug: "norg-ai", desc: "Helping brands dominate AI search results, reaching billions of shoppers who ask AI before they buy.", stat: "AI" },
  { name: "TMA Solutions", slug: "tma-solutions", desc: "One of Vietnam's premier software outsourcing companies, delivering agile development and exceptional IT solutions through highly skilled engineers.", stat: "500+" },
  { name: "Number", slug: "number", desc: "AI-powered voice calls, AI search optimisation, and custom AI solutions for Australian businesses. Get found by ChatGPT. Book more meetings.", stat: "GEO" },
];

const TESTIMONIALS = [
  { quote: "Loc Fortune understood our vision to decarbonise steel before anyone else. Their conviction beyond funding sets them apart.", name: "Pyrochar", role: "Portfolio Company", initial: "P" },
  { quote: "A firm that genuinely believes technology and sustainability aren't at odds. They've been in our corner from day one.", name: "Magnium", role: "Portfolio Company", initial: "M" },
  { quote: "The team brings deep strategic thinking about where AI meets real business outcomes. They understand early-stage startups.", name: "Norg AI", role: "Portfolio Company", initial: "N" },
];

// ─── Articles (opinion/perspective — no unverified statistics) ───
const ARTICLES = [
  {
    slug: "real-cost-raising-seed-round-australia",
    title: "The Real Cost of Raising a Seed Round in Australia",
    category: "Fundraising",
    date: "5 January 2026",
    readTime: "8 min read",
    summary: "Beyond equity dilution, there are hidden costs every Australian founder should understand before starting a raise.",
    content: [
      { type: "p", text: "Raising a seed round in Australia is often romanticised. The pitch, the term sheet, the announcement. But the real cost of raising goes far beyond the equity you give away. For first-time founders, understanding the full picture before you start is critical." },
      { type: "h", text: "The Financial Costs" },
      { type: "p", text: "Legal fees are the most obvious direct cost. A standard seed round requires a Shareholders Agreement, share subscription documents, and potentially investor-side legal review. If you're using a SAFE or convertible note, costs tend to sit lower. Priced equity rounds with multiple investors push costs higher. Beyond legal, founders should budget for due diligence preparation, data room setup, and potentially accounting fees to get financials in order." },
      { type: "h", text: "The Time Cost" },
      { type: "p", text: "This is the cost most founders underestimate. A seed raise typically takes several months from first meeting to money in the bank. During that period, at least one founder is spending the majority of their time on fundraising rather than building. For a small founding team, that's a significant hit to productivity at the worst possible time." },
      { type: "p", text: "The business doesn't pause while you're raising. Customers still need attention, product still needs shipping, and your competitors aren't waiting." },
      { type: "h", text: "The Dilution Cost" },
      { type: "p", text: "Dilution is expected — it's the price of growth capital. The question isn't whether dilution is worth it, but whether you're raising at the right time with the right terms to minimise unnecessary dilution. Raising too early, at too low a valuation, or for too little capital can all lead to regret down the line." },
      { type: "h", text: "Our Perspective" },
      { type: "p", text: "Know your numbers before you start. Have a clear use of funds. Set a realistic timeline and protect your momentum. The founders who raise most efficiently are the ones who treat fundraising as a sprint, not a marathon — and who prepare thoroughly before taking the first meeting." },
    ],
  },
  {
    slug: "melbourne-australias-ai-capital",
    title: "Why Melbourne is Quietly Becoming Australia's AI Capital",
    category: "Market",
    date: "19 January 2026",
    readTime: "8 min read",
    summary: "Melbourne's combination of research depth, talent, and cost advantages is making it an increasingly important hub for AI startups.",
    content: [
      { type: "p", text: "When people think of Australia's tech scene, Sydney usually comes to mind first. But in recent years, Melbourne has been quietly building something remarkable in artificial intelligence — and we think the trend is worth paying attention to." },
      { type: "h", text: "The Research Pipeline" },
      { type: "p", text: "Melbourne is home to some of the strongest AI research institutions in the southern hemisphere. The University of Melbourne, Monash University, and RMIT are producing world-class talent and increasingly commercialising their research through spin-outs and partnerships with the private sector. The pipeline from lab to startup is getting shorter." },
      { type: "h", text: "Cost Advantages" },
      { type: "p", text: "Melbourne's cost of living and office space remains lower than Sydney's. For early-stage AI companies that are capital-intensive and talent-hungry, this matters. An AI startup can meaningfully stretch its runway by building in Melbourne rather than in more expensive cities — and the talent pool to draw from is deep." },
      { type: "h", text: "The Community Effect" },
      { type: "p", text: "Melbourne's AI community has been growing steadily. Regular meetups, a growing cluster of AI-interested investors, and early success stories are creating a flywheel. When founders see peers succeeding locally, they're more likely to stay and build rather than relocating." },
      { type: "p", text: "We're watching this space closely. Several of our portfolio companies have deep Melbourne roots, and we expect this trend to continue." },
    ],
  },
  {
    slug: "mistakes-that-kill-series-a-fundraises",
    title: "5 Mistakes That Kill Series A Fundraises",
    category: "Founders",
    date: "3 February 2026",
    readTime: "7 min read",
    summary: "The most common — and most avoidable — errors we see founders make when stepping up from seed to Series A.",
    content: [
      { type: "p", text: "The jump from seed to Series A is where many promising startups stall. Having observed many of these conversations, here are the five mistakes we see most often." },
      { type: "h", text: "1. Raising Too Early" },
      { type: "p", text: "Series A investors want to see evidence of product-market fit, not just early traction. If your metrics are growing but you can't clearly articulate why customers stay and pay, you may not be ready. Raising too early means either failing to close or closing on terms you'll regret." },
      { type: "h", text: "2. Focusing on the Wrong Metrics" },
      { type: "p", text: "Revenue matters, but it's not the whole story. Series A investors tend to care deeply about retention, unit economics, and scalability. A company with strong revenue but high churn is often less attractive than a smaller company with exceptional retention. Know which metrics matter for your specific business model." },
      { type: "h", text: "3. No Clear Use of Funds" },
      { type: "p", text: "\"We'll use it for growth\" isn't a plan. Investors want to see how the capital translates to specific milestones — key hires, market expansion, product development — with a credible path to the next stage." },
      { type: "h", text: "4. Ignoring the Narrative" },
      { type: "p", text: "Your Series A story needs to connect your seed progress to a much larger vision. Why is this market significant? Why are you the team to win it? Why is now the right moment? Data supports the narrative — it doesn't replace it." },
      { type: "h", text: "5. Running a Slow Process" },
      { type: "p", text: "Momentum matters enormously in fundraising. A tight, well-organised process with a researched target list creates urgency. A drawn-out process signals the opposite. Prepare everything thoroughly before your first meeting, and move with purpose." },
    ],
  },
  {
    slug: "lp-perspective-what-makes-us-write-cheques",
    title: "The LP Perspective: What Makes Us Write Cheques",
    category: "Strategy",
    date: "17 February 2026",
    readTime: "7 min read",
    summary: "What limited partners look for when evaluating venture capital funds — and what that means for how we invest.",
    content: [
      { type: "p", text: "Most founders think about VCs as the top of the capital food chain. But VCs themselves raise money from Limited Partners — institutional investors, family offices, and high-net-worth individuals. Understanding what LPs want explains a lot about how VCs behave." },
      { type: "h", text: "Returns Are Table Stakes" },
      { type: "p", text: "LPs expect strong returns. In venture, that means a fund should meaningfully outperform other asset classes over its lifetime. But returns alone don't win LP commitments. Consistency, transparency, and a differentiated strategy matter just as much — sometimes more." },
      { type: "h", text: "Differentiation Wins" },
      { type: "p", text: "LPs are wary of generic strategies. A fund that says \"we invest in great founders\" hasn't said anything distinctive. A fund that invests at a specific intersection — like technology and industrial decarbonisation — has said something concrete and defensible. This is exactly why Loc Fortune exists where it does. Our focus isn't just our thesis — it's our edge." },
      { type: "h", text: "Transparency Builds Trust" },
      { type: "p", text: "The best LP relationships are built on honest communication. Sharing portfolio performance — including the investments that didn't work — builds more trust than curated highlights. Experienced LPs have evaluated thousands of funds. They recognise spin immediately." },
      { type: "h", text: "What This Means for Founders" },
      { type: "p", text: "When a VC passes on your deal, it's not always about you. Fund strategy, portfolio construction, and LP expectations all play a role. Understanding this ecosystem makes you a more effective fundraiser and helps you target the right investors for your stage and sector." },
    ],
  },
  {
    slug: "deep-tech-moment-australia",
    title: "Deep Tech is Having Its Moment in Australia",
    category: "Market",
    date: "3 March 2026",
    readTime: "8 min read",
    summary: "Australian deep tech startups are attracting growing attention. Here's what we think is driving the shift.",
    content: [
      { type: "p", text: "For years, Australian deep tech founders faced a familiar problem: brilliant technology, limited local capital willing to back it. We believe that's changing — and we're seeing it firsthand through our portfolio." },
      { type: "h", text: "The CSIRO Effect" },
      { type: "p", text: "Australia's national science agency has become one of the most prolific generators of commercially viable deep tech. From quantum computing to advanced materials to biochar technology, CSIRO spin-outs are moving from lab to market at an increasing pace." },
      { type: "p", text: "Our portfolio company Pyrochar is a case in point — CSIRO-developed technology, now scaling to commercial production. This isn't speculative research. It's deployment-ready technology addressing a massive global challenge in steel decarbonisation." },
      { type: "h", text: "Growing Investor Interest" },
      { type: "p", text: "International climate-tech and deep-tech funds are increasingly looking at Australia. The combination of world-class research institutions, a stable regulatory environment, and abundant natural resources creates a proposition that's genuinely hard to replicate in other geographies." },
      { type: "h", text: "Critical Minerals Are Gaining Strategic Importance" },
      { type: "p", text: "Australia's position in critical minerals — including magnesium, lithium, and rare earths — is attracting a new class of strategic investor. Companies like Magnium, working to produce net-zero magnesium, sit at the intersection of deep tech and resource sovereignty. These are increasingly seen as strategic investments, not just commercial ones." },
      { type: "h", text: "What Needs to Happen Next" },
      { type: "p", text: "The ecosystem needs more patient capital, stronger university-to-startup pathways, and government policy that matches the ambition of our researchers. The ingredients are there. The question is whether Australia moves fast enough to capture the opportunity before others do." },
    ],
  },
  {
    slug: "build-board-that-actually-helps",
    title: "How to Build a Board That Actually Helps",
    category: "Founders",
    date: "10 March 2026",
    readTime: "7 min read",
    summary: "Most startup boards are either rubber stamps or conflict zones. Here's how to build one that genuinely accelerates your company.",
    content: [
      { type: "p", text: "A great board is one of the most powerful tools a founder can have. A poorly constructed board is one of the biggest distractions. The difference comes down to composition, expectations, and how you run the room." },
      { type: "h", text: "Composition Matters" },
      { type: "p", text: "Early-stage boards should be small. You want a mix of operational experience — someone who's built and scaled a company — domain expertise in your market, and financial acumen to help with fundraising and capital strategy." },
      { type: "p", text: "Avoid stacking your board with investors alone. The best boards include at least one independent director who brings objectivity and has no financial interest beyond wanting the company to succeed." },
      { type: "h", text: "Set Expectations Early" },
      { type: "p", text: "Before someone joins your board, be explicit about what you need. How much time per month? What areas should they focus on? Are they comfortable being challenged — and challenging you? A short conversation upfront prevents years of misalignment." },
      { type: "h", text: "Run Effective Meetings" },
      { type: "p", text: "Send materials well in advance. Spend the minority of the meeting on reporting and the majority on strategic discussion. Identify the key decisions that need board input and build the agenda around them. If your board meetings feel like status updates, you're wasting the room's collective experience." },
      { type: "h", text: "Create Space for Hard Conversations" },
      { type: "p", text: "The best boards create an environment where difficult truths can be spoken without damaging relationships. If your board can't honestly discuss founder performance, strategic pivots, or cash runway, it's not functioning as it should. Build that trust from day one." },
    ],
  },
  {
    slug: "state-of-australian-venture-q1-2026",
    title: "State of Australian Venture: Our Q1 2026 Observations",
    category: "Market",
    date: "15 March 2026",
    readTime: "8 min read",
    summary: "Our perspective on the Australian venture landscape heading into the second quarter of 2026.",
    content: [
      { type: "p", text: "After a period of recalibration across global venture markets, the Australian ecosystem feels like it's entering a new phase. Here's what we're observing as we move through the first quarter of 2026." },
      { type: "h", text: "Activity Is Picking Up" },
      { type: "p", text: "We're seeing more deals come to market at the seed and pre-seed stage than we did through much of the previous year. Many of these are companies that wisely delayed raising during the downturn and are now approaching investors with stronger metrics and clearer narratives. The quality of what's coming through feels genuinely high." },
      { type: "h", text: "Valuations Feel More Rational" },
      { type: "p", text: "The frothy valuations of earlier years have largely corrected. Seed-stage pricing feels more grounded, with investors and founders finding common ground more quickly. Notably, climate-tech and deep-tech companies appear to be commanding premiums relative to other sectors, likely reflecting the capital intensity and defensibility of these businesses." },
      { type: "h", text: "Sector Trends" },
      { type: "p", text: "AI remains the dominant theme in conversations, but investors are becoming more discerning. Companies applying AI to specific, well-defined industry problems — rather than building general-purpose AI tools — seem to be generating the most investor interest. Climate-tech continues to gain momentum, particularly in areas like carbon removal, green materials, and energy storage." },
      { type: "h", text: "Looking Ahead" },
      { type: "p", text: "Several large Australian funds have recently closed new vintages and are actively deploying. For founders with clear metrics and a compelling story, the window looks favourable. We'd encourage founders who are ready to move with purpose — the market rewards preparation and momentum." },
    ],
  },
  {
    slug: "why-we-back-technical-founders",
    title: "Why We Back Technical Founders — and What We Look For",
    category: "Founders",
    date: "21 March 2026",
    readTime: "6 min read",
    summary: "Our perspective on why technical founders often have a structural advantage — and the qualities that make us lean in.",
    content: [
      { type: "p", text: "At Loc Fortune, we have a natural affinity for technical founders. Not exclusively — some outstanding companies are led by non-technical CEOs — but the pattern in our portfolio is clear. Here's our thinking." },
      { type: "h", text: "Speed of Iteration" },
      { type: "p", text: "Technical founders can build and ship without depending on external teams. This means faster iteration, lower burn in the early days, and a tighter feedback loop between customer insight and product response. At the seed stage, this speed advantage compounds in ways that are hard to replicate." },
      { type: "h", text: "Depth of Understanding" },
      { type: "p", text: "When the founder understands the technology at a fundamental level, they tend to make better architectural decisions that pay off over time. They know when to take shortcuts and when to invest in foundations. This kind of judgment is difficult to outsource or hire for." },
      { type: "h", text: "What We Look For Beyond Technical Skill" },
      { type: "p", text: "Technical ability alone isn't sufficient. We look for technical founders who can clearly articulate the business problem in plain language. Who can sell — to customers, investors, and future team members. Who are genuinely curious about the market, not just the technology." },
      { type: "p", text: "The best technical founders we've worked with share a common trait: they fell in love with the problem first and chose technology as the best way to solve it — rather than building technology in search of a problem." },
    ],
  },
  {
    slug: "revenue-share-vs-equity-early-stage",
    title: "Revenue Share vs Equity: New Models for Early-Stage Funding",
    category: "Fundraising",
    date: "24 March 2026",
    readTime: "7 min read",
    summary: "Equity isn't the only option. Exploring alternative funding structures gaining traction in the Australian startup ecosystem.",
    content: [
      { type: "p", text: "The traditional venture model — equity in exchange for capital — has been the default for decades. But a growing number of Australian founders and investors are exploring alternatives that may better align incentives for certain types of businesses." },
      { type: "h", text: "Revenue-Based Financing" },
      { type: "p", text: "Revenue-based financing provides capital in exchange for a percentage of future revenue until a predetermined cap is reached. For companies with predictable recurring revenue, this can be less dilutive than equity and faster to close. The model works particularly well for SaaS companies that want to fund specific growth initiatives without giving up board seats or significant ownership." },
      { type: "h", text: "SAFEs and Convertible Notes" },
      { type: "p", text: "SAFEs — Simple Agreements for Future Equity — have become increasingly popular for seed-stage raises in Australia, following the US trend. They defer valuation negotiation to the next priced round, reducing legal costs and timeline. But founders should understand the cap and discount mechanics thoroughly to avoid surprises when conversion happens." },
      { type: "h", text: "When Equity Is Still the Right Choice" },
      { type: "p", text: "For capital-intensive businesses — deep tech, hardware, climate tech — equity typically remains the most appropriate model. These companies need patient capital with long time horizons, and the risk-reward profile suits the venture equity structure. Our sustainability portfolio companies are good examples: the capital requirements are significant, but so is the potential for outsized returns." },
      { type: "h", text: "Matching Structure to Strategy" },
      { type: "p", text: "There's no universally right answer. The best founders think about funding structure as a strategic decision rather than a default. What stage are you at? How predictable is your revenue? What's your time horizon? The answers should drive the structure, not convention." },
    ],
  },
  {
    slug: "australian-founders-guide-to-raising-pre-seed",
    title: "The Australian Founder's Guide to Raising a Pre-Seed Round in 2026",
    category: "Fundraising",
    date: "28 March 2026",
    readTime: "8 min read",
    summary: "A practical guide to navigating the pre-seed landscape in Australia — who to talk to, what to show, and how to approach the process.",
    content: [
      { type: "p", text: "Pre-seed is the most ambiguous stage in venture. There's no universal definition, expectations vary between investors, and the line between pre-seed and seed shifts constantly. Here's our practical perspective for Australian founders navigating this stage." },
      { type: "h", text: "What Pre-Seed Means in Practice" },
      { type: "p", text: "In the Australian context, pre-seed typically means raising enough capital to go from idea or early prototype to initial signals of product-market fit. You might have a working MVP, some early users, or a clear technical proof of concept — but you're generally pre-revenue or at very early revenue." },
      { type: "h", text: "Who's Funding Pre-Seed in Australia" },
      { type: "p", text: "The pre-seed landscape includes angel investors, angel syndicates and groups, micro-VCs and dedicated pre-seed funds, and government grants through programs like the R&D Tax Incentive and various state-based innovation programs. Each has different expectations, timelines, and levels of ongoing involvement." },
      { type: "h", text: "What You Need to Demonstrate" },
      { type: "p", text: "At pre-seed, investors are primarily betting on the team and the insight. You need a compelling articulation of the problem, a credible plan for the solution, and evidence that you're the right team — through domain expertise, technical ability, or relevant experience. Any proof of customer interest, even if it's early conversations or expressions of interest, helps significantly." },
      { type: "h", text: "How Much to Raise" },
      { type: "p", text: "Raise enough to reach a clear milestone that makes you credibly fundable at the seed stage — typically enough for twelve to eighteen months of runway. Raising too little means you'll be fundraising again before you've proven anything meaningful. Raising too much means higher dilution at your weakest valuation point." },
      { type: "h", text: "The Process" },
      { type: "p", text: "Pre-seed rounds often come together through warm introductions. Build relationships with investors before you need capital. Attend founder events, join angel networks, and be visible in the ecosystem. When you're ready to raise, a warm introduction converts at a dramatically higher rate than a cold email. Start building those relationships early." },
    ],
  },
];

const LINKEDIN = "https://www.linkedin.com/company/loc-fortune-capital/";

// ─── Hooks ───
function useReveal(t = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold: t });
    o.observe(el); return () => o.disconnect();
  }, []);
  return [ref, v];
}
function Counter({ end, suffix = "" }) {
  const [ref, vis] = useReveal(0.3);
  const [v, setV] = useState(0);
  useEffect(() => { if (!vis) return; let n=0; const step=Math.max(1,Math.ceil(end/40)); const id=setInterval(()=>{n+=step;if(n>=end){setV(end);clearInterval(id)}else setV(n)},35); return()=>clearInterval(id); }, [vis, end]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}
function R({ children, d = 0, style = {} }) {
  const [ref, vis] = useReveal(0.08);
  return <div ref={ref} style={{ ...style, opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(32px)", transition:`opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s` }}>{children}</div>;
}

const black="#0A0A0A", white="#FFFFFF", bg="#FAFAFA", muted="#71717A", dim="#A1A1AA", border="rgba(0,0,0,0.08)", borderHover="rgba(0,0,0,0.16)";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  ::selection{background:${black};color:${white}}
  a{color:inherit;text-decoration:none}
  .mono{font-family:'Space Mono',monospace}
  .serif{font-family:'Instrument Serif',Georgia,serif}
  .uline{position:relative}
  .uline::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:${black};transition:width 0.3s ease}
  .uline:hover::after{width:100%}
  .lift{transition:transform 0.3s ease, border-color 0.3s ease}
  .lift:hover{transform:translateY(-4px);border-color:${borderHover}!important}
  @media(max-width:800px){
    .desk{display:none!important}
    .mob-show{display:flex!important}
    .hero-h{font-size:48px!important}
    .stats-g{grid-template-columns:1fr 1fr!important}
    .vert-g{grid-template-columns:1fr!important}
    .ft-g{grid-template-columns:1fr 1fr!important}
    .cta-h{font-size:32px!important}
    .articles-g{grid-template-columns:1fr!important}
  }
`;

function SubNav({ onBack, rightElement }) {
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:"rgba(255,255,255,0.92)", backdropFilter:"blur(16px)", borderBottom:`1px solid ${border}` }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"14px 32px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button onClick={onBack} style={{ display:"flex", alignItems:"center", gap:8, background:"none", border:"none", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'Sora',sans-serif" }}><ArrowLeft size={16} /> Back</button>
        <a href="#" onClick={e=>{e.preventDefault();onBack()}} style={{ fontSize:28, fontWeight:800, letterSpacing:"-0.06em", lineHeight:1 }}>L</a>
        {rightElement || <div style={{ width:100 }} />}
      </div>
    </nav>
  );
}
function SubFooter({ onBack }) {
  return (
    <footer style={{ borderTop:`1px solid ${border}`, marginTop:32 }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"24px 32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <button onClick={onBack} style={{ display:"flex", alignItems:"center", gap:8, background:"none", border:"none", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'Sora',sans-serif", color:muted }}><ArrowLeft size={14} /> Back to Loc Fortune</button>
        <p style={{ fontSize:11, color:dim }}>© 2026 Loc Fortune Capital Pty Ltd</p>
      </div>
    </footer>
  );
}

// ═══ COMPANY PAGE ═══
function CompanyPage({ slug, onBack }) {
  const c = COMPANIES[slug]; if (!c) return null;
  useEffect(() => { window.scrollTo(0,0); }, []);
  return (
    <div style={{ background:white, color:black, fontFamily:"'Sora',sans-serif", minHeight:"100vh" }}>
      <style>{GLOBAL_STYLES}</style>
      <SubNav onBack={onBack} rightElement={<a href={c.url} target="_blank" rel="noopener noreferrer" style={{ padding:"9px 22px", borderRadius:100, fontSize:13, fontWeight:600, background:black, color:white, display:"inline-flex", alignItems:"center", gap:6 }}>Visit website <ExternalLink size={13} /></a>} />
      <section style={{ maxWidth:1100, margin:"0 auto", padding:"120px 32px 60px" }}>
        <R><p className="mono" style={{ fontSize:11, color:dim, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:20 }}>{c.sector}</p></R>
        <R d={0.06}><h1 style={{ fontSize:"clamp(40px,7vw,72px)", fontWeight:800, lineHeight:0.98, letterSpacing:"-0.04em", marginBottom:16 }}>{c.name}</h1></R>
        <R d={0.12}><p className="serif" style={{ fontSize:"clamp(20px,3vw,30px)", fontWeight:400, fontStyle:"italic", lineHeight:1.3, color:muted, maxWidth:600, marginBottom:40 }}>{c.headline}</p></R>
        <R d={0.18}><a href={c.url} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 28px", borderRadius:100, fontSize:14, fontWeight:600, background:black, color:white }}>Visit {c.name} <ExternalLink size={14} /></a></R>
      </section>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 32px" }}><div style={{ height:1, background:border }} /></div>
      <section style={{ maxWidth:1100, margin:"0 auto", padding:"56px 32px" }}>
        <R><div style={{ display:"grid", gridTemplateColumns:`repeat(${c.stats.length},1fr)`, gap:1, background:border, borderRadius:16, overflow:"hidden" }}>
          {c.stats.map((s,i) => (<div key={i} style={{ padding:"32px 24px", background:white }}><div style={{ fontSize:36, fontWeight:800, letterSpacing:"-0.04em", lineHeight:1 }}>{s.value}</div><p style={{ fontSize:13, color:muted, marginTop:4 }}>{s.label}</p></div>))}
        </div></R>
      </section>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 32px" }}><div style={{ height:1, background:border }} /></div>
      <section style={{ maxWidth:1100, margin:"0 auto", padding:"56px 32px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56 }}>
          <R d={0.06}><div><p className="mono" style={{ fontSize:11, color:dim, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:14 }}>Overview</p><p style={{ fontSize:16, lineHeight:1.75, color:muted }}>{c.overview}</p></div></R>
          <R d={0.14}><div><p className="mono" style={{ fontSize:11, color:dim, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:14 }}>Key highlights</p><div style={{ display:"flex", flexDirection:"column", gap:14 }}>{c.points.map((p,i) => (<div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}><div style={{ width:5, height:5, borderRadius:"50%", background:black, marginTop:7, flexShrink:0 }} /><p style={{ fontSize:14, lineHeight:1.6, color:muted }}>{p}</p></div>))}</div></div></R>
        </div>
      </section>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 32px" }}><div style={{ height:1, background:border }} /></div>
      <section style={{ maxWidth:1100, margin:"0 auto", padding:"56px 32px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:24 }}>
        <R><div><h3 style={{ fontSize:24, fontWeight:700, letterSpacing:"-0.02em", marginBottom:4 }}>Interested in {c.name}?</h3><p style={{ fontSize:14, color:muted }}>Visit their website to learn more.</p></div></R>
        <R d={0.08}><a href={c.url} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 28px", borderRadius:100, fontSize:14, fontWeight:600, background:black, color:white }}>Visit website <ExternalLink size={14} /></a></R>
      </section>
      <SubFooter onBack={onBack} />
    </div>
  );
}

// ═══ ARTICLE PAGE ═══
function ArticlePage({ slug, onBack }) {
  const article = ARTICLES.find(a => a.slug === slug);
  if (!article) return null;
  useEffect(() => { window.scrollTo(0,0); }, []);
  return (
    <div style={{ background:white, color:black, fontFamily:"'Sora',sans-serif", minHeight:"100vh" }}>
      <style>{GLOBAL_STYLES}</style>
      <SubNav onBack={onBack} />
      <section style={{ maxWidth:720, margin:"0 auto", padding:"120px 32px 60px" }}>
        <R><div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
          <span style={{ fontSize:12, fontWeight:600, padding:"4px 12px", borderRadius:100, border:`1px solid ${border}` }}>{article.category}</span>
          <span style={{ fontSize:12, color:dim }}>{article.date} · {article.readTime}</span>
        </div></R>
        <R d={0.06}><h1 style={{ fontSize:"clamp(28px,5vw,44px)", fontWeight:800, lineHeight:1.12, letterSpacing:"-0.03em", marginBottom:20 }}>{article.title}</h1></R>
        <R d={0.12}><p style={{ fontSize:17, lineHeight:1.7, color:muted, marginBottom:48 }}>{article.summary}</p></R>
        <R d={0.16}><div style={{ height:1, background:border, marginBottom:48 }} /></R>
        {article.content.map((block, i) => (
          <R key={i} d={0.04 * i}>
            {block.type === "h" ? (
              <h2 style={{ fontSize:20, fontWeight:700, letterSpacing:"-0.02em", marginTop:36, marginBottom:12 }}>{block.text}</h2>
            ) : (
              <p style={{ fontSize:15, lineHeight:1.8, color:muted, marginBottom:16 }}>{block.text}</p>
            )}
          </R>
        ))}
      </section>
      <div style={{ maxWidth:720, margin:"0 auto", padding:"0 32px" }}><div style={{ height:1, background:border }} /></div>
      <section style={{ maxWidth:720, margin:"0 auto", padding:"48px 32px" }}>
        <R><p style={{ fontSize:14, color:muted, marginBottom:16 }}>Want to discuss this further?</p></R>
        <R d={0.06}><a href="mailto:jack@locfortune.com" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 28px", borderRadius:100, fontSize:14, fontWeight:600, background:black, color:white }}>Get in touch <ArrowRight size={15} /></a></R>
      </section>
      <SubFooter onBack={onBack} />
    </div>
  );
}

// ═══ INSIGHTS PAGE ═══
function InsightsPage({ onBack, goArticle }) {
  const [filter, setFilter] = useState("All");
  useEffect(() => { window.scrollTo(0,0); }, []);
  const categories = ["All", ...Array.from(new Set(ARTICLES.map(a => a.category)))];
  const filtered = filter === "All" ? ARTICLES : ARTICLES.filter(a => a.category === filter);
  const featured = ARTICLES[ARTICLES.length - 1];
  return (
    <div style={{ background:white, color:black, fontFamily:"'Sora',sans-serif", minHeight:"100vh" }}>
      <style>{GLOBAL_STYLES}</style>
      <SubNav onBack={onBack} />
      <section style={{ maxWidth:1100, margin:"0 auto", padding:"120px 32px 40px" }}>
        <R><p className="mono" style={{ fontSize:11, color:dim, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:20 }}>Insights</p></R>
        <R d={0.06}><h1 style={{ fontSize:"clamp(32px,6vw,56px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-0.04em", marginBottom:16 }}>Perspectives on building, investing, and the Australian startup ecosystem.</h1></R>
      </section>
      <section style={{ maxWidth:1100, margin:"0 auto", padding:"0 32px 56px" }}>
        <R d={0.12}>
          <div onClick={() => goArticle(featured.slug)} className="lift" style={{ padding:40, borderRadius:20, border:`1px solid ${border}`, cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:40, flexWrap:"wrap" }}>
            <div style={{ flex:"1 1 400px" }}>
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:dim, display:"block", marginBottom:12 }}>Featured</span>
              <h2 style={{ fontSize:28, fontWeight:700, letterSpacing:"-0.02em", lineHeight:1.2, marginBottom:12 }}>{featured.title}</h2>
              <p style={{ fontSize:14, lineHeight:1.6, color:muted, marginBottom:16 }}>{featured.summary}</p>
              <span style={{ fontSize:12, color:dim }}>{featured.date} · {featured.readTime}</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:12, fontWeight:600, padding:"4px 14px", borderRadius:100, border:`1px solid ${border}` }}>{featured.category}</span>
              <ArrowUpRight size={16} color={dim} />
            </div>
          </div>
        </R>
      </section>
      <section style={{ maxWidth:1100, margin:"0 auto", padding:"0 32px 40px" }}>
        <R><div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{ padding:"8px 18px", borderRadius:100, fontSize:13, fontWeight:600, background:filter===cat?black:"transparent", color:filter===cat?white:muted, border:`1px solid ${filter===cat?black:border}`, cursor:"pointer", fontFamily:"'Sora',sans-serif", transition:"all 0.2s ease" }}>{cat}</button>
          ))}
        </div></R>
      </section>
      <section style={{ maxWidth:1100, margin:"0 auto", padding:"0 32px 88px" }}>
        <div className="articles-g" style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:16 }}>
          {filtered.map((a, i) => (
            <R key={a.slug} d={0.04 * i}>
              <div onClick={() => goArticle(a.slug)} className="lift" style={{ padding:24, borderRadius:16, border:`1px solid ${border}`, cursor:"pointer", height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                <div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                    <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:100, border:`1px solid ${border}` }}>{a.category}</span>
                    <ArrowUpRight size={14} color={dim} />
                  </div>
                  <h3 style={{ fontSize:16, fontWeight:700, lineHeight:1.3, letterSpacing:"-0.01em", marginBottom:10 }}>{a.title}</h3>
                  <p style={{ fontSize:13, lineHeight:1.55, color:muted, marginBottom:14 }}>{a.summary}</p>
                </div>
                <span style={{ fontSize:11, color:dim }}>{a.date} · {a.readTime}</span>
              </div>
            </R>
          ))}
        </div>
      </section>
      <SubFooter onBack={onBack} />
    </div>
  );
}

// ═══ LEGAL PAGES ═══
function TermsPage({ onBack }) {
  useEffect(() => { window.scrollTo(0,0); }, []);
  const s = [
    { t:"1. Acceptance of Terms", b:"By accessing and using the Loc Fortune Capital website (locfortune.vc), you accept and agree to be bound by these Terms of Use." },
    { t:"2. About Loc Fortune Capital", b:"Loc Fortune Capital Pty Ltd is a venture capital firm based in Sydney, Australia. The information provided on this website is for general informational purposes only and does not constitute financial advice, an offer to invest, or a solicitation of any kind." },
    { t:"3. No Financial Advice", b:"Nothing on this website should be construed as financial, investment, tax, or legal advice. You should consult with qualified professionals before making any investment decisions." },
    { t:"4. Intellectual Property", b:"All content on this website is the property of Loc Fortune Capital Pty Ltd and is protected by Australian and international copyright laws." },
    { t:"5. Portfolio Company Information", b:"Information about our portfolio companies is provided for informational purposes and may not reflect the most current status of these companies." },
    { t:"6. Third-Party Links", b:"This website may contain links to third-party websites. We are not responsible for the content or availability of these external sites." },
    { t:"7. Limitation of Liability", b:"To the fullest extent permitted by law, Loc Fortune Capital Pty Ltd shall not be liable for any damages arising from your use of this website." },
    { t:"8. Governing Law", b:"These Terms are governed by the laws of New South Wales, Australia." },
    { t:"9. Changes", b:"We may modify these Terms at any time. Continued use constitutes acceptance." },
    { t:"10. Contact", b:"Questions about these Terms? Contact us at jack@locfortune.com." },
  ];
  return (
    <div style={{ background:white, color:black, fontFamily:"'Sora',sans-serif", minHeight:"100vh" }}>
      <style>{GLOBAL_STYLES}</style><SubNav onBack={onBack} />
      <section style={{ maxWidth:720, margin:"0 auto", padding:"120px 32px 80px" }}>
        <R><p className="mono" style={{ fontSize:11, color:dim, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:20 }}>Legal</p></R>
        <R d={0.06}><h1 style={{ fontSize:40, fontWeight:800, letterSpacing:"-0.03em", marginBottom:12 }}>Terms of Use</h1></R>
        <R d={0.1}><p style={{ fontSize:13, color:dim, marginBottom:48 }}>Last updated: April 2026</p></R>
        {s.map((x,i) => (<R key={i} d={0.04*i}><div style={{ marginBottom:32 }}><h3 style={{ fontSize:16, fontWeight:700, marginBottom:8 }}>{x.t}</h3><p style={{ fontSize:14, lineHeight:1.75, color:muted }}>{x.b}</p></div></R>))}
      </section><SubFooter onBack={onBack} />
    </div>
  );
}
function PrivacyPage({ onBack }) {
  useEffect(() => { window.scrollTo(0,0); }, []);
  const s = [
    { t:"1. Introduction", b:"Loc Fortune Capital Pty Ltd is committed to protecting your privacy. We comply with the Australian Privacy Principles contained in the Privacy Act 1988 (Cth)." },
    { t:"2. Information We Collect", b:"We may collect personal information you provide when contacting us, including your name, email, phone number, and company name. We also automatically collect browsing data such as IP address and pages visited." },
    { t:"3. How We Use Your Information", b:"We use information to respond to enquiries, improve our website, and comply with legal obligations." },
    { t:"4. Information Sharing", b:"We do not sell or rent your personal information. We may share it with trusted service providers or where required by law." },
    { t:"5. Cookies", b:"Our website may use cookies to enhance your experience. You can set your browser to refuse cookies." },
    { t:"6. Data Security", b:"We implement reasonable security measures but cannot guarantee absolute security." },
    { t:"7. Third-Party Links", b:"This Privacy Policy does not apply to linked third-party websites." },
    { t:"8. Your Rights", b:"You may access, correct, or request deletion of your personal information by contacting jack@locfortune.com." },
    { t:"9. Changes", b:"We may update this policy. Changes will be posted on this page." },
    { t:"10. Contact", b:"Questions? Contact us at jack@locfortune.com." },
  ];
  return (
    <div style={{ background:white, color:black, fontFamily:"'Sora',sans-serif", minHeight:"100vh" }}>
      <style>{GLOBAL_STYLES}</style><SubNav onBack={onBack} />
      <section style={{ maxWidth:720, margin:"0 auto", padding:"120px 32px 80px" }}>
        <R><p className="mono" style={{ fontSize:11, color:dim, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:20 }}>Legal</p></R>
        <R d={0.06}><h1 style={{ fontSize:40, fontWeight:800, letterSpacing:"-0.03em", marginBottom:12 }}>Privacy Policy</h1></R>
        <R d={0.1}><p style={{ fontSize:13, color:dim, marginBottom:48 }}>Last updated: April 2026</p></R>
        {s.map((x,i) => (<R key={i} d={0.04*i}><div style={{ marginBottom:32 }}><h3 style={{ fontSize:16, fontWeight:700, marginBottom:8 }}>{x.t}</h3><p style={{ fontSize:14, lineHeight:1.75, color:muted }}>{x.b}</p></div></R>))}
      </section><SubFooter onBack={onBack} />
    </div>
  );
}

// ═══ MAIN ═══
export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [testIdx, setTestIdx] = useState(0);

  useEffect(() => { const f=()=>setScrolled(window.scrollY>50); window.addEventListener("scroll",f); return()=>window.removeEventListener("scroll",f); }, []);
  useEffect(() => { const id=setInterval(()=>setTestIdx(p=>(p+1)%TESTIMONIALS.length),5500); return()=>clearInterval(id); }, []);

  const go = (p) => { setPage(p); window.scrollTo(0,0); };
  const goHome = () => go("home");

  if (page === "terms") return <TermsPage onBack={goHome} />;
  if (page === "privacy") return <PrivacyPage onBack={goHome} />;
  if (page === "insights") return <InsightsPage onBack={goHome} goArticle={(s) => go("article:" + s)} />;
  if (page.startsWith("article:")) return <ArticlePage slug={page.replace("article:","")} onBack={() => go("insights")} />;
  if (COMPANIES[page]) return <CompanyPage slug={page} onBack={goHome} />;

  return (
    <div style={{ background:white, color:black, fontFamily:"'Sora',sans-serif", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{GLOBAL_STYLES}{`
        @keyframes mql{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .marquee{animation:mql 28s linear infinite}
        .marquee:hover{animation-play-state:paused}
        .section-num{font-family:'Space Mono',monospace;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:${dim}}
      `}</style>

      {menuOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:1000, background:white, padding:"24px 28px", display:"flex", flexDirection:"column" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:56 }}>
            <span style={{ fontSize:28, fontWeight:800, letterSpacing:"-0.06em" }}>L</span>
            <button onClick={()=>setMenuOpen(false)} style={{ background:"none", border:"none", cursor:"pointer" }}><X size={22} /></button>
          </div>
          {["About","Portfolio","Thesis","Insights","Contact"].map(l => (
            <a key={l} href={l==="Insights"?undefined:`#${l.toLowerCase()}`} onClick={()=>{setMenuOpen(false);if(l==="Insights")go("insights")}}
              style={{ fontSize:26, fontWeight:600, padding:"16px 0", borderBottom:`1px solid ${border}`, letterSpacing:"-0.02em", cursor:"pointer" }}>{l}</a>
          ))}
        </div>
      )}

      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:scrolled?"rgba(255,255,255,0.92)":"transparent", backdropFilter:scrolled?"blur(16px)":"none", borderBottom:scrolled?`1px solid ${border}`:"1px solid transparent", transition:"all 0.35s ease" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"14px 32px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <a href="/" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});history.replaceState(null,'','/');}} style={{ fontSize:28, fontWeight:800, letterSpacing:"-0.06em", lineHeight:1, cursor:"pointer" }}>L</a>
          <div className="desk" style={{ display:"flex", alignItems:"center", gap:28 }}>
            {["About","Portfolio","Thesis"].map(l => (<a key={l} href={`#${l.toLowerCase()}`} className="uline" style={{ fontSize:13, fontWeight:500, letterSpacing:"0.01em" }}>{l}</a>))}
            <button onClick={()=>go("insights")} className="uline" style={{ fontSize:13, fontWeight:500, letterSpacing:"0.01em", background:"none", border:"none", cursor:"pointer", fontFamily:"'Sora',sans-serif", padding:0 }}>Insights</button>
            <a href="#contact" style={{ padding:"9px 22px", borderRadius:100, fontSize:13, fontWeight:600, background:black, color:white, display:"inline-flex", alignItems:"center", gap:6 }}>Get in touch</a>
          </div>
          <button className="mob-show" onClick={()=>setMenuOpen(true)} style={{ display:"none", background:"none", border:"none", cursor:"pointer" }}><Menu size={20} /></button>
        </div>
      </nav>

      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"100px 32px 60px", maxWidth:1100, margin:"0 auto" }}>
        <R><h1 className="hero-h serif" style={{ fontSize:"clamp(52px,9vw,110px)", fontWeight:400, lineHeight:0.98, letterSpacing:"-0.02em" }}>Capital that</h1></R>
        <R d={0.1}><h1 className="hero-h serif" style={{ fontSize:"clamp(52px,9vw,110px)", fontWeight:400, lineHeight:0.98, letterSpacing:"-0.02em", fontStyle:"italic", marginBottom:36 }}>compounds.</h1></R>
        <R d={0.22}><p style={{ fontSize:17, lineHeight:1.7, color:muted, maxWidth:500 }}>Backing visionary founders at the intersection of disruptive technology and sustainable infrastructure. From Australia to the world.</p></R>
        <R d={0.3}><div style={{ display:"flex", gap:10, marginTop:32 }}>
          <a href="#portfolio" style={{ padding:"13px 28px", borderRadius:100, fontSize:14, fontWeight:600, background:black, color:white, display:"inline-flex", alignItems:"center", gap:7 }}>View portfolio <ArrowRight size={15} /></a>
          <a href="#thesis" style={{ padding:"13px 28px", borderRadius:100, fontSize:14, fontWeight:600, border:`1.5px solid ${border}`, display:"inline-flex", alignItems:"center", gap:7 }}>Our thesis</a>
        </div></R>
      </section>

      <div style={{ borderTop:`1px solid ${border}`, borderBottom:`1px solid ${border}` }}>
        <div className="marquee" style={{ display:"flex", width:"max-content" }}>
          {[...PORTFOLIO,...PORTFOLIO,...PORTFOLIO,...PORTFOLIO,...PORTFOLIO].map((c,i) => (
            <span key={i} onClick={()=>go(c.slug)} style={{ fontSize:13, fontWeight:600, padding:"18px 0", marginRight:40, whiteSpace:"nowrap", letterSpacing:"-0.01em", cursor:"pointer" }}>
              {c.name}<span style={{ color:dim, fontWeight:400, marginLeft:12 }}>{c.desc.split(",")[0].split(".")[0]}</span>
            </span>
          ))}
        </div>
      </div>

      <section id="about" style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px" }}>
        <R><h2 style={{ fontSize:"clamp(26px,4.5vw,42px)", fontWeight:700, lineHeight:1.15, letterSpacing:"-0.03em", maxWidth:620, marginBottom:52 }}>We invest in cutting-edge technology and sustainable renewables infrastructure.</h2></R>
        <R d={0.08}><div className="stats-g" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:border, borderRadius:16, overflow:"hidden" }}>
          {[{n:5,s:"",l:"Portfolio companies"},{n:13,s:"+",l:"Years of R&D backed"},{n:90,s:"K",l:"Tonnes facility capacity"},{n:2,s:"",l:"Investment verticals"}].map((s,i) => (
            <div key={i} style={{ padding:"32px 24px", background:white }}><div style={{ fontSize:44, fontWeight:800, letterSpacing:"-0.04em", lineHeight:1 }}><Counter end={s.n} suffix={s.s} /></div><p style={{ fontSize:13, color:muted, marginTop:4 }}>{s.l}</p></div>
          ))}
        </div></R>
      </section>

      <section id="portfolio" style={{ borderTop:`1px solid ${border}` }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px" }}>
          <R><div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:44 }}><span className="section-num">01</span><div style={{ flex:1, height:1, background:border }} /></div></R>
          <div className="vert-g" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"start" }}>
            <R d={0.06}><div>
              <p className="mono" style={{ fontSize:11, color:muted, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:14 }}>Technology</p>
              <h3 style={{ fontSize:"clamp(24px,3.5vw,36px)", fontWeight:700, letterSpacing:"-0.025em", lineHeight:1.15, marginBottom:16 }}>Disruptive technologies shaping the future.</h3>
              <p style={{ fontSize:15, lineHeight:1.7, color:muted }}>Focused on startups and established companies in fintech, cybersecurity, AI, and blockchain.</p>
            </div></R>
            <R d={0.14}><div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {PORTFOLIO.filter(c=>c.slug==="norg-ai"||c.slug==="tma-solutions"||c.slug==="number").map((c,i) => (
                <div key={i} className="lift" onClick={()=>go(c.slug)} style={{ padding:"24px", borderRadius:14, border:`1px solid ${border}`, cursor:"pointer" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}><span style={{ fontSize:16, fontWeight:700, letterSpacing:"-0.01em" }}>{c.name}</span><ArrowUpRight size={15} color={dim} /></div>
                  <p style={{ fontSize:13, color:muted, lineHeight:1.55 }}>{c.desc}</p>
                </div>
              ))}
            </div></R>
          </div>
        </div>
      </section>

      <section style={{ borderTop:`1px solid ${border}` }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px" }}>
          <R><div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:44 }}><span className="section-num">02</span><div style={{ flex:1, height:1, background:black }} /></div></R>
          <div className="vert-g" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"start" }}>
            <R d={0.06}><div>
              <p className="mono" style={{ fontSize:11, color:muted, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:14 }}>Sustainability</p>
              <h3 style={{ fontSize:"clamp(24px,3.5vw,36px)", fontWeight:700, letterSpacing:"-0.025em", lineHeight:1.15, marginBottom:16 }}>Renewables infrastructure for a net-zero future.</h3>
              <p style={{ fontSize:15, lineHeight:1.7, color:muted }}>From CSIRO-developed biochar replacing coal in steelmaking to net-zero magnesium production — backing the science that decarbonises industry.</p>
            </div></R>
            <R d={0.14}><div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {PORTFOLIO.filter(c=>c.slug==="pyrochar"||c.slug==="magnium").map((c,i) => (
                <div key={i} className="lift" onClick={()=>go(c.slug)} style={{ padding:"24px", borderRadius:14, border:`1px solid ${border}`, cursor:"pointer" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}><span style={{ fontSize:16, fontWeight:700, letterSpacing:"-0.01em" }}>{c.name}</span><span className="mono" style={{ fontSize:10, color:dim }}>{c.stat}</span></div>
                  <p style={{ fontSize:13, color:muted, lineHeight:1.55 }}>{c.desc}</p>
                </div>
              ))}
            </div></R>
          </div>
        </div>
      </section>

      <section id="thesis" style={{ borderTop:`1px solid ${border}`, background:bg }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px" }}>
          <R><div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:44 }}><span className="section-num">03</span><div style={{ flex:1, height:1, background:border }} /></div></R>
          <div className="vert-g" style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:72, alignItems:"start" }}>
            <R d={0.06}><div>
              <p className="mono" style={{ fontSize:11, color:muted, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:14 }}>Our thesis</p>
              <h3 style={{ fontSize:"clamp(24px,4vw,40px)", fontWeight:700, letterSpacing:"-0.03em", lineHeight:1.12, marginBottom:24 }}>Superior returns and environmental impact are not mutually exclusive.</h3>
              <p style={{ fontSize:15, lineHeight:1.75, color:muted, marginBottom:16 }}>Our mission is to drive transformative growth by investing in cutting-edge technology and sustainable renewables infrastructure. We foster innovation, support visionary entrepreneurs, and advance the transition to a greener future.</p>
              <p style={{ fontSize:15, lineHeight:1.75, color:muted }}>Our goal is to generate superior returns for our stakeholders while making a positive impact on the environment and society. Through strategic investments and a dedication to excellence, we create lasting value for our clients, communities, and the world.</p>
            </div></R>
            <R d={0.18}><div style={{ display:"flex", flexDirection:"column", gap:28 }}>
              {[{label:"Innovation",text:"Investing in disruptive technologies — fintech, cybersecurity, AI, and blockchain."},{label:"Agility",text:"Staying flexible and responsive to changing market conditions and client needs."},{label:"Smart Solutions",text:"Leveraging technology and market insights to develop intelligent investment strategies."}].map((p,i) => (
                <div key={i}><span style={{ fontSize:14, fontWeight:700, display:"block", marginBottom:6 }}>{p.label}</span><p style={{ fontSize:14, lineHeight:1.65, color:muted }}>{p.text}</p></div>
              ))}
            </div></R>
          </div>
        </div>
      </section>

      <section style={{ borderTop:`1px solid ${border}` }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px" }}>
          <R><p className="mono" style={{ fontSize:11, color:dim, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:44 }}>From our portfolio</p></R>
          <div style={{ position:"relative", minHeight:170, marginBottom:32 }}>
            {TESTIMONIALS.map((t,i) => (
              <div key={i} style={{ position:i===0?"relative":"absolute", top:0, left:0, right:0, opacity:testIdx===i?1:0, transform:testIdx===i?"translateY(0)":"translateY(16px)", transition:"all 0.6s cubic-bezier(0.16,1,0.3,1)", pointerEvents:testIdx===i?"auto":"none" }}>
                <blockquote className="serif" style={{ fontSize:"clamp(22px,3.5vw,32px)", fontWeight:400, lineHeight:1.35, letterSpacing:"-0.01em", maxWidth:700, marginBottom:24, fontStyle:"italic" }}>"{t.quote}"</blockquote>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:black, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:white }}>{t.initial}</div>
                  <div><p style={{ fontSize:14, fontWeight:600 }}>{t.name}</p><p style={{ fontSize:12, color:muted }}>{t.role}</p></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:6 }}>
            {TESTIMONIALS.map((_,i) => (<button key={i} onClick={()=>setTestIdx(i)} style={{ width:testIdx===i?24:8, height:8, borderRadius:100, border:"none", background:testIdx===i?black:"rgba(0,0,0,0.1)", cursor:"pointer", padding:0, transition:"all 0.3s ease" }} />))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ borderTop:`1px solid ${border}`, background:black, color:white }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px", textAlign:"center" }}>
          <R><h2 className="cta-h serif" style={{ fontSize:"clamp(32px,5.5vw,56px)", fontWeight:400, fontStyle:"italic", letterSpacing:"-0.02em", lineHeight:1.08, marginBottom:16 }}>Let's build something<br />extraordinary.</h2></R>
          <R d={0.08}><p style={{ fontSize:16, color:"#A1A1AA", maxWidth:400, margin:"0 auto 32px", lineHeight:1.6 }}>Whether you're a founder or an investor seeking impact — we'd love to hear from you.</p></R>
          <R d={0.14}><a href="mailto:jack@locfortune.com" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 32px", borderRadius:100, fontSize:14, fontWeight:600, background:white, color:black }}>Get in touch <ArrowRight size={15} /></a></R>
        </div>
      </section>

      <footer style={{ borderTop:`1px solid ${border}` }}>
        <div className="ft-g" style={{ maxWidth:1100, margin:"0 auto", padding:"44px 32px 28px", display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:36 }}>
          <div><span style={{ fontSize:24, fontWeight:800, letterSpacing:"-0.06em", display:"block" }}>L</span></div>
          <div>
            <p className="mono" style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:dim, marginBottom:12 }}>Company</p>
            {["About","Portfolio","Thesis"].map(l => (<a key={l} href={`#${l.toLowerCase()}`} className="uline" style={{ display:"block", fontSize:13, color:muted, marginBottom:10 }}>{l}</a>))}
            <button onClick={()=>go("insights")} className="uline" style={{ display:"block", fontSize:13, color:muted, marginBottom:10, background:"none", border:"none", cursor:"pointer", fontFamily:"'Sora',sans-serif", padding:0, textAlign:"left" }}>Insights</button>
          </div>
          <div>
            <p className="mono" style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:dim, marginBottom:12 }}>Social</p>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="uline" style={{ display:"block", fontSize:13, color:muted, marginBottom:10 }}>LinkedIn</a>
          </div>
          <div>
            <p className="mono" style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:dim, marginBottom:12 }}>Legal</p>
            <button onClick={()=>go("terms")} className="uline" style={{ display:"block", fontSize:13, color:muted, marginBottom:10, background:"none", border:"none", cursor:"pointer", fontFamily:"'Sora',sans-serif", padding:0, textAlign:"left" }}>Terms of Use</button>
            <button onClick={()=>go("privacy")} className="uline" style={{ display:"block", fontSize:13, color:muted, marginBottom:10, background:"none", border:"none", cursor:"pointer", fontFamily:"'Sora',sans-serif", padding:0, textAlign:"left" }}>Privacy Policy</button>
          </div>
        </div>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 32px 20px" }}>
          <div style={{ borderTop:`1px solid ${border}`, paddingTop:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <p style={{ fontSize:11, color:dim }}>© 2026 Loc Fortune Capital Pty Ltd</p>
            <span style={{ fontSize:11, color:dim }}>All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
