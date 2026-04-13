import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, ArrowLeft, Menu, X, ExternalLink } from "lucide-react";

// ─── Company Detail Data ───
const COMPANIES = {
  "norg-ai": {
    name: "Norg AI",
    sector: "Technology",
    url: "https://www.norg.ai",
    headline: "Get your brand showing in AI.",
    overview: "Norg AI helps brands dominate LLMs and AI search results, reaching billions of shoppers who ask AI before they buy. Their platform creates and enriches content optimised for AI models including ChatGPT, Claude, Gemini, Perplexity, DeepSeek, and Grok.",
    stats: [
      { value: "1M+", label: "Pieces of content created" },
      { value: "4.9/5", label: "Customer rating" },
      { value: "6+", label: "AI models supported" },
    ],
    points: [
      "AI search optimisation platform for brands and retailers",
      "Helps businesses get discovered through AI-powered search and recommendations",
      "Over 1,000,000 pieces of content created and enriched",
      "Australian made, supporting major AI models globally",
    ],
  },
  "tma-solutions": {
    name: "TMA Solutions",
    sector: "Technology",
    url: "https://www.tmasolutions.com",
    headline: "Leading software outsourcing from Vietnam.",
    overview: "TMA Solutions is one of Vietnam's premier software outsourcing companies, providing agile development, software testing, digital transformation, and innovation services. Their highly skilled engineers deliver exceptional IT solutions across telecom, finance, healthcare, automotive, and more.",
    stats: [
      { value: "500+", label: "Engineers" },
      { value: "7+", label: "Industries served" },
      { value: "25+", label: "Years of operation" },
    ],
    points: [
      "Full-service software development and testing",
      "Expertise in AI/ML, Big Data, IoT, Cloud, and 5G technologies",
      "Serving global clients across telecom, finance, insurance, healthcare, and logistics",
      "Digital transformation and innovation-as-a-service capabilities",
    ],
  },
  "pyrochar": {
    name: "Pyrochar",
    sector: "Sustainability",
    url: "https://pyrochar.com.au",
    headline: "Decarbonising steel with biochar.",
    overview: "Pyrochar is commercialising CSIRO-developed technology to produce net-zero emission metallurgical char (MetChar) that replaces coal and coke in the primary metals industry. Their self-sustaining pyrolysis process creates clean char — an inexpensive, net-zero alternative to coal for steel production. The technology has been researched and developed over 13+ years.",
    stats: [
      { value: "90,000t", label: "Facility capacity" },
      { value: "13+", label: "Years of R&D" },
      { value: "6.7%", label: "Global CO₂ from steel" },
    ],
    points: [
      "First-of-its-kind MetChar for primary metals manufacture",
      "CSIRO-developed technology scaled for commercial production",
      "Constructing a 90,000-tonne facility in Collie, Western Australia",
      "30-year offtake agreement with Magnium Australia for green magnesium refining",
      "Self-sustaining pyrolysis process using organic waste feedstock",
    ],
  },
  "magnium": {
    name: "Magnium",
    sector: "Sustainability",
    url: "https://www.magnium.com.au",
    headline: "Net-zero magnesium for a critical future.",
    overview: "Magnium commercialises world-leading research from Australia's national science agency to manufacture net-zero carbon, zero-toxin magnesium metal — a critical mineral. They aim to reduce global carbon dioxide emissions by 1% by 2050 through the deployment of net-zero magnesium. Their facility in Western Australia will be the first fully integrated green magnesium production plant in the world.",
    stats: [
      { value: "1%", label: "Global CO₂ reduction target" },
      { value: "2050", label: "Target year" },
      { value: "1st", label: "Green magnesium plant globally" },
    ],
    points: [
      "Manufacturing net-zero carbon, zero-toxin magnesium metal",
      "Magnesium is classified as a critical mineral globally",
      "Partnered with Pyrochar for net-zero carbon supply",
      "First fully integrated green magnesium production facility in the world",
      "Targeting 1% reduction in global CO₂ emissions by 2050",
    ],
  },
  "number": {
    name: "Number",
    sector: "Technology",
    url: "https://number.com.au",
    headline: "AI voice calls and search optimisation for Australian businesses.",
    overview: "Number provides AI-powered voice calls, AI search optimisation (GEO), and custom AI solutions for Australian businesses. Their platform helps companies get found by AI search engines like ChatGPT, book more meetings through AI-driven outbound calls, and build custom AI solutions tailored to their needs.",
    stats: [
      { value: "AI", label: "Voice calls" },
      { value: "GEO", label: "Search optimisation" },
      { value: "AU", label: "Built for Australia" },
    ],
    points: [
      "AI-powered voice calls that book meetings and handle customer enquiries",
      "AI search optimisation (GEO) helping brands get discovered by ChatGPT and other AI engines",
      "Custom AI solutions tailored to Australian businesses",
      "Helping businesses automate outreach and scale conversations",
    ],
  },
};

const PORTFOLIO = [
  { name: "Pyrochar", slug: "pyrochar", desc: "Scaling CSIRO-developed technology to produce net-zero metallurgical char, replacing coal in steel and primary metals production.", stat: "90,000t" },
  { name: "Magnium", slug: "magnium", desc: "Commercialising world-leading research to manufacture net-zero carbon magnesium, a critical mineral, targeting 1% global CO₂ reduction by 2050.", stat: "1%" },
  { name: "Norg AI", slug: "norg-ai", desc: "Giving customers the most human-like AI sales companion experience, powering personalised recommendations with deep business understanding.", stat: "AI" },
  { name: "TMA Solutions", slug: "tma-solutions", desc: "One of Vietnam's premier software outsourcing companies, delivering agile development and exceptional IT solutions through highly skilled engineers.", stat: "500+" },
  { name: "Number", slug: "number", desc: "AI-powered voice calls, AI search optimisation, and custom AI solutions for Australian businesses. Get found by ChatGPT. Book more meetings.", stat: "GEO" },
];

const TESTIMONIALS = [
  { quote: "Loc Fortune understood our vision to decarbonise steel before anyone else. Their conviction beyond funding sets them apart.", name: "Pyrochar", role: "Portfolio Company", initial: "P" },
  { quote: "A firm that genuinely believes technology and sustainability aren't at odds. They've been in our corner from day one.", name: "Magnium", role: "Portfolio Company", initial: "M" },
  { quote: "The team brings deep strategic thinking about where AI meets real business outcomes. They understand early-stage startups.", name: "Norg AI", role: "Portfolio Company", initial: "N" },
];

const LINKEDIN = "https://www.linkedin.com/company/loc-fortune-capital/";

// ─── Hooks ───
function useReveal(t = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold: t });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Counter({ end, suffix = "" }) {
  const [ref, vis] = useReveal(0.3);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!vis) return;
    let n = 0;
    const step = Math.max(1, Math.ceil(end / 40));
    const id = setInterval(() => { n += step; if (n >= end) { setV(end); clearInterval(id); } else setV(n); }, 35);
    return () => clearInterval(id);
  }, [vis, end]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

function R({ children, d = 0, style = {} }) {
  const [ref, vis] = useReveal(0.08);
  return (
    <div ref={ref} style={{
      ...style, opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${d}s`,
    }}>{children}</div>
  );
}

// ─── Constants ───
const black = "#0A0A0A";
const white = "#FFFFFF";
const bg = "#FAFAFA";
const muted = "#71717A";
const dim = "#A1A1AA";
const border = "rgba(0,0,0,0.08)";
const borderHover = "rgba(0,0,0,0.16)";

// ─── Shared styles ───
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
`;

// ─── Simple top nav for sub-pages ───
function SubNav({ onBack, rightElement }) {
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:"rgba(255,255,255,0.92)", backdropFilter:"blur(16px)", borderBottom:`1px solid ${border}` }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"14px 32px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button onClick={onBack} style={{ display:"flex", alignItems:"center", gap:8, background:"none", border:"none", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'Sora',sans-serif" }}>
          <ArrowLeft size={16} /> Back
        </button>
        <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} style={{ fontSize:28, fontWeight:800, letterSpacing:"-0.06em", lineHeight:1 }}>L</a>
        {rightElement || <div style={{ width:100 }} />}
      </div>
    </nav>
  );
}

// ─── Sub-page footer ───
function SubFooter({ onBack }) {
  return (
    <footer style={{ borderTop:`1px solid ${border}`, marginTop:32 }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"24px 32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <button onClick={onBack} style={{ display:"flex", alignItems:"center", gap:8, background:"none", border:"none", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:"'Sora',sans-serif", color:muted }}>
          <ArrowLeft size={14} /> Back to Loc Fortune
        </button>
        <p style={{ fontSize:11, color:dim }}>© 2026 Loc Fortune Capital Pty Ltd</p>
      </div>
    </footer>
  );
}

// ═══════════════════════════
//  COMPANY DETAIL PAGE
// ═══════════════════════════
function CompanyPage({ slug, onBack }) {
  const c = COMPANIES[slug];
  if (!c) return null;
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: white, color: black, fontFamily: "'Sora', sans-serif", minHeight: "100vh" }}>
      <style>{GLOBAL_STYLES}</style>

      <SubNav onBack={onBack} rightElement={
        <a href={c.url} target="_blank" rel="noopener noreferrer" style={{
          padding:"9px 22px", borderRadius:100, fontSize:13, fontWeight:600,
          background:black, color:white, display:"inline-flex", alignItems:"center", gap:6,
        }}>Visit website <ExternalLink size={13} /></a>
      } />

      <section style={{ maxWidth:1100, margin:"0 auto", padding:"120px 32px 60px" }}>
        <R><p className="mono" style={{ fontSize:11, color:dim, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:20 }}>{c.sector}</p></R>
        <R d={0.06}><h1 style={{ fontSize:"clamp(40px, 7vw, 72px)", fontWeight:800, lineHeight:0.98, letterSpacing:"-0.04em", marginBottom:16 }}>{c.name}</h1></R>
        <R d={0.12}><p className="serif" style={{ fontSize:"clamp(20px, 3vw, 30px)", fontWeight:400, fontStyle:"italic", lineHeight:1.3, color:muted, maxWidth:600, marginBottom:40 }}>{c.headline}</p></R>
        <R d={0.18}>
          <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 28px", borderRadius:100, fontSize:14, fontWeight:600, background:black, color:white }}>
            Visit {c.name} <ExternalLink size={14} />
          </a>
        </R>
      </section>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 32px" }}><div style={{ height:1, background:border }} /></div>

      <section style={{ maxWidth:1100, margin:"0 auto", padding:"56px 32px" }}>
        <R>
          <div style={{ display:"grid", gridTemplateColumns:`repeat(${c.stats.length}, 1fr)`, gap:1, background:border, borderRadius:16, overflow:"hidden" }}>
            {c.stats.map((s, i) => (
              <div key={i} style={{ padding:"32px 24px", background:white }}>
                <div style={{ fontSize:36, fontWeight:800, letterSpacing:"-0.04em", lineHeight:1 }}>{s.value}</div>
                <p style={{ fontSize:13, color:muted, marginTop:4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </R>
      </section>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 32px" }}><div style={{ height:1, background:border }} /></div>

      <section style={{ maxWidth:1100, margin:"0 auto", padding:"56px 32px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56 }}>
          <R d={0.06}>
            <div>
              <p className="mono" style={{ fontSize:11, color:dim, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:14 }}>Overview</p>
              <p style={{ fontSize:16, lineHeight:1.75, color:muted }}>{c.overview}</p>
            </div>
          </R>
          <R d={0.14}>
            <div>
              <p className="mono" style={{ fontSize:11, color:dim, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:14 }}>Key highlights</p>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {c.points.map((p, i) => (
                  <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                    <div style={{ width:5, height:5, borderRadius:"50%", background:black, marginTop:7, flexShrink:0 }} />
                    <p style={{ fontSize:14, lineHeight:1.6, color:muted }}>{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </R>
        </div>
      </section>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 32px" }}><div style={{ height:1, background:border }} /></div>

      <section style={{ maxWidth:1100, margin:"0 auto", padding:"56px 32px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:24 }}>
        <R><div>
          <h3 style={{ fontSize:24, fontWeight:700, letterSpacing:"-0.02em", marginBottom:4 }}>Interested in {c.name}?</h3>
          <p style={{ fontSize:14, color:muted }}>Visit their website to learn more about their mission and products.</p>
        </div></R>
        <R d={0.08}>
          <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 28px", borderRadius:100, fontSize:14, fontWeight:600, background:black, color:white }}>
            Visit website <ExternalLink size={14} />
          </a>
        </R>
      </section>

      <SubFooter onBack={onBack} />
    </div>
  );
}

// ═══════════════════════════
//  TERMS OF USE PAGE
// ═══════════════════════════
function TermsPage({ onBack }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ background: white, color: black, fontFamily: "'Sora', sans-serif", minHeight: "100vh" }}>
      <style>{GLOBAL_STYLES}</style>
      <SubNav onBack={onBack} />

      <section style={{ maxWidth:760, margin:"0 auto", padding:"120px 32px 80px" }}>
        <R><p className="mono" style={{ fontSize:11, color:dim, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:20 }}>Legal</p></R>
        <R d={0.06}><h1 style={{ fontSize:40, fontWeight:800, letterSpacing:"-0.03em", marginBottom:12 }}>Terms of Use</h1></R>
        <R d={0.1}><p style={{ fontSize:13, color:dim, marginBottom:48 }}>Last updated: April 2026</p></R>

        {[
          { title: "1. Acceptance of Terms", body: "By accessing and using the Loc Fortune Capital website (locfortune.com), you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website." },
          { title: "2. About Loc Fortune Capital", body: "Loc Fortune Capital Pty Ltd is a venture capital firm based in Sydney, Australia. The information provided on this website is for general informational purposes only and does not constitute financial advice, an offer to invest, or a solicitation of any kind." },
          { title: "3. No Financial Advice", body: "Nothing on this website should be construed as financial, investment, tax, or legal advice. Any information regarding our portfolio companies, investment thesis, or market commentary is provided for informational purposes only. You should consult with qualified professionals before making any investment decisions." },
          { title: "4. Intellectual Property", body: "All content on this website, including text, graphics, logos, and design elements, is the property of Loc Fortune Capital Pty Ltd and is protected by Australian and international copyright laws. You may not reproduce, distribute, or create derivative works from any content without our prior written consent." },
          { title: "5. Portfolio Company Information", body: "Information presented about our portfolio companies is provided for informational purposes and may not reflect the most current status of these companies. Loc Fortune Capital does not guarantee the accuracy, completeness, or timeliness of any information about portfolio companies displayed on this site." },
          { title: "6. Third-Party Links", body: "This website may contain links to third-party websites, including those of our portfolio companies. We are not responsible for the content, privacy practices, or availability of these external sites. Linking to a third-party site does not imply endorsement of its content." },
          { title: "7. Limitation of Liability", body: "To the fullest extent permitted by law, Loc Fortune Capital Pty Ltd shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from your use of or inability to use this website or any information contained herein." },
          { title: "8. Privacy", body: "Your use of this website is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your information." },
          { title: "9. Governing Law", body: "These Terms of Use are governed by and construed in accordance with the laws of New South Wales, Australia. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of New South Wales." },
          { title: "10. Changes to Terms", body: "We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to this website. Your continued use of the website following any changes constitutes acceptance of the revised terms." },
          { title: "11. Contact", body: "If you have any questions about these Terms of Use, please contact us at hello@locfortune.com." },
        ].map((s, i) => (
          <R key={i} d={0.04 * i}>
            <div style={{ marginBottom:32 }}>
              <h3 style={{ fontSize:16, fontWeight:700, marginBottom:8 }}>{s.title}</h3>
              <p style={{ fontSize:14, lineHeight:1.75, color:muted }}>{s.body}</p>
            </div>
          </R>
        ))}
      </section>

      <SubFooter onBack={onBack} />
    </div>
  );
}

// ═══════════════════════════
//  PRIVACY POLICY PAGE
// ═══════════════════════════
function PrivacyPage({ onBack }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ background: white, color: black, fontFamily: "'Sora', sans-serif", minHeight: "100vh" }}>
      <style>{GLOBAL_STYLES}</style>
      <SubNav onBack={onBack} />

      <section style={{ maxWidth:760, margin:"0 auto", padding:"120px 32px 80px" }}>
        <R><p className="mono" style={{ fontSize:11, color:dim, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:20 }}>Legal</p></R>
        <R d={0.06}><h1 style={{ fontSize:40, fontWeight:800, letterSpacing:"-0.03em", marginBottom:12 }}>Privacy Policy</h1></R>
        <R d={0.1}><p style={{ fontSize:13, color:dim, marginBottom:48 }}>Last updated: April 2026</p></R>

        {[
          { title: "1. Introduction", body: "Loc Fortune Capital Pty Ltd (\"we\", \"us\", \"our\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website locfortune.com. We comply with the Australian Privacy Principles contained in the Privacy Act 1988 (Cth)." },
          { title: "2. Information We Collect", body: "We may collect personal information that you voluntarily provide to us when you contact us via email, submit a form, or otherwise communicate with us. This may include your name, email address, phone number, company name, and any other information you choose to provide. We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages visited." },
          { title: "3. How We Use Your Information", body: "We use the information we collect to respond to your enquiries and communications, to improve our website and user experience, to comply with legal obligations, and for internal record-keeping and administrative purposes. We do not use your personal information for automated decision-making or profiling." },
          { title: "4. Information Sharing", body: "We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, provided they agree to keep your information confidential. We may also disclose your information where required by law or to protect our legal rights." },
          { title: "5. Cookies and Tracking", body: "Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small files stored on your device that help us understand how you interact with our website. You can set your browser to refuse cookies, though this may limit some features of our website." },
          { title: "6. Data Security", body: "We implement reasonable security measures to protect your personal information from unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security." },
          { title: "7. Third-Party Links", body: "Our website contains links to third-party websites, including those of our portfolio companies. This Privacy Policy does not apply to those websites. We encourage you to review the privacy policies of any third-party sites you visit." },
          { title: "8. Your Rights", body: "Under Australian privacy law, you have the right to access the personal information we hold about you, request correction of inaccurate information, and request deletion of your personal information in certain circumstances. To exercise these rights, please contact us at hello@locfortune.com." },
          { title: "9. Retention", body: "We retain your personal information only for as long as necessary to fulfil the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law." },
          { title: "10. Changes to This Policy", body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this page periodically." },
          { title: "11. Contact Us", body: "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at hello@locfortune.com." },
        ].map((s, i) => (
          <R key={i} d={0.04 * i}>
            <div style={{ marginBottom:32 }}>
              <h3 style={{ fontSize:16, fontWeight:700, marginBottom:8 }}>{s.title}</h3>
              <p style={{ fontSize:14, lineHeight:1.75, color:muted }}>{s.body}</p>
            </div>
          </R>
        ))}
      </section>

      <SubFooter onBack={onBack} />
    </div>
  );
}

// ═══════════════════════════
//  MAIN APP
// ═══════════════════════════
export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [testIdx, setTestIdx] = useState(0);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTestIdx(p => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(id);
  }, []);

  const go = (p) => { setPage(p); window.scrollTo(0, 0); };
  const goHome = () => go("home");

  // ─── Sub-pages ───
  if (page === "terms") return <TermsPage onBack={goHome} />;
  if (page === "privacy") return <PrivacyPage onBack={goHome} />;
  if (page !== "home" && COMPANIES[page]) return <CompanyPage slug={page} onBack={goHome} />;

  // ─── Home ───
  return (
    <div style={{ background: white, color: black, fontFamily: "'Sora', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{GLOBAL_STYLES}{`
        @keyframes mql{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .marquee{animation:mql 28s linear infinite}
        .marquee:hover{animation-play-state:paused}
        .uline{position:relative}
        .uline::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:${black};transition:width 0.3s ease}
        .uline:hover::after{width:100%}
        .lift{transition:transform 0.3s ease, border-color 0.3s ease}
        .lift:hover{transform:translateY(-4px);border-color:${borderHover}!important}
        .section-num{font-family:'Space Mono',monospace;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:${dim}}
        @media(max-width:800px){
          .desk{display:none!important}
          .mob-show{display:flex!important}
          .hero-h{font-size:48px!important}
          .stats-g{grid-template-columns:1fr 1fr!important}
          .vert-g{grid-template-columns:1fr!important}
          .ft-g{grid-template-columns:1fr 1fr!important}
          .cta-h{font-size:32px!important}
        }
      `}</style>

      {/* ═══ MOBILE MENU ═══ */}
      {menuOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:1000, background:white, padding:"24px 28px", display:"flex", flexDirection:"column" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:56 }}>
            <span style={{ fontSize:28, fontWeight:800, letterSpacing:"-0.06em" }}>L</span>
            <button onClick={() => setMenuOpen(false)} style={{ background:"none", border:"none", cursor:"pointer" }}><X size={22} /></button>
          </div>
          {["About","Portfolio","Thesis","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ fontSize:26, fontWeight:600, padding:"16px 0", borderBottom:`1px solid ${border}`, letterSpacing:"-0.02em" }}>{l}</a>
          ))}
        </div>
      )}

      {/* ═══ NAV ═══ */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${border}` : "1px solid transparent",
        transition:"all 0.35s ease",
      }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"14px 32px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <a href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); history.replaceState(null,'','/'); }} style={{ fontSize:28, fontWeight:800, letterSpacing:"-0.06em", lineHeight:1, cursor:"pointer" }}>L</a>
          <div className="desk" style={{ display:"flex", alignItems:"center", gap:28 }}>
            {["About","Portfolio","Thesis"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="uline" style={{ fontSize:13, fontWeight:500, letterSpacing:"0.01em" }}>{l}</a>
            ))}
            <a href="#contact" style={{ padding:"9px 22px", borderRadius:100, fontSize:13, fontWeight:600, background:black, color:white, display:"inline-flex", alignItems:"center", gap:6 }}>Get in touch</a>
          </div>
          <button className="mob-show" onClick={() => setMenuOpen(true)} style={{ display:"none", background:"none", border:"none", cursor:"pointer" }}>
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"100px 32px 60px", maxWidth:1100, margin:"0 auto" }}>
        <R><h1 className="hero-h serif" style={{ fontSize:"clamp(52px, 9vw, 110px)", fontWeight:400, lineHeight:0.98, letterSpacing:"-0.02em" }}>Capital that</h1></R>
        <R d={0.1}><h1 className="hero-h serif" style={{ fontSize:"clamp(52px, 9vw, 110px)", fontWeight:400, lineHeight:0.98, letterSpacing:"-0.02em", fontStyle:"italic", marginBottom:36 }}>compounds.</h1></R>
        <R d={0.22}><p style={{ fontSize:17, lineHeight:1.7, color:muted, maxWidth:500 }}>Backing visionary founders at the intersection of disruptive technology and sustainable infrastructure. From Australia to the world.</p></R>
        <R d={0.3}>
          <div style={{ display:"flex", gap:10, marginTop:32 }}>
            <a href="#portfolio" style={{ padding:"13px 28px", borderRadius:100, fontSize:14, fontWeight:600, background:black, color:white, display:"inline-flex", alignItems:"center", gap:7 }}>View portfolio <ArrowRight size={15} /></a>
            <a href="#thesis" style={{ padding:"13px 28px", borderRadius:100, fontSize:14, fontWeight:600, border:`1.5px solid ${border}`, display:"inline-flex", alignItems:"center", gap:7 }}>Our thesis</a>
          </div>
        </R>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div style={{ borderTop:`1px solid ${border}`, borderBottom:`1px solid ${border}` }}>
        <div className="marquee" style={{ display:"flex", width:"max-content" }}>
          {[...PORTFOLIO,...PORTFOLIO,...PORTFOLIO,...PORTFOLIO,...PORTFOLIO].map((c,i) => (
            <span key={i} onClick={() => go(c.slug)} style={{ fontSize:13, fontWeight:600, padding:"18px 0", marginRight:40, whiteSpace:"nowrap", letterSpacing:"-0.01em", cursor:"pointer" }}>
              {c.name}<span style={{ color:dim, fontWeight:400, marginLeft:12 }}>{c.desc.split(",")[0].split(".")[0]}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ ABOUT + STATS ═══ */}
      <section id="about" style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px" }}>
        <R><h2 style={{ fontSize:"clamp(26px, 4.5vw, 42px)", fontWeight:700, lineHeight:1.15, letterSpacing:"-0.03em", maxWidth:620, marginBottom:52 }}>We invest in cutting-edge technology and sustainable renewables infrastructure.</h2></R>
        <R d={0.08}>
          <div className="stats-g" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:border, borderRadius:16, overflow:"hidden" }}>
            {[{ n:5, s:"", l:"Portfolio companies" },{ n:13, s:"+", l:"Years of R&D backed" },{ n:90, s:"K", l:"Tonnes facility capacity" },{ n:2, s:"", l:"Investment verticals" }].map((s,i) => (
              <div key={i} style={{ padding:"32px 24px", background:white }}>
                <div style={{ fontSize:44, fontWeight:800, letterSpacing:"-0.04em", lineHeight:1 }}><Counter end={s.n} suffix={s.s} /></div>
                <p style={{ fontSize:13, color:muted, marginTop:4 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </R>
      </section>

      {/* ═══ 01 — TECHNOLOGY ═══ */}
      <section id="portfolio" style={{ borderTop:`1px solid ${border}` }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px" }}>
          <R><div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:44 }}><span className="section-num">01</span><div style={{ flex:1, height:1, background:border }} /></div></R>
          <div className="vert-g" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"start" }}>
            <R d={0.06}><div>
              <p className="mono" style={{ fontSize:11, color:muted, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:14 }}>Technology</p>
              <h3 style={{ fontSize:"clamp(24px, 3.5vw, 36px)", fontWeight:700, letterSpacing:"-0.025em", lineHeight:1.15, marginBottom:16 }}>Disruptive technologies shaping the future.</h3>
              <p style={{ fontSize:15, lineHeight:1.7, color:muted }}>Focused on startups and established companies in fintech, cybersecurity, AI, and blockchain.</p>
            </div></R>
            <R d={0.14}><div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {PORTFOLIO.filter(c => c.slug === "norg-ai" || c.slug === "tma-solutions" || c.slug === "number").map((c,i) => (
                <div key={i} className="lift" onClick={() => go(c.slug)} style={{ padding:"24px", borderRadius:14, border:`1px solid ${border}`, cursor:"pointer" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                    <span style={{ fontSize:16, fontWeight:700, letterSpacing:"-0.01em" }}>{c.name}</span>
                    <ArrowUpRight size={15} color={dim} />
                  </div>
                  <p style={{ fontSize:13, color:muted, lineHeight:1.55 }}>{c.desc}</p>
                </div>
              ))}
            </div></R>
          </div>
        </div>
      </section>

      {/* ═══ 02 — SUSTAINABILITY ═══ */}
      <section style={{ borderTop:`1px solid ${border}` }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px" }}>
          <R><div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:44 }}><span className="section-num">02</span><div style={{ flex:1, height:1, background:black }} /></div></R>
          <div className="vert-g" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"start" }}>
            <R d={0.06}><div>
              <p className="mono" style={{ fontSize:11, color:muted, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:14 }}>Sustainability</p>
              <h3 style={{ fontSize:"clamp(24px, 3.5vw, 36px)", fontWeight:700, letterSpacing:"-0.025em", lineHeight:1.15, marginBottom:16 }}>Renewables infrastructure for a net-zero future.</h3>
              <p style={{ fontSize:15, lineHeight:1.7, color:muted }}>From CSIRO-developed biochar replacing coal in steelmaking to net-zero magnesium production — backing the science that decarbonises industry.</p>
            </div></R>
            <R d={0.14}><div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {PORTFOLIO.filter(c => c.slug === "pyrochar" || c.slug === "magnium").map((c,i) => (
                <div key={i} className="lift" onClick={() => go(c.slug)} style={{ padding:"24px", borderRadius:14, border:`1px solid ${border}`, cursor:"pointer" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                    <span style={{ fontSize:16, fontWeight:700, letterSpacing:"-0.01em" }}>{c.name}</span>
                    <span className="mono" style={{ fontSize:10, color:dim }}>{c.stat}</span>
                  </div>
                  <p style={{ fontSize:13, color:muted, lineHeight:1.55 }}>{c.desc}</p>
                </div>
              ))}
            </div></R>
          </div>
        </div>
      </section>

      {/* ═══ 03 — THESIS ═══ */}
      <section id="thesis" style={{ borderTop:`1px solid ${border}`, background:bg }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px" }}>
          <R><div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:44 }}><span className="section-num">03</span><div style={{ flex:1, height:1, background:border }} /></div></R>
          <div className="vert-g" style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:72, alignItems:"start" }}>
            <R d={0.06}><div>
              <p className="mono" style={{ fontSize:11, color:muted, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:14 }}>Our thesis</p>
              <h3 style={{ fontSize:"clamp(24px, 4vw, 40px)", fontWeight:700, letterSpacing:"-0.03em", lineHeight:1.12, marginBottom:24 }}>Superior returns and environmental impact are not mutually exclusive.</h3>
              <p style={{ fontSize:15, lineHeight:1.75, color:muted, marginBottom:16 }}>Our mission is to drive transformative growth by investing in cutting-edge technology and sustainable renewables infrastructure. We foster innovation, support visionary entrepreneurs, and advance the transition to a greener future.</p>
              <p style={{ fontSize:15, lineHeight:1.75, color:muted }}>Our goal is to generate superior returns for our stakeholders while making a positive impact on the environment and society. Through strategic investments and a dedication to excellence, we create lasting value for our clients, communities, and the world.</p>
            </div></R>
            <R d={0.18}><div style={{ display:"flex", flexDirection:"column", gap:28 }}>
              {[{ label:"Innovation", text:"Investing in disruptive technologies — fintech, cybersecurity, AI, and blockchain." },{ label:"Agility", text:"Staying flexible and responsive to changing market conditions and client needs." },{ label:"Smart Solutions", text:"Leveraging technology and market insights to develop intelligent investment strategies." }].map((p,i) => (
                <div key={i}><span style={{ fontSize:14, fontWeight:700, display:"block", marginBottom:6 }}>{p.label}</span><p style={{ fontSize:14, lineHeight:1.65, color:muted }}>{p.text}</p></div>
              ))}
            </div></R>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ borderTop:`1px solid ${border}` }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px" }}>
          <R><p className="mono" style={{ fontSize:11, color:dim, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:44 }}>From our portfolio</p></R>
          <div style={{ position:"relative", minHeight:170, marginBottom:32 }}>
            {TESTIMONIALS.map((t,i) => (
              <div key={i} style={{ position: i===0?"relative":"absolute", top:0, left:0, right:0, opacity: testIdx===i?1:0, transform: testIdx===i?"translateY(0)":"translateY(16px)", transition:"all 0.6s cubic-bezier(0.16,1,0.3,1)", pointerEvents: testIdx===i?"auto":"none" }}>
                <blockquote className="serif" style={{ fontSize:"clamp(22px, 3.5vw, 32px)", fontWeight:400, lineHeight:1.35, letterSpacing:"-0.01em", maxWidth:700, marginBottom:24, fontStyle:"italic" }}>"{t.quote}"</blockquote>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:black, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:white }}>{t.initial}</div>
                  <div><p style={{ fontSize:14, fontWeight:600 }}>{t.name}</p><p style={{ fontSize:12, color:muted }}>{t.role}</p></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:6 }}>
            {TESTIMONIALS.map((_,i) => (
              <button key={i} onClick={() => setTestIdx(i)} style={{ width: testIdx===i?24:8, height:8, borderRadius:100, border:"none", background: testIdx===i?black:"rgba(0,0,0,0.1)", cursor:"pointer", padding:0, transition:"all 0.3s ease" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section id="contact" style={{ borderTop:`1px solid ${border}`, background:black, color:white }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px", textAlign:"center" }}>
          <R><h2 className="cta-h serif" style={{ fontSize:"clamp(32px, 5.5vw, 56px)", fontWeight:400, fontStyle:"italic", letterSpacing:"-0.02em", lineHeight:1.08, marginBottom:16 }}>Let's build something<br />extraordinary.</h2></R>
          <R d={0.08}><p style={{ fontSize:16, color:"#A1A1AA", maxWidth:400, margin:"0 auto 32px", lineHeight:1.6 }}>Whether you're a founder or an investor seeking impact — we'd love to hear from you.</p></R>
          <R d={0.14}><a href="mailto:jack@locfortune.com" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 32px", borderRadius:100, fontSize:14, fontWeight:600, background:white, color:black }}>Get in touch <ArrowRight size={15} /></a></R>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop:`1px solid ${border}` }}>
        <div className="ft-g" style={{ maxWidth:1100, margin:"0 auto", padding:"44px 32px 28px", display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:36 }}>
          <div>
            <span style={{ fontSize:24, fontWeight:800, letterSpacing:"-0.06em", display:"block" }}>L</span>
          </div>
          <div>
            <p className="mono" style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:dim, marginBottom:12 }}>Company</p>
            {["About","Portfolio","Thesis"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="uline" style={{ display:"block", fontSize:13, color:muted, marginBottom:10 }}>{l}</a>
            ))}
          </div>
          <div>
            <p className="mono" style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:dim, marginBottom:12 }}>Social</p>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="uline" style={{ display:"block", fontSize:13, color:muted, marginBottom:10 }}>LinkedIn</a>
          </div>
          <div>
            <p className="mono" style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:dim, marginBottom:12 }}>Legal</p>
            <button onClick={() => go("terms")} className="uline" style={{ display:"block", fontSize:13, color:muted, marginBottom:10, background:"none", border:"none", cursor:"pointer", fontFamily:"'Sora',sans-serif", padding:0, textAlign:"left" }}>Terms of Use</button>
            <button onClick={() => go("privacy")} className="uline" style={{ display:"block", fontSize:13, color:muted, marginBottom:10, background:"none", border:"none", cursor:"pointer", fontFamily:"'Sora',sans-serif", padding:0, textAlign:"left" }}>Privacy Policy</button>
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
