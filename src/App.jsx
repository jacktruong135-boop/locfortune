import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, ArrowLeft, Menu, X, ExternalLink, Send } from "lucide-react";

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
    overview: "TMA Solutions is one of Vietnam's premier software outsourcing companies, providing agile development, software testing, digital transformation, and innovation services.",
    stats: [{ value: "500+", label: "Engineers" }, { value: "7+", label: "Industries served" }, { value: "25+", label: "Years of operation" }],
    points: ["Full-service software development and testing", "Expertise in AI/ML, Big Data, IoT, Cloud, and 5G technologies", "Serving global clients across telecom, finance, insurance, healthcare, and logistics", "Digital transformation and innovation-as-a-service capabilities"],
  },
  "pyrochar": {
    name: "Pyrochar", sector: "Deep Tech", url: "https://pyrochar.com.au",
    headline: "Decarbonising steel with biochar.",
    overview: "Pyrochar is commercialising CSIRO-developed technology to produce net-zero emission metallurgical char (MetChar) that replaces coal and coke in the primary metals industry. The technology has been researched and developed over 13+ years.",
    stats: [{ value: "90,000t", label: "Facility capacity" }, { value: "13+", label: "Years of R&D" }, { value: "6.7%", label: "Global CO₂ from steel" }],
    points: ["First-of-its-kind MetChar for primary metals manufacture", "CSIRO-developed technology scaled for commercial production", "Constructing a 90,000-tonne facility in Collie, Western Australia", "30-year offtake agreement with Magnium Australia for green magnesium refining", "Self-sustaining pyrolysis process using organic waste feedstock"],
  },
  "magnium": {
    name: "Magnium", sector: "Deep Tech", url: "https://www.magnium.com.au",
    headline: "Net-zero magnesium for a critical future.",
    overview: "Magnium commercialises world-leading research from Australia's national science agency to manufacture net-zero carbon, zero-toxin magnesium metal — a critical mineral. They aim to reduce global CO₂ emissions by 1% by 2050.",
    stats: [{ value: "1%", label: "Global CO₂ reduction target" }, { value: "2050", label: "Target year" }, { value: "1st", label: "Green magnesium plant globally" }],
    points: ["Manufacturing net-zero carbon, zero-toxin magnesium metal", "Magnesium is classified as a critical mineral globally", "Partnered with Pyrochar for net-zero carbon supply", "First fully integrated green magnesium production facility in the world", "Targeting 1% reduction in global CO₂ emissions by 2050"],
  },
  "number": {
    name: "Number", sector: "Technology", url: "https://number.com.au",
    headline: "AI voice calls and search optimisation for Australian businesses.",
    overview: "Number provides AI-powered voice calls, AI search optimisation (GEO), and custom AI solutions for Australian businesses.",
    stats: [{ value: "AI", label: "Voice calls" }, { value: "GEO", label: "Search optimisation" }, { value: "AU", label: "Built for Australia" }],
    points: ["AI-powered voice calls that book meetings and handle customer enquiries", "AI search optimisation (GEO) helping brands get discovered by ChatGPT and other AI engines", "Custom AI solutions tailored to Australian businesses", "Helping businesses automate outreach and scale conversations"],
  },
  "moskin": {
    name: "MOSkin", sector: "MedTech", url: "https://moskin-dosimetry.com",
    headline: "Real-time skin-dose verification within minutes.",
    overview: "MOSkin is transforming radiation dosimetry with a fast, low-cost, single-use dosimeter system that delivers real-time skin-dose verification at the console — no spreadsheets, no sterilisation, no cables. Developed by Electrogenics Laboratories and backed by ISO 13485 certification and peer-reviewed evidence.",
    stats: [{ value: "20+", label: "Global institutions tested" }, { value: "80%", label: "Global patent coverage" }, { value: "ISO", label: "13485 certified" }],
    points: ["Real-time skin-dose verification in 3–5 minutes vs hours for legacy systems", "Single-use, disposable sensors — no disinfection, no cables, no specialist staff required", "Fully patented with 80% global market coverage, tested in 20+ international institutions", "Good Design Award winner — patient-first design philosophy", "ISO 13485 certified with peer-reviewed clinical evidence", "Scalable razor/razorblade business model: consumable dosimeters, hub hardware, and software licenses"],
  },
};

const PORTFOLIO = [
  { name: "MOSkin", slug: "moskin", desc: "Real-time skin-dose verification — fast, low-cost dosimetry replacing outdated systems in radiation oncology.", stat: "MedTech", sector: "MedTech" },
  { name: "Pyrochar", slug: "pyrochar", desc: "Commercialising CSIRO-developed technology to produce net-zero metallurgical char, replacing coal in primary metals production.", stat: "90,000t", sector: "Deep Tech" },
  { name: "Magnium", slug: "magnium", desc: "Manufacturing net-zero magnesium metal — a critical mineral — through world-leading research commercialisation.", stat: "1%", sector: "Deep Tech" },
  { name: "Norg AI", slug: "norg-ai", desc: "Helping brands dominate AI search results, reaching billions of shoppers who ask AI before they buy.", stat: "AI", sector: "Technology" },
  { name: "TMA Solutions", slug: "tma-solutions", desc: "One of Vietnam's premier software outsourcing companies, delivering agile development and exceptional IT solutions.", stat: "500+", sector: "Technology" },
  { name: "Number", slug: "number", desc: "AI-powered voice calls, AI search optimisation, and custom AI solutions for Australian businesses.", stat: "GEO", sector: "Technology" },
];

const TESTIMONIALS = [
  { quote: "Loc Fortune understood our vision before anyone else. Their conviction beyond funding sets them apart.", name: "Pyrochar", role: "Portfolio Company", initial: "P" },
  { quote: "A firm that backs founders with genuine conviction. They've been in our corner from day one.", name: "Magnium", role: "Portfolio Company", initial: "M" },
  { quote: "The team brings deep strategic thinking about where technology meets real business outcomes.", name: "Norg AI", role: "Portfolio Company", initial: "N" },
];

const ARTICLES = [
  { slug:"real-cost-raising-seed-round-australia", title:"The Real Cost of Raising a Seed Round in Australia", category:"Fundraising", date:"5 January 2026", readTime:"8 min read", summary:"Beyond equity dilution, there are hidden costs every Australian founder should understand before starting a raise.", content:[{type:"p",text:"Raising a seed round in Australia is often romanticised. The pitch, the term sheet, the announcement. But the real cost of raising goes far beyond the equity you give away."},{type:"h",text:"The Financial Costs"},{type:"p",text:"Legal fees are the most obvious direct cost. A standard seed round requires a Shareholders Agreement, share subscription documents, and potentially investor-side legal review."},{type:"h",text:"The Time Cost"},{type:"p",text:"This is the cost most founders underestimate. A seed raise typically takes several months from first meeting to money in the bank."},{type:"h",text:"The Dilution Cost"},{type:"p",text:"Dilution is expected — it's the price of growth capital. The question isn't whether dilution is worth it, but whether you're raising at the right time with the right terms."},{type:"h",text:"Our Perspective"},{type:"p",text:"Know your numbers before you start. Have a clear use of funds. The founders who raise most efficiently treat fundraising as a sprint, not a marathon."}] },
  { slug:"melbourne-australias-ai-capital", title:"Why Melbourne is Quietly Becoming Australia's AI Capital", category:"Market", date:"19 January 2026", readTime:"8 min read", summary:"Melbourne's combination of research depth, talent, and cost advantages is making it an increasingly important hub for AI startups.", content:[{type:"p",text:"When people think of Australia's tech scene, Sydney usually comes to mind first. But Melbourne has been quietly building something remarkable in artificial intelligence."},{type:"h",text:"The Research Pipeline"},{type:"p",text:"Melbourne is home to some of the strongest AI research institutions in the southern hemisphere."},{type:"h",text:"Cost Advantages"},{type:"p",text:"Melbourne's cost of living and office space remains lower than Sydney's. For early-stage AI companies, this matters."},{type:"h",text:"The Community Effect"},{type:"p",text:"Melbourne's AI community has been growing steadily. We're watching this space closely."}] },
  { slug:"mistakes-that-kill-series-a-fundraises", title:"5 Mistakes That Kill Series A Fundraises", category:"Founders", date:"3 February 2026", readTime:"7 min read", summary:"The most common errors we see founders make when stepping up from seed to Series A.", content:[{type:"p",text:"The jump from seed to Series A is where many promising startups stall."},{type:"h",text:"1. Raising Too Early"},{type:"p",text:"Series A investors want to see evidence of product-market fit, not just early traction."},{type:"h",text:"2. Focusing on the Wrong Metrics"},{type:"p",text:"Revenue matters, but retention, unit economics, and scalability matter more."},{type:"h",text:"3. No Clear Use of Funds"},{type:"p",text:"Investors want to see how capital translates to specific milestones."},{type:"h",text:"4. Ignoring the Narrative"},{type:"p",text:"Data supports the narrative — it doesn't replace it."},{type:"h",text:"5. Running a Slow Process"},{type:"p",text:"Momentum matters enormously. Prepare everything before your first meeting."}] },
  { slug:"lp-perspective-what-makes-us-write-cheques", title:"The LP Perspective: What Makes Us Write Cheques", category:"Strategy", date:"17 February 2026", readTime:"7 min read", summary:"What limited partners look for when evaluating venture funds.", content:[{type:"p",text:"Most founders think about VCs as the top of the capital food chain. But VCs raise money from Limited Partners too."},{type:"h",text:"Returns Are Table Stakes"},{type:"p",text:"LPs expect strong returns. But consistency, transparency, and differentiation matter just as much."},{type:"h",text:"Differentiation Wins"},{type:"p",text:"LPs are wary of generic strategies. Specificity is an edge."},{type:"h",text:"What This Means for Founders"},{type:"p",text:"When a VC passes, it's not always about you. Fund strategy and LP expectations play a role."}] },
  { slug:"deep-tech-moment-australia", title:"Deep Tech is Having Its Moment in Australia", category:"Market", date:"3 March 2026", readTime:"8 min read", summary:"Australian deep tech startups are attracting growing attention.", content:[{type:"p",text:"For years, Australian deep tech founders faced limited local capital. That's changing."},{type:"h",text:"The CSIRO Effect"},{type:"p",text:"Australia's national science agency has become one of the most prolific generators of commercially viable deep tech."},{type:"h",text:"Growing Investor Interest"},{type:"p",text:"International funds are increasingly looking at Australia."},{type:"h",text:"What Needs to Happen Next"},{type:"p",text:"The ecosystem needs more patient capital and stronger university-to-startup pathways."}] },
  { slug:"build-board-that-actually-helps", title:"How to Build a Board That Actually Helps", category:"Founders", date:"10 March 2026", readTime:"7 min read", summary:"Most startup boards are either rubber stamps or conflict zones.", content:[{type:"p",text:"A great board is one of the most powerful tools a founder can have."},{type:"h",text:"Composition Matters"},{type:"p",text:"Early-stage boards should be small. Mix operational experience, domain expertise, and financial acumen."},{type:"h",text:"Set Expectations Early"},{type:"p",text:"A short conversation upfront prevents years of misalignment."},{type:"h",text:"Run Effective Meetings"},{type:"p",text:"If your board meetings feel like status updates, you're wasting the room's collective experience."}] },
  { slug:"state-of-australian-venture-q1-2026", title:"State of Australian Venture: Our Q1 2026 Observations", category:"Market", date:"15 March 2026", readTime:"8 min read", summary:"Our perspective on the Australian venture landscape.", content:[{type:"p",text:"The Australian ecosystem feels like it's entering a new phase."},{type:"h",text:"Activity Is Picking Up"},{type:"p",text:"We're seeing more deals at seed and pre-seed stage."},{type:"h",text:"Valuations Feel More Rational"},{type:"p",text:"Seed-stage pricing feels more grounded."},{type:"h",text:"Looking Ahead"},{type:"p",text:"For founders with clear metrics and a compelling story, the window looks favourable."}] },
  { slug:"why-we-back-technical-founders", title:"Why We Back Technical Founders", category:"Founders", date:"21 March 2026", readTime:"6 min read", summary:"Our perspective on why technical founders often have a structural advantage.", content:[{type:"p",text:"At Loc Fortune, we have a natural affinity for technical founders."},{type:"h",text:"Speed of Iteration"},{type:"p",text:"Technical founders can build and ship without depending on external teams."},{type:"h",text:"What We Look For"},{type:"p",text:"The best technical founders fell in love with the problem first and chose technology as the solution."}] },
  { slug:"revenue-share-vs-equity-early-stage", title:"Revenue Share vs Equity: New Funding Models", category:"Fundraising", date:"24 March 2026", readTime:"7 min read", summary:"Equity isn't the only option. Exploring alternatives gaining traction.", content:[{type:"p",text:"The traditional venture model has been the default for decades. But alternatives are gaining traction."},{type:"h",text:"Revenue-Based Financing"},{type:"p",text:"For companies with predictable recurring revenue, this can be less dilutive and faster to close."},{type:"h",text:"Matching Structure to Strategy"},{type:"p",text:"The best founders think about funding structure as a strategic decision rather than a default."}] },
  { slug:"australian-founders-guide-to-raising-pre-seed", title:"The Australian Founder's Guide to Raising Pre-Seed", category:"Fundraising", date:"28 March 2026", readTime:"8 min read", summary:"A practical guide to navigating the pre-seed landscape in Australia.", content:[{type:"p",text:"Pre-seed is the most ambiguous stage in venture."},{type:"h",text:"What Pre-Seed Means"},{type:"p",text:"In Australia, pre-seed typically means raising enough capital to go from idea to initial product-market fit signals."},{type:"h",text:"The Process"},{type:"p",text:"Pre-seed rounds often come together through warm introductions. Build relationships before you need capital."}] },
];

const LINKEDIN = "https://www.linkedin.com/company/loc-fortune-capital/";

// ─── Hooks ───
function useReveal(t=0.12){const ref=useRef(null);const [v,setV]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.unobserve(el)}},{threshold:t});o.observe(el);return()=>o.disconnect()},[]);return[ref,v]}
function Counter({end,suffix=""}){const[ref,vis]=useReveal(0.3);const[v,setV]=useState(0);useEffect(()=>{if(!vis)return;let n=0;const step=Math.max(1,Math.ceil(end/40));const id=setInterval(()=>{n+=step;if(n>=end){setV(end);clearInterval(id)}else setV(n)},35);return()=>clearInterval(id)},[vis,end]);return <span ref={ref}>{v.toLocaleString()}{suffix}</span>}
function R({children,d=0,style={}}){const[ref,vis]=useReveal(0.08);return <div ref={ref} style={{...style,opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(32px)",transition:`opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s`}}>{children}</div>}

// ─── Text Reveal ───
function TextReveal({text,style={}}){
  const ref=useRef(null);const[progress,setProgress]=useState(0);
  useEffect(()=>{const el=ref.current;if(!el)return;const h=()=>{const r=el.getBoundingClientRect();const s=window.innerHeight*0.85;const e=window.innerHeight*0.35;setProgress(Math.max(0,Math.min(1,(s-r.top)/(s-e))))};window.addEventListener("scroll",h,{passive:true});h();return()=>window.removeEventListener("scroll",h)},[]);
  const words=text.split(" ");
  return <div ref={ref} style={style}>{words.map((w,i)=>{const wp=Math.max(0,Math.min(1,(progress*words.length-i)*2));return <span key={i} style={{display:"inline-block",opacity:0.15+wp*0.85,transition:"opacity 0.1s",marginRight:"0.3em"}}>{w}</span>})}</div>;
}

// ─── Parallax ───
function Parallax({children,speed=0.3,style={}}){
  const ref=useRef(null);const[offset,setOffset]=useState(0);
  useEffect(()=>{const h=()=>{if(!ref.current)return;const r=ref.current.getBoundingClientRect();setOffset((r.top+r.height/2-window.innerHeight/2)*speed)};window.addEventListener("scroll",h,{passive:true});h();return()=>window.removeEventListener("scroll",h)},[speed]);
  return <div ref={ref} style={{...style,transform:`translateY(${offset}px)`,willChange:"transform"}}>{children}</div>;
}

// ─── Sticky Horizontal Scroll ───
function StickyPortfolio({ companies, onCardClick }) {
  const outerRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);

  // Hardcoded dimensions for reliability
  const CARD_W = 360;
  const GAP = 14;
  const PAD = 32;
  const totalTrackWidth = companies.length * CARD_W + (companies.length - 1) * GAP + PAD * 2;
  const [viewW, setViewW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000);
  const scrollDistance = Math.max(0, totalTrackWidth - viewW);

  useEffect(() => {
    const onResize = () => setViewW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (scrollDistance <= 0) return;
    const handle = () => {
      if (!outerRef.current) return;
      const top = outerRef.current.getBoundingClientRect().top;
      const travel = outerRef.current.offsetHeight - window.innerHeight;
      if (travel <= 0) return;
      const progress = Math.max(0, Math.min(1, -top / travel));
      setTranslateX(-progress * scrollDistance);
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, [scrollDistance]);

  return (
    <div ref={outerRef} style={{ height: window.innerHeight + scrollDistance, position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100dvh",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
        borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`,
      }}>
        {/* Header */}
        <div style={{ padding: "80px 32px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", maxWidth: 1100, margin: "0 auto", width: "100%", flexShrink: 0 }}>
          <div>
            <p className="mono" style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: dim, marginBottom: 8 }}>Portfolio</p>
            <h3 style={{ fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.15 }}>Companies we've backed.</h3>
          </div>
          <p style={{ fontSize: 12, color: dim }}>Scroll ↓</p>
        </div>

        {/* Cards */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", overflow: "hidden", padding: `0 ${PAD}px` }}>
          <div style={{ display: "flex", gap: GAP, transform: `translateX(${translateX}px)`, willChange: "transform" }}>
            {companies.map((c, i) => (
              <div key={i} className="lift" onClick={() => onCardClick && onCardClick(c.slug)} style={{
                flexShrink: 0, width: CARD_W, padding: 28, borderRadius: 16,
                border: `1px solid ${border}`, background: white, cursor: "pointer",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                minHeight: 240,
              }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>{c.name}</span>
                    <ArrowUpRight size={16} color={dim} />
                  </div>
                  <p style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>{c.desc}</p>
                </div>
                <div style={{ borderTop: `1px solid ${border}`, paddingTop: 14, marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="mono" style={{ fontSize: 11, color: dim, letterSpacing: "0.06em", textTransform: "uppercase" }}>{c.sector}</span>
                  <span className="mono" style={{ fontSize: 11, color: black, fontWeight: 700 }}>{c.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div style={{ padding: "16px 32px 28px", maxWidth: 1100, margin: "0 auto", width: "100%", flexShrink: 0 }}>
          <div style={{ height: 2, background: border, borderRadius: 1, overflow: "hidden" }}>
            <div style={{ height: "100%", background: black, borderRadius: 1, width: `${scrollDistance > 0 ? Math.min(100, Math.abs(translateX / scrollDistance) * 100) : 0}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

const black="#0A0A0A",white="#FFFFFF",bg="#FAFAFA",muted="#71717A",dim="#A1A1AA",border="rgba(0,0,0,0.08)",borderHover="rgba(0,0,0,0.16)";

const GLOBAL_STYLES=`
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
  .lift{transition:transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease}
  .lift:hover{transform:translateY(-4px);border-color:${borderHover}!important;box-shadow:0 8px 32px rgba(0,0,0,0.06)}
  .input-field{width:100%;padding:14px 18px;border-radius:12px;border:1px solid ${border};background:${white};font-size:14px;font-family:'Sora',sans-serif;outline:none;transition:border-color 0.2s}
  .input-field:focus{border-color:${black}}
  .input-field::placeholder{color:${dim}}
  .h-scroll{overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;scrollbar-width:none;cursor:grab}
  .h-scroll::-webkit-scrollbar{display:none}
  .h-scroll:active{cursor:grabbing}
  .p-card{flex-shrink:0;width:340px;padding:28px;border-radius:16px;border:1px solid ${border};background:${white};cursor:pointer;transition:transform 0.3s ease,border-color 0.3s ease,box-shadow 0.3s ease;display:flex;flex-direction:column;justify-content:space-between;min-height:220px}
  .p-card:hover{transform:translateY(-4px);border-color:${borderHover};box-shadow:0 8px 32px rgba(0,0,0,0.06)}
  .section-num{font-family:'Space Mono',monospace;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:${dim}}
  @media(max-width:800px){
    .desk{display:none!important}
    .mob-show{display:flex!important}
    .hero-h{font-size:48px!important}
    .stats-g{grid-template-columns:1fr 1fr!important}
    .vert-g{grid-template-columns:1fr!important}
    .ft-g{grid-template-columns:1fr 1fr!important}
    .cta-h{font-size:32px!important}
    .articles-g{grid-template-columns:1fr!important}
    .about-g{grid-template-columns:1fr!important}
    .p-card{width:280px;min-height:200px}
  }
`;

// ─── Shared components ───
function SubNav({onBack,rightElement}){return <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"rgba(255,255,255,0.92)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${border}`}}><div style={{maxWidth:1100,margin:"0 auto",padding:"14px 32px",display:"flex",alignItems:"center",justifyContent:"space-between"}}><button onClick={onBack} style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"'Sora',sans-serif"}}><ArrowLeft size={16}/> Back</button><a href="#" onClick={e=>{e.preventDefault();onBack()}} style={{fontSize:28,fontWeight:800,letterSpacing:"-0.06em",lineHeight:1}}>L</a>{rightElement||<div style={{width:100}}/>}</div></nav>}
function SubFooter({onBack}){return <footer style={{borderTop:`1px solid ${border}`,marginTop:32}}><div style={{maxWidth:1100,margin:"0 auto",padding:"24px 32px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><button onClick={onBack} style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"'Sora',sans-serif",color:muted}}><ArrowLeft size={14}/> Back to Loc Fortune</button><p style={{fontSize:11,color:dim}}>© 2026 Loc Fortune Capital Pty Ltd</p></div></footer>}

// ═══ ABOUT PAGE ═══
function AboutPage({onBack,goPitch}){
  useEffect(()=>{window.scrollTo(0,0)},[]);
  return <div style={{background:white,color:black,fontFamily:"'Sora',sans-serif",minHeight:"100vh"}}>
    <style>{GLOBAL_STYLES}</style>
    <SubNav onBack={onBack} rightElement={<button onClick={goPitch} style={{padding:"9px 22px",borderRadius:100,fontSize:13,fontWeight:600,background:black,color:white,display:"inline-flex",alignItems:"center",gap:6,border:"none",cursor:"pointer",fontFamily:"'Sora',sans-serif"}}>Pitch to us <ArrowRight size={13}/></button>}/>
    <section style={{maxWidth:1100,margin:"0 auto",padding:"120px 32px 60px"}}>
      <R><p className="mono" style={{fontSize:11,color:dim,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:20}}>About</p></R>
      <R d={0.06}><h1 className="serif" style={{fontSize:"clamp(36px,7vw,72px)",fontWeight:400,lineHeight:1,letterSpacing:"-0.02em",marginBottom:12}}>We back founders</h1></R>
      <R d={0.1}><h1 className="serif" style={{fontSize:"clamp(36px,7vw,72px)",fontWeight:400,lineHeight:1,letterSpacing:"-0.02em",fontStyle:"italic",marginBottom:36}}>before the world catches on.</h1></R>
      <R d={0.18}><p style={{fontSize:17,lineHeight:1.7,color:muted,maxWidth:580}}>Loc Fortune Capital was founded on a simple premise: the most compelling returns come from founders who see what others don't — and have the conviction to build toward it before the market agrees.</p></R>
    </section>
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 32px"}}><div style={{height:1,background:border}}/></div>
    <section style={{maxWidth:1100,margin:"0 auto",padding:"64px 32px"}}>
      <div className="about-g" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"start"}}>
        <R d={0.06}><div>
          <p className="mono" style={{fontSize:11,color:dim,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:14}}>Our approach</p>
          <h3 style={{fontSize:28,fontWeight:700,letterSpacing:"-0.02em",lineHeight:1.2,marginBottom:20}}>We invest early and stay long.</h3>
          <p style={{fontSize:15,lineHeight:1.75,color:muted,marginBottom:16}}>We partner with founders at the earliest stages — often when the technology is proven but the commercial path is still being carved. We're comfortable with complexity, deep science, and long time horizons because that's where the most defensible businesses are built.</p>
          <p style={{fontSize:15,lineHeight:1.75,color:muted}}>Our portfolio spans technology, deep tech, and medtech — because the founders solving the hardest problems tend to generate the strongest returns. The world needs what they're building, and the market is beginning to agree.</p>
        </div></R>
        <R d={0.14}><div style={{display:"flex",flexDirection:"column",gap:32}}>
          {[
            {label:"What we invest in",text:"Early-stage companies building technology that disrupts how industries operate — from AI and software to advanced materials and medical devices."},
            {label:"What we look for",text:"Domain obsession, technical depth, intellectual honesty, and the ability to articulate a complex problem simply. We back founders who fell in love with the problem before the solution."},
            {label:"How we help",text:"Every portfolio company gets direct access to our network, our thinking, and our time. We help with follow-on fundraising, strategic introductions, and the hard decisions that come with scaling."},
            {label:"Our edge",text:"We invest with conviction at stages where others hesitate. That willingness to move early — and stay — is what compounds."},
          ].map((p,i)=>(<div key={i}><span style={{fontSize:14,fontWeight:700,display:"block",marginBottom:6}}>{p.label}</span><p style={{fontSize:14,lineHeight:1.65,color:muted}}>{p.text}</p></div>))}
        </div></R>
      </div>
    </section>
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 32px"}}><div style={{height:1,background:border}}/></div>
    <section style={{maxWidth:1100,margin:"0 auto",padding:"64px 32px",textAlign:"center"}}>
      <R><h3 style={{fontSize:24,fontWeight:700,letterSpacing:"-0.02em",marginBottom:8}}>Have something worth building?</h3></R>
      <R d={0.06}><p style={{fontSize:15,color:muted,marginBottom:24}}>We'd love to hear what you're working on.</p></R>
      <R d={0.1}><button onClick={goPitch} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"14px 32px",borderRadius:100,fontSize:14,fontWeight:600,background:black,color:white,border:"none",cursor:"pointer",fontFamily:"'Sora',sans-serif"}}>Pitch to us <ArrowRight size={15}/></button></R>
    </section>
    <SubFooter onBack={onBack}/>
  </div>;
}

// ═══ PITCH PAGE ═══
function PitchPage({onBack}){
  const[form,setForm]=useState({name:"",email:"",company:"",stage:"",sector:"",description:""});const[submitted,setSubmitted]=useState(false);
  useEffect(()=>{window.scrollTo(0,0)},[]);
  const handleSubmit=()=>{const s=encodeURIComponent(`Pitch: ${form.company||"New Company"}`);const b=encodeURIComponent(`Founder: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nStage: ${form.stage}\nSector: ${form.sector}\n\n${form.description}`);window.location.href=`mailto:jack@locfortune.com?subject=${s}&body=${b}`;setSubmitted(true)};
  return <div style={{background:white,color:black,fontFamily:"'Sora',sans-serif",minHeight:"100vh"}}><style>{GLOBAL_STYLES}</style><SubNav onBack={onBack}/>
    <section style={{maxWidth:640,margin:"0 auto",padding:"120px 32px 80px"}}>
      <R><p className="mono" style={{fontSize:11,color:dim,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:20}}>Get in touch</p></R>
      <R d={0.06}><h1 style={{fontSize:"clamp(28px,5vw,44px)",fontWeight:800,lineHeight:1.1,letterSpacing:"-0.03em",marginBottom:12}}>Pitch to us</h1></R>
      <R d={0.1}><p style={{fontSize:15,lineHeight:1.7,color:muted,marginBottom:40}}>Tell us about what you're building. We review every submission and aim to respond within a week.</p></R>
      {submitted?(<R><div style={{padding:40,borderRadius:20,border:`1px solid ${border}`,textAlign:"center"}}><div style={{width:48,height:48,borderRadius:"50%",background:black,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}><Send size={20} color={white}/></div><h3 style={{fontSize:20,fontWeight:700,marginBottom:8}}>Your email app should have opened</h3><p style={{fontSize:14,color:muted}}>Just hit send. Or email us directly at <strong>jack@locfortune.com</strong>.</p></div></R>):(
      <R d={0.14}><div style={{display:"flex",flexDirection:"column",gap:20}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}><div><label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:6}}>Your name</label><input className="input-field" placeholder="Jane Smith" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div><div><label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:6}}>Email</label><input className="input-field" type="email" placeholder="jane@company.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div></div>
        <div><label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:6}}>Company name</label><input className="input-field" placeholder="Your company" value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}><div><label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:6}}>Stage</label><select className="input-field" value={form.stage} onChange={e=>setForm({...form,stage:e.target.value})} style={{cursor:"pointer",appearance:"auto"}}><option value="">Select stage</option><option>Pre-seed</option><option>Seed</option><option>Series A</option><option>Series B+</option><option>Other</option></select></div><div><label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:6}}>Sector</label><select className="input-field" value={form.sector} onChange={e=>setForm({...form,sector:e.target.value})} style={{cursor:"pointer",appearance:"auto"}}><option value="">Select sector</option><option>AI / Machine Learning</option><option>Fintech</option><option>Cybersecurity</option><option>Deep Tech</option><option>MedTech</option><option>SaaS</option><option>Other</option></select></div></div>
        <div><label style={{fontSize:12,fontWeight:600,display:"block",marginBottom:6}}>Tell us about your company</label><textarea className="input-field" placeholder="What problem are you solving? What's your traction? What are you raising?" rows={6} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} style={{resize:"vertical",minHeight:120}}/></div>
        <button onClick={handleSubmit} style={{padding:"14px 32px",borderRadius:100,fontSize:14,fontWeight:600,background:black,color:white,border:"none",cursor:"pointer",fontFamily:"'Sora',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",marginTop:8}}>Submit pitch <Send size={15}/></button>
        <p style={{fontSize:12,color:dim,textAlign:"center"}}>Opens your email app with details pre-filled.</p>
      </div></R>)}
    </section><SubFooter onBack={onBack}/></div>;
}

// ═══ COMPANY PAGE ═══
function CompanyPage({slug,onBack}){const c=COMPANIES[slug];if(!c)return null;useEffect(()=>{window.scrollTo(0,0)},[]);
  return <div style={{background:white,color:black,fontFamily:"'Sora',sans-serif",minHeight:"100vh"}}><style>{GLOBAL_STYLES}</style>
    <SubNav onBack={onBack} rightElement={<a href={c.url} target="_blank" rel="noopener noreferrer" style={{padding:"9px 22px",borderRadius:100,fontSize:13,fontWeight:600,background:black,color:white,display:"inline-flex",alignItems:"center",gap:6}}>Visit website <ExternalLink size={13}/></a>}/>
    <section style={{maxWidth:1100,margin:"0 auto",padding:"120px 32px 60px"}}><R><p className="mono" style={{fontSize:11,color:dim,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:20}}>{c.sector}</p></R><R d={0.06}><h1 style={{fontSize:"clamp(40px,7vw,72px)",fontWeight:800,lineHeight:0.98,letterSpacing:"-0.04em",marginBottom:16}}>{c.name}</h1></R><R d={0.12}><p className="serif" style={{fontSize:"clamp(20px,3vw,30px)",fontWeight:400,fontStyle:"italic",lineHeight:1.3,color:muted,maxWidth:600,marginBottom:40}}>{c.headline}</p></R><R d={0.18}><a href={c.url} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"13px 28px",borderRadius:100,fontSize:14,fontWeight:600,background:black,color:white}}>Visit {c.name} <ExternalLink size={14}/></a></R></section>
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 32px"}}><div style={{height:1,background:border}}/></div>
    <section style={{maxWidth:1100,margin:"0 auto",padding:"56px 32px"}}><R><div style={{display:"grid",gridTemplateColumns:`repeat(${c.stats.length},1fr)`,gap:1,background:border,borderRadius:16,overflow:"hidden"}}>{c.stats.map((s,i)=>(<div key={i} style={{padding:"32px 24px",background:white}}><div style={{fontSize:36,fontWeight:800,letterSpacing:"-0.04em",lineHeight:1}}>{s.value}</div><p style={{fontSize:13,color:muted,marginTop:4}}>{s.label}</p></div>))}</div></R></section>
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 32px"}}><div style={{height:1,background:border}}/></div>
    <section style={{maxWidth:1100,margin:"0 auto",padding:"56px 32px"}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:56}}><R d={0.06}><div><p className="mono" style={{fontSize:11,color:dim,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:14}}>Overview</p><p style={{fontSize:16,lineHeight:1.75,color:muted}}>{c.overview}</p></div></R><R d={0.14}><div><p className="mono" style={{fontSize:11,color:dim,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:14}}>Key highlights</p><div style={{display:"flex",flexDirection:"column",gap:14}}>{c.points.map((p,i)=>(<div key={i} style={{display:"flex",gap:12,alignItems:"flex-start"}}><div style={{width:5,height:5,borderRadius:"50%",background:black,marginTop:7,flexShrink:0}}/><p style={{fontSize:14,lineHeight:1.6,color:muted}}>{p}</p></div>))}</div></div></R></div></section>
    <div style={{maxWidth:1100,margin:"0 auto",padding:"0 32px"}}><div style={{height:1,background:border}}/></div>
    <section style={{maxWidth:1100,margin:"0 auto",padding:"56px 32px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:24}}><R><div><h3 style={{fontSize:24,fontWeight:700,letterSpacing:"-0.02em",marginBottom:4}}>Interested in {c.name}?</h3><p style={{fontSize:14,color:muted}}>Visit their website to learn more.</p></div></R><R d={0.08}><a href={c.url} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"13px 28px",borderRadius:100,fontSize:14,fontWeight:600,background:black,color:white}}>Visit website <ExternalLink size={14}/></a></R></section>
    <SubFooter onBack={onBack}/></div>;
}

// ═══ ARTICLE PAGE ═══
function ArticlePage({slug,onBack}){const a=ARTICLES.find(x=>x.slug===slug);if(!a)return null;useEffect(()=>{window.scrollTo(0,0)},[]);
  return <div style={{background:white,color:black,fontFamily:"'Sora',sans-serif",minHeight:"100vh"}}><style>{GLOBAL_STYLES}</style><SubNav onBack={onBack}/>
    <section style={{maxWidth:720,margin:"0 auto",padding:"120px 32px 60px"}}><R><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><span style={{fontSize:12,fontWeight:600,padding:"4px 12px",borderRadius:100,border:`1px solid ${border}`}}>{a.category}</span><span style={{fontSize:12,color:dim}}>{a.date} · {a.readTime}</span></div></R><R d={0.06}><h1 style={{fontSize:"clamp(28px,5vw,44px)",fontWeight:800,lineHeight:1.12,letterSpacing:"-0.03em",marginBottom:20}}>{a.title}</h1></R><R d={0.12}><p style={{fontSize:17,lineHeight:1.7,color:muted,marginBottom:48}}>{a.summary}</p></R><R d={0.16}><div style={{height:1,background:border,marginBottom:48}}/></R>
    {a.content.map((b,i)=>(<R key={i} d={0.04*i}>{b.type==="h"?<h2 style={{fontSize:20,fontWeight:700,letterSpacing:"-0.02em",marginTop:36,marginBottom:12}}>{b.text}</h2>:<p style={{fontSize:15,lineHeight:1.8,color:muted,marginBottom:16}}>{b.text}</p>}</R>))}</section>
    <div style={{maxWidth:720,margin:"0 auto",padding:"0 32px"}}><div style={{height:1,background:border}}/></div>
    <section style={{maxWidth:720,margin:"0 auto",padding:"48px 32px"}}><R><p style={{fontSize:14,color:muted,marginBottom:16}}>Want to discuss this further?</p></R><R d={0.06}><a href="mailto:jack@locfortune.com" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"13px 28px",borderRadius:100,fontSize:14,fontWeight:600,background:black,color:white}}>Get in touch <ArrowRight size={15}/></a></R></section>
    <SubFooter onBack={onBack}/></div>;
}

// ═══ INSIGHTS PAGE ═══
function InsightsPage({onBack,goArticle}){const[filter,setFilter]=useState("All");useEffect(()=>{window.scrollTo(0,0)},[]);const cats=["All",...Array.from(new Set(ARTICLES.map(a=>a.category)))];const filtered=filter==="All"?ARTICLES:ARTICLES.filter(a=>a.category===filter);const featured=ARTICLES[ARTICLES.length-1];
  return <div style={{background:white,color:black,fontFamily:"'Sora',sans-serif",minHeight:"100vh"}}><style>{GLOBAL_STYLES}</style><SubNav onBack={onBack}/>
    <section style={{maxWidth:1100,margin:"0 auto",padding:"120px 32px 40px"}}><R><p className="mono" style={{fontSize:11,color:dim,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:20}}>Insights</p></R><R d={0.06}><h1 style={{fontSize:"clamp(32px,6vw,56px)",fontWeight:800,lineHeight:1.05,letterSpacing:"-0.04em",marginBottom:16}}>Perspectives on building, investing, and the Australian startup ecosystem.</h1></R></section>
    <section style={{maxWidth:1100,margin:"0 auto",padding:"0 32px 56px"}}><R d={0.12}><div onClick={()=>goArticle(featured.slug)} className="lift" style={{padding:40,borderRadius:20,border:`1px solid ${border}`,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:40,flexWrap:"wrap"}}><div style={{flex:"1 1 400px"}}><span style={{fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:dim,display:"block",marginBottom:12}}>Featured</span><h2 style={{fontSize:28,fontWeight:700,letterSpacing:"-0.02em",lineHeight:1.2,marginBottom:12}}>{featured.title}</h2><p style={{fontSize:14,lineHeight:1.6,color:muted,marginBottom:16}}>{featured.summary}</p><span style={{fontSize:12,color:dim}}>{featured.date} · {featured.readTime}</span></div><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:12,fontWeight:600,padding:"4px 14px",borderRadius:100,border:`1px solid ${border}`}}>{featured.category}</span><ArrowUpRight size={16} color={dim}/></div></div></R></section>
    <section style={{maxWidth:1100,margin:"0 auto",padding:"0 32px 40px"}}><R><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{cats.map(c=>(<button key={c} onClick={()=>setFilter(c)} style={{padding:"8px 18px",borderRadius:100,fontSize:13,fontWeight:600,background:filter===c?black:"transparent",color:filter===c?white:muted,border:`1px solid ${filter===c?black:border}`,cursor:"pointer",fontFamily:"'Sora',sans-serif",transition:"all 0.2s"}}>{c}</button>))}</div></R></section>
    <section style={{maxWidth:1100,margin:"0 auto",padding:"0 32px 88px"}}><div className="articles-g" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>{filtered.map((a,i)=>(<R key={a.slug} d={0.04*i}><div onClick={()=>goArticle(a.slug)} className="lift" style={{padding:24,borderRadius:16,border:`1px solid ${border}`,cursor:"pointer",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between"}}><div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><span style={{fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:100,border:`1px solid ${border}`}}>{a.category}</span><ArrowUpRight size={14} color={dim}/></div><h3 style={{fontSize:16,fontWeight:700,lineHeight:1.3,letterSpacing:"-0.01em",marginBottom:10}}>{a.title}</h3><p style={{fontSize:13,lineHeight:1.55,color:muted,marginBottom:14}}>{a.summary}</p></div><span style={{fontSize:11,color:dim}}>{a.date} · {a.readTime}</span></div></R>))}</div></section>
    <SubFooter onBack={onBack}/></div>;
}

// ═══ LEGAL ═══
function TermsPage({onBack}){useEffect(()=>{window.scrollTo(0,0)},[]);const s=[{t:"1. Acceptance of Terms",b:"By accessing locfortune.vc, you agree to these Terms of Use."},{t:"2. About Us",b:"Loc Fortune Capital Pty Ltd is a venture capital firm based in Sydney, Australia. Information on this website is for general purposes only."},{t:"3. No Financial Advice",b:"Nothing on this website should be construed as financial, investment, tax, or legal advice."},{t:"4. Intellectual Property",b:"All content is property of Loc Fortune Capital Pty Ltd."},{t:"5. Portfolio Information",b:"Portfolio company information may not reflect current status."},{t:"6. Third-Party Links",b:"We are not responsible for external websites."},{t:"7. Limitation of Liability",b:"To the fullest extent permitted by law, we shall not be liable for damages arising from use of this website."},{t:"8. Governing Law",b:"These Terms are governed by the laws of New South Wales, Australia."},{t:"9. Changes",b:"We may modify these Terms at any time."},{t:"10. Contact",b:"Contact us at jack@locfortune.com."}];
  return <div style={{background:white,color:black,fontFamily:"'Sora',sans-serif",minHeight:"100vh"}}><style>{GLOBAL_STYLES}</style><SubNav onBack={onBack}/><section style={{maxWidth:720,margin:"0 auto",padding:"120px 32px 80px"}}><R><p className="mono" style={{fontSize:11,color:dim,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:20}}>Legal</p></R><R d={0.06}><h1 style={{fontSize:40,fontWeight:800,letterSpacing:"-0.03em",marginBottom:12}}>Terms of Use</h1></R><R d={0.1}><p style={{fontSize:13,color:dim,marginBottom:48}}>Last updated: April 2026</p></R>{s.map((x,i)=>(<R key={i} d={0.04*i}><div style={{marginBottom:32}}><h3 style={{fontSize:16,fontWeight:700,marginBottom:8}}>{x.t}</h3><p style={{fontSize:14,lineHeight:1.75,color:muted}}>{x.b}</p></div></R>))}</section><SubFooter onBack={onBack}/></div>;
}
function PrivacyPage({onBack}){useEffect(()=>{window.scrollTo(0,0)},[]);const s=[{t:"1. Introduction",b:"Loc Fortune Capital Pty Ltd is committed to protecting your privacy. We comply with the Australian Privacy Principles."},{t:"2. Information We Collect",b:"Personal information you provide when contacting us, plus browsing data."},{t:"3. How We Use It",b:"To respond to enquiries, improve our website, and comply with legal obligations."},{t:"4. Sharing",b:"We do not sell or rent your personal information."},{t:"5. Cookies",b:"Our website may use cookies."},{t:"6. Security",b:"We implement reasonable security measures."},{t:"7. Your Rights",b:"Contact jack@locfortune.com to access, correct, or delete your information."},{t:"8. Changes",b:"We may update this policy."},{t:"9. Contact",b:"Contact us at jack@locfortune.com."}];
  return <div style={{background:white,color:black,fontFamily:"'Sora',sans-serif",minHeight:"100vh"}}><style>{GLOBAL_STYLES}</style><SubNav onBack={onBack}/><section style={{maxWidth:720,margin:"0 auto",padding:"120px 32px 80px"}}><R><p className="mono" style={{fontSize:11,color:dim,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:20}}>Legal</p></R><R d={0.06}><h1 style={{fontSize:40,fontWeight:800,letterSpacing:"-0.03em",marginBottom:12}}>Privacy Policy</h1></R><R d={0.1}><p style={{fontSize:13,color:dim,marginBottom:48}}>Last updated: April 2026</p></R>{s.map((x,i)=>(<R key={i} d={0.04*i}><div style={{marginBottom:32}}><h3 style={{fontSize:16,fontWeight:700,marginBottom:8}}>{x.t}</h3><p style={{fontSize:14,lineHeight:1.75,color:muted}}>{x.b}</p></div></R>))}</section><SubFooter onBack={onBack}/></div>;
}

// ═══ MAIN ═══
export default function App(){
  const[page,setPage]=useState("home");const[scrolled,setScrolled]=useState(false);const[menuOpen,setMenuOpen]=useState(false);const[testIdx,setTestIdx]=useState(0);
  const[showIntro,setShowIntro]=useState(true);const[introPhase,setIntroPhase]=useState(0);

  useEffect(()=>{const f=()=>setScrolled(window.scrollY>50);window.addEventListener("scroll",f);return()=>window.removeEventListener("scroll",f)},[]);
  useEffect(()=>{const id=setInterval(()=>setTestIdx(p=>(p+1)%TESTIMONIALS.length),5500);return()=>clearInterval(id)},[]);
  useEffect(()=>{if(!showIntro)return;const t1=setTimeout(()=>setIntroPhase(1),1800);const t2=setTimeout(()=>setIntroPhase(2),2600);const t3=setTimeout(()=>{setShowIntro(false);document.body.style.overflow=""},3400);document.body.style.overflow="hidden";return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);document.body.style.overflow=""}},[showIntro]);

  const go=(p)=>{setPage(p);window.scrollTo(0,0)};const goHome=()=>go("home");

  if(page==="about")return <AboutPage onBack={goHome} goPitch={()=>go("pitch")}/>;
  if(page==="pitch")return <PitchPage onBack={goHome}/>;
  if(page==="terms")return <TermsPage onBack={goHome}/>;
  if(page==="privacy")return <PrivacyPage onBack={goHome}/>;
  if(page==="insights")return <InsightsPage onBack={goHome} goArticle={s=>go("article:"+s)}/>;
  if(page.startsWith("article:"))return <ArticlePage slug={page.replace("article:","")} onBack={()=>go("insights")}/>;
  if(COMPANIES[page])return <CompanyPage slug={page} onBack={goHome}/>;

  const introLetters="LOC FORTUNE".split("");

  return(
    <div style={{background:white,color:black,fontFamily:"'Sora',sans-serif",minHeight:"100vh",overflowX:"hidden",position:"relative"}}>

      {/* Intro */}
      {showIntro&&<div style={{position:"fixed",inset:0,zIndex:9999,background:white,display:"flex",alignItems:"center",justifyContent:"center",opacity:introPhase===2?0:1,transform:introPhase===2?"translateY(-100vh)":"translateY(0)",transition:introPhase===2?"opacity 0.8s cubic-bezier(0.76,0,0.24,1), transform 0.8s cubic-bezier(0.76,0,0.24,1)":"none"}}>
        <style>{`@keyframes letterDrop{0%{opacity:0;transform:translateY(-80px) rotate(-8deg)}60%{opacity:1;transform:translateY(8px) rotate(1deg)}80%{transform:translateY(-3px) rotate(-0.5deg)}100%{opacity:1;transform:translateY(0) rotate(0deg)}}.intro-letter{display:inline-block;opacity:0;animation:letterDrop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;font-family:'Sora',sans-serif;font-weight:800;letter-spacing:-0.04em;color:${black}}`}</style>
        <div style={{textAlign:"center"}}><div style={{fontSize:"clamp(48px,12vw,120px)",lineHeight:1}}>{introLetters.map((l,i)=>(<span key={i} className="intro-letter" style={{animationDelay:`${0.08*i}s`,marginRight:l===" "?"0.25em":"0.01em"}}>{l===" "?"\u00A0":l}</span>))}</div></div>
      </div>}

      <style>{GLOBAL_STYLES}</style>

      {/* Mobile menu */}
      {menuOpen&&<div style={{position:"fixed",inset:0,zIndex:1000,background:white,padding:"24px 28px",display:"flex",flexDirection:"column"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:56}}><span style={{fontSize:28,fontWeight:800,letterSpacing:"-0.06em"}}>L</span><button onClick={()=>setMenuOpen(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={22}/></button></div>
        {["About","Portfolio","Thesis","Insights","Pitch to us"].map(l=>(<a key={l} href={["About","Insights","Pitch to us"].includes(l)?undefined:`#${l.toLowerCase()}`} onClick={()=>{setMenuOpen(false);if(l==="About")go("about");if(l==="Insights")go("insights");if(l==="Pitch to us")go("pitch")}} style={{fontSize:26,fontWeight:600,padding:"16px 0",borderBottom:`1px solid ${border}`,letterSpacing:"-0.02em",cursor:"pointer"}}>{l}</a>))}
      </div>}

      {/* Nav */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:scrolled?"rgba(255,255,255,0.92)":"transparent",backdropFilter:scrolled?"blur(16px)":"none",borderBottom:scrolled?`1px solid ${border}`:"1px solid transparent",transition:"all 0.35s ease"}}><div style={{maxWidth:1100,margin:"0 auto",padding:"14px 32px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <a href="/" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});history.replaceState(null,'','/');}} style={{fontSize:28,fontWeight:800,letterSpacing:"-0.06em",lineHeight:1,cursor:"pointer"}}>L</a>
        <div className="desk" style={{display:"flex",alignItems:"center",gap:28}}>
          <button onClick={()=>go("about")} className="uline" style={{fontSize:13,fontWeight:500,letterSpacing:"0.01em",background:"none",border:"none",cursor:"pointer",fontFamily:"'Sora',sans-serif",padding:0}}>About</button>
          <a href="#portfolio" className="uline" style={{fontSize:13,fontWeight:500,letterSpacing:"0.01em"}}>Portfolio</a>
          <a href="#thesis" className="uline" style={{fontSize:13,fontWeight:500,letterSpacing:"0.01em"}}>Thesis</a>
          <button onClick={()=>go("insights")} className="uline" style={{fontSize:13,fontWeight:500,letterSpacing:"0.01em",background:"none",border:"none",cursor:"pointer",fontFamily:"'Sora',sans-serif",padding:0}}>Insights</button>
          <button onClick={()=>go("pitch")} style={{padding:"9px 22px",borderRadius:100,fontSize:13,fontWeight:600,background:black,color:white,display:"inline-flex",alignItems:"center",gap:6,border:"none",cursor:"pointer",fontFamily:"'Sora',sans-serif"}}>Pitch to us</button>
        </div>
        <button className="mob-show" onClick={()=>setMenuOpen(true)} style={{display:"none",background:"none",border:"none",cursor:"pointer"}}><Menu size={20}/></button>
      </div></nav>

      {/* Hero with parallax */}
      <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"100px 32px 60px",maxWidth:1100,margin:"0 auto"}}>
        <R><h1 className="hero-h serif" style={{fontSize:"clamp(52px,9vw,110px)",fontWeight:400,lineHeight:0.98,letterSpacing:"-0.02em"}}>Capital that</h1></R>
        <R d={0.1}><h1 className="hero-h serif" style={{fontSize:"clamp(52px,9vw,110px)",fontWeight:400,lineHeight:0.98,letterSpacing:"-0.02em",fontStyle:"italic",marginBottom:36}}>compounds.</h1></R>
        <R d={0.22}><p style={{fontSize:17,lineHeight:1.7,color:muted,maxWidth:500}}>We back founders before the world sees what they're capable of — and stay with them until it does.</p></R>
        <R d={0.3}><div style={{display:"flex",gap:10,marginTop:32}}>
          <a href="#portfolio" style={{padding:"13px 28px",borderRadius:100,fontSize:14,fontWeight:600,background:black,color:white,display:"inline-flex",alignItems:"center",gap:7}}>View portfolio <ArrowRight size={15}/></a>
          <button onClick={()=>go("about")} style={{padding:"13px 28px",borderRadius:100,fontSize:14,fontWeight:600,border:`1.5px solid ${border}`,display:"inline-flex",alignItems:"center",gap:7,background:"none",cursor:"pointer",fontFamily:"'Sora',sans-serif"}}>About us</button>
        </div></R>
      </section>

      {/* Sticky horizontal scroll portfolio */}
      <div id="portfolio">
        <StickyPortfolio companies={PORTFOLIO} onCardClick={(slug) => go(slug)} />
      </div>

      {/* About + Stats with text reveal */}
      <section id="about-section" style={{maxWidth:1100,margin:"0 auto",padding:"100px 32px"}}>
        <R><div style={{display:"flex",alignItems:"center",gap:16,marginBottom:44}}><span className="section-num">01</span><div style={{flex:1,height:1,background:border}}/></div></R>
        <TextReveal text="Backing what disrupts the norm." style={{fontSize:"clamp(28px,5vw,48px)",fontWeight:700,lineHeight:1.12,letterSpacing:"-0.03em",maxWidth:620,marginBottom:32}}/>
        <R d={0.1}><p style={{fontSize:15,lineHeight:1.7,color:muted,maxWidth:520,marginBottom:52}}>We invest in founders building technology that changes how industries operate — from the way businesses find customers to the way critical materials are made.</p></R>
        <R d={0.15}><div className="stats-g" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:border,borderRadius:16,overflow:"hidden"}}>
          {[{n:6,s:"",l:"Portfolio companies"},{n:13,s:"+",l:"Years of R&D backed"},{n:20,s:"+",l:"Global institutions"},{n:3,s:"",l:"Sectors"}].map((s,i)=>(
            <div key={i} style={{padding:"32px 24px",background:white}}><div style={{fontSize:44,fontWeight:800,letterSpacing:"-0.04em",lineHeight:1}}><Counter end={s.n} suffix={s.s}/></div><p style={{fontSize:13,color:muted,marginTop:4}}>{s.l}</p></div>
          ))}
        </div></R>
      </section>

      {/* Thesis with text reveal */}
      <section id="thesis" style={{borderTop:`1px solid ${border}`,background:bg}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"100px 32px"}}>
          <R><div style={{display:"flex",alignItems:"center",gap:16,marginBottom:44}}><span className="section-num">02</span><div style={{flex:1,height:1,background:black}}/></div></R>
          <div className="vert-g" style={{display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:72,alignItems:"start"}}>
            <div>
              <TextReveal text="We back founders before the world sees what they're capable of — and stay with them until it does." style={{fontSize:"clamp(24px,4vw,40px)",fontWeight:700,letterSpacing:"-0.03em",lineHeight:1.12,marginBottom:24}}/>
              <R d={0.1}><p style={{fontSize:15,lineHeight:1.75,color:muted,marginBottom:16}}>The best companies aren't obvious when they start. They're led by founders with a deep understanding of a problem, the technical ability to solve it, and the conviction to keep going when the market hasn't caught up yet.</p></R>
              <R d={0.15}><p style={{fontSize:15,lineHeight:1.75,color:muted}}>We look for that combination — and we invest early enough to matter. Our role isn't to tell founders what to build. It's to give them the capital, network, and support to build it faster.</p></R>
            </div>
            <R d={0.18}><div style={{display:"flex",flexDirection:"column",gap:28}}>
              {[{label:"Conviction",text:"We invest when we believe — not when consensus forms. The best returns come from being early."},{label:"Patience",text:"Building something that matters takes time. We think in years, not quarters."},{label:"Proximity",text:"We're a small firm by design. Every founder gets direct access to our thinking and our network."}].map((p,i)=>(
                <div key={i}><span style={{fontSize:14,fontWeight:700,display:"block",marginBottom:6}}>{p.label}</span><p style={{fontSize:14,lineHeight:1.65,color:muted}}>{p.text}</p></div>
              ))}
            </div></R>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{borderTop:`1px solid ${border}`}}><div style={{maxWidth:1100,margin:"0 auto",padding:"88px 32px"}}>
        <R><p className="mono" style={{fontSize:11,color:dim,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:44}}>From our portfolio</p></R>
        <div style={{position:"relative",minHeight:170,marginBottom:32}}>
          {TESTIMONIALS.map((t,i)=>(<div key={i} style={{position:i===0?"relative":"absolute",top:0,left:0,right:0,opacity:testIdx===i?1:0,transform:testIdx===i?"translateY(0)":"translateY(16px)",transition:"all 0.6s cubic-bezier(0.16,1,0.3,1)",pointerEvents:testIdx===i?"auto":"none"}}>
            <blockquote className="serif" style={{fontSize:"clamp(22px,3.5vw,32px)",fontWeight:400,lineHeight:1.35,letterSpacing:"-0.01em",maxWidth:700,marginBottom:24,fontStyle:"italic"}}>"{t.quote}"</blockquote>
            <div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:40,height:40,borderRadius:"50%",background:black,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700,color:white}}>{t.initial}</div><div><p style={{fontSize:14,fontWeight:600}}>{t.name}</p><p style={{fontSize:12,color:muted}}>{t.role}</p></div></div>
          </div>))}
        </div>
        <div style={{display:"flex",gap:6}}>{TESTIMONIALS.map((_,i)=>(<button key={i} onClick={()=>setTestIdx(i)} style={{width:testIdx===i?24:8,height:8,borderRadius:100,border:"none",background:testIdx===i?black:"rgba(0,0,0,0.1)",cursor:"pointer",padding:0,transition:"all 0.3s ease"}}/>))}</div>
      </div></section>

      {/* CTA */}
      <section id="contact" style={{borderTop:`1px solid ${border}`,background:black,color:white}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"88px 32px",textAlign:"center"}}>
          <Parallax speed={-0.08}>
            <R><h2 className="cta-h serif" style={{fontSize:"clamp(32px,5.5vw,56px)",fontWeight:400,fontStyle:"italic",letterSpacing:"-0.02em",lineHeight:1.08,marginBottom:16}}>Let's build something<br/>extraordinary.</h2></R>
          </Parallax>
          <R d={0.08}><p style={{fontSize:16,color:"#A1A1AA",maxWidth:400,margin:"0 auto 32px",lineHeight:1.6}}>Whether you're a founder or an investor — we'd love to hear from you.</p></R>
          <R d={0.14}><button onClick={()=>go("pitch")} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"14px 32px",borderRadius:100,fontSize:14,fontWeight:600,background:white,color:black,border:"none",cursor:"pointer",fontFamily:"'Sora',sans-serif"}}>Pitch to us <ArrowRight size={15}/></button></R>
        </div>
      </section>

      {/* Footer */}
      <footer style={{borderTop:`1px solid ${border}`}}>
        <div className="ft-g" style={{maxWidth:1100,margin:"0 auto",padding:"44px 32px 28px",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:36}}>
          <div><span style={{fontSize:24,fontWeight:800,letterSpacing:"-0.06em",display:"block"}}>L</span></div>
          <div><p className="mono" style={{fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:dim,marginBottom:12}}>Company</p>
            <button onClick={()=>go("about")} className="uline" style={{display:"block",fontSize:13,color:muted,marginBottom:10,background:"none",border:"none",cursor:"pointer",fontFamily:"'Sora',sans-serif",padding:0,textAlign:"left"}}>About</button>
            <a href="#portfolio" className="uline" style={{display:"block",fontSize:13,color:muted,marginBottom:10}}>Portfolio</a>
            <a href="#thesis" className="uline" style={{display:"block",fontSize:13,color:muted,marginBottom:10}}>Thesis</a>
            <button onClick={()=>go("insights")} className="uline" style={{display:"block",fontSize:13,color:muted,marginBottom:10,background:"none",border:"none",cursor:"pointer",fontFamily:"'Sora',sans-serif",padding:0,textAlign:"left"}}>Insights</button>
          </div>
          <div><p className="mono" style={{fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:dim,marginBottom:12}}>Social</p>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="uline" style={{display:"block",fontSize:13,color:muted,marginBottom:10}}>LinkedIn</a>
          </div>
          <div><p className="mono" style={{fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:dim,marginBottom:12}}>Legal</p>
            <button onClick={()=>go("terms")} className="uline" style={{display:"block",fontSize:13,color:muted,marginBottom:10,background:"none",border:"none",cursor:"pointer",fontFamily:"'Sora',sans-serif",padding:0,textAlign:"left"}}>Terms of Use</button>
            <button onClick={()=>go("privacy")} className="uline" style={{display:"block",fontSize:13,color:muted,marginBottom:10,background:"none",border:"none",cursor:"pointer",fontFamily:"'Sora',sans-serif",padding:0,textAlign:"left"}}>Privacy Policy</button>
          </div>
        </div>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 32px 20px"}}><div style={{borderTop:`1px solid ${border}`,paddingTop:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}><p style={{fontSize:11,color:dim}}>© 2026 Loc Fortune Capital Pty Ltd</p><span style={{fontSize:11,color:dim}}>All rights reserved.</span></div></div>
      </footer>
    </div>
  );
}
