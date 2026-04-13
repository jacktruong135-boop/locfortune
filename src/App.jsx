import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";

const PORTFOLIO = [
  { name: "Pyrochar", desc: "Scaling CSIRO-developed technology to produce net-zero metallurgical char, replacing coal in steel and primary metals production.", stat: "90,000t", statLabel: "Facility capacity" },
  { name: "Magnium", desc: "Commercialising world-leading research to manufacture net-zero carbon magnesium, a critical mineral, targeting 1% global CO₂ reduction by 2050.", stat: "1%", statLabel: "Global CO₂ target" },
  { name: "Norg AI", desc: "Giving customers the most human-like AI sales companion experience, powering personalised recommendations with deep business understanding.", stat: "AI", statLabel: "Sales companion" },
  { name: "TMA Solutions", desc: "One of Vietnam's premier software outsourcing companies, delivering agile development and exceptional IT solutions through highly skilled engineers.", stat: "500+", statLabel: "Engineers" },
];

const TESTIMONIALS = [
  { quote: "Loc Fortune understood our vision to decarbonise steel before anyone else. Their conviction beyond funding sets them apart.", name: "Pyrochar", role: "Portfolio Company", initial: "P" },
  { quote: "A firm that genuinely believes technology and sustainability aren't at odds. They've been in our corner from day one.", name: "Magnium", role: "Portfolio Company", initial: "M" },
  { quote: "The team brings deep strategic thinking about where AI meets real business outcomes. They understand early-stage startups.", name: "Norg AI", role: "Portfolio Company", initial: "N" },
];

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

const black = "#0A0A0A";
const white = "#FFFFFF";
const bg = "#FAFAFA";
const muted = "#71717A";
const dim = "#A1A1AA";
const border = "rgba(0,0,0,0.08)";
const borderHover = "rgba(0,0,0,0.16)";

export default function App() {
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

  return (
    <div style={{ background: white, color: black, fontFamily: "'Sora', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        ::selection{background:${black};color:${white}}
        a{color:inherit;text-decoration:none}
        .mono{font-family:'Space Mono',monospace}
        .serif{font-family:'Instrument Serif',Georgia,serif}

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
          <a href="#" style={{ fontSize:28, fontWeight:800, letterSpacing:"-0.06em", lineHeight:1 }}>L</a>
          <div className="desk" style={{ display:"flex", alignItems:"center", gap:28 }}>
            {["About","Portfolio","Thesis"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="uline" style={{ fontSize:13, fontWeight:500, letterSpacing:"0.01em" }}>{l}</a>
            ))}
            <a href="#contact" style={{
              padding:"9px 22px", borderRadius:100, fontSize:13, fontWeight:600,
              background:black, color:white, display:"inline-flex", alignItems:"center", gap:6,
            }}>Get in touch</a>
          </div>
          <button className="mob-show" onClick={() => setMenuOpen(true)}
            style={{ display:"none", background:"none", border:"none", cursor:"pointer" }}>
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"100px 32px 60px", maxWidth:1100, margin:"0 auto" }}>
        <R>
          <h1 className="hero-h serif" style={{
            fontSize:"clamp(52px, 9vw, 110px)", fontWeight:400,
            lineHeight:0.98, letterSpacing:"-0.02em",
          }}>
            Capital that
          </h1>
        </R>
        <R d={0.1}>
          <h1 className="hero-h serif" style={{
            fontSize:"clamp(52px, 9vw, 110px)", fontWeight:400,
            lineHeight:0.98, letterSpacing:"-0.02em", fontStyle:"italic",
            marginBottom:36,
          }}>
            compounds.
          </h1>
        </R>
        <R d={0.22}>
          <p style={{ fontSize:17, lineHeight:1.7, color:muted, maxWidth:500 }}>
            Backing visionary founders at the intersection of disruptive technology and sustainable infrastructure. From Australia to the world.
          </p>
        </R>
        <R d={0.3}>
          <div style={{ display:"flex", gap:10, marginTop:32 }}>
            <a href="#portfolio" style={{
              padding:"13px 28px", borderRadius:100, fontSize:14, fontWeight:600,
              background:black, color:white, display:"inline-flex", alignItems:"center", gap:7,
            }}>View portfolio <ArrowRight size={15} /></a>
            <a href="#thesis" style={{
              padding:"13px 28px", borderRadius:100, fontSize:14, fontWeight:600,
              border:`1.5px solid ${border}`, display:"inline-flex", alignItems:"center", gap:7,
            }}>Our thesis</a>
          </div>
        </R>
      </section>

      {/* ═══ PORTFOLIO MARQUEE ═══ */}
      <div style={{ borderTop:`1px solid ${border}`, borderBottom:`1px solid ${border}` }}>
        <div className="marquee" style={{ display:"flex", width:"max-content" }}>
          {[...PORTFOLIO,...PORTFOLIO,...PORTFOLIO,...PORTFOLIO,...PORTFOLIO].map((c,i) => (
            <span key={i} style={{ fontSize:13, fontWeight:600, padding:"18px 0", marginRight:40, whiteSpace:"nowrap", letterSpacing:"-0.01em" }}>
              {c.name}
              <span style={{ color:dim, fontWeight:400, marginLeft:12 }}>{c.desc.split(",")[0].split(".")[0]}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══ ABOUT + STATS ═══ */}
      <section id="about" style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px" }}>
        <R>
          <h2 style={{ fontSize:"clamp(26px, 4.5vw, 42px)", fontWeight:700, lineHeight:1.15, letterSpacing:"-0.03em", maxWidth:620, marginBottom:52 }}>
            We invest in cutting-edge technology and sustainable renewables infrastructure.
          </h2>
        </R>
        <R d={0.08}>
          <div className="stats-g" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:border, borderRadius:16, overflow:"hidden" }}>
            {[
              { n:4, s:"", l:"Portfolio companies" },
              { n:13, s:"+", l:"Years of R&D backed" },
              { n:90, s:"K", l:"Tonnes facility capacity" },
              { n:2, s:"", l:"Investment verticals" },
            ].map((s,i) => (
              <div key={i} style={{ padding:"32px 24px", background:white }}>
                <div style={{ fontSize:44, fontWeight:800, letterSpacing:"-0.04em", lineHeight:1 }}>
                  <Counter end={s.n} suffix={s.s} />
                </div>
                <p style={{ fontSize:13, color:muted, marginTop:4 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </R>
      </section>

      {/* ═══ 01 — TECHNOLOGY ═══ */}
      <section id="portfolio" style={{ borderTop:`1px solid ${border}` }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px" }}>
          <R>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:44 }}>
              <span className="section-num">01</span>
              <div style={{ flex:1, height:1, background:border }} />
            </div>
          </R>
          <div className="vert-g" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"start" }}>
            <R d={0.06}>
              <div>
                <p className="mono" style={{ fontSize:11, color:muted, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:14 }}>Technology</p>
                <h3 style={{ fontSize:"clamp(24px, 3.5vw, 36px)", fontWeight:700, letterSpacing:"-0.025em", lineHeight:1.15, marginBottom:16 }}>
                  Disruptive technologies shaping the future.
                </h3>
                <p style={{ fontSize:15, lineHeight:1.7, color:muted }}>
                  Focused on startups and established companies in fintech, cybersecurity, AI, and blockchain.
                </p>
              </div>
            </R>
            <R d={0.14}>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {PORTFOLIO.filter(c => c.name === "Norg AI" || c.name === "TMA Solutions").map((c,i) => (
                  <div key={i} className="lift" style={{ padding:"24px", borderRadius:14, border:`1px solid ${border}`, cursor:"pointer" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                      <span style={{ fontSize:16, fontWeight:700, letterSpacing:"-0.01em" }}>{c.name}</span>
                      <ArrowUpRight size={15} color={dim} />
                    </div>
                    <p style={{ fontSize:13, color:muted, lineHeight:1.55 }}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* ═══ 02 — SUSTAINABILITY ═══ */}
      <section style={{ borderTop:`1px solid ${border}` }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px" }}>
          <R>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:44 }}>
              <span className="section-num">02</span>
              <div style={{ flex:1, height:1, background:black }} />
            </div>
          </R>
          <div className="vert-g" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"start" }}>
            <R d={0.06}>
              <div>
                <p className="mono" style={{ fontSize:11, color:muted, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:14 }}>Sustainability</p>
                <h3 style={{ fontSize:"clamp(24px, 3.5vw, 36px)", fontWeight:700, letterSpacing:"-0.025em", lineHeight:1.15, marginBottom:16 }}>
                  Renewables infrastructure for a net-zero future.
                </h3>
                <p style={{ fontSize:15, lineHeight:1.7, color:muted }}>
                  From CSIRO-developed biochar replacing coal in steelmaking to net-zero magnesium production — backing the science that decarbonises industry.
                </p>
              </div>
            </R>
            <R d={0.14}>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {PORTFOLIO.filter(c => c.name === "Pyrochar" || c.name === "Magnium").map((c,i) => (
                  <div key={i} className="lift" style={{ padding:"24px", borderRadius:14, border:`1px solid ${border}`, cursor:"pointer" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                      <span style={{ fontSize:16, fontWeight:700, letterSpacing:"-0.01em" }}>{c.name}</span>
                      <span className="mono" style={{ fontSize:10, color:dim }}>{c.stat}</span>
                    </div>
                    <p style={{ fontSize:13, color:muted, lineHeight:1.55 }}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* ═══ 03 — THESIS ═══ */}
      <section id="thesis" style={{ borderTop:`1px solid ${border}`, background:bg }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px" }}>
          <R>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:44 }}>
              <span className="section-num">03</span>
              <div style={{ flex:1, height:1, background:border }} />
            </div>
          </R>
          <div className="vert-g" style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:72, alignItems:"start" }}>
            <R d={0.06}>
              <div>
                <p className="mono" style={{ fontSize:11, color:muted, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:14 }}>Our thesis</p>
                <h3 style={{ fontSize:"clamp(24px, 4vw, 40px)", fontWeight:700, letterSpacing:"-0.03em", lineHeight:1.12, marginBottom:24 }}>
                  Superior returns and environmental impact are not mutually exclusive.
                </h3>
                <p style={{ fontSize:15, lineHeight:1.75, color:muted, marginBottom:16 }}>
                  Our mission is to drive transformative growth by investing in cutting-edge technology and sustainable renewables infrastructure. We foster innovation, support visionary entrepreneurs, and advance the transition to a greener future.
                </p>
                <p style={{ fontSize:15, lineHeight:1.75, color:muted }}>
                  Our goal is to generate superior returns for our stakeholders while making a positive impact on the environment and society. Through strategic investments and a dedication to excellence, we create lasting value for our clients, communities, and the world.
                </p>
              </div>
            </R>
            <R d={0.18}>
              <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
                {[
                  { label:"Innovation", text:"Investing in disruptive technologies — fintech, cybersecurity, AI, and blockchain." },
                  { label:"Agility", text:"Staying flexible and responsive to changing market conditions and client needs." },
                  { label:"Smart Solutions", text:"Leveraging technology and market insights to develop intelligent investment strategies." },
                ].map((p,i) => (
                  <div key={i}>
                    <span style={{ fontSize:14, fontWeight:700, display:"block", marginBottom:6 }}>{p.label}</span>
                    <p style={{ fontSize:14, lineHeight:1.65, color:muted }}>{p.text}</p>
                  </div>
                ))}
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ borderTop:`1px solid ${border}` }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px" }}>
          <R>
            <p className="mono" style={{ fontSize:11, color:dim, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:44 }}>
              From our portfolio
            </p>
          </R>
          <div style={{ position:"relative", minHeight:170, marginBottom:32 }}>
            {TESTIMONIALS.map((t,i) => (
              <div key={i} style={{
                position: i===0?"relative":"absolute", top:0, left:0, right:0,
                opacity: testIdx===i?1:0,
                transform: testIdx===i?"translateY(0)":"translateY(16px)",
                transition:"all 0.6s cubic-bezier(0.16,1,0.3,1)",
                pointerEvents: testIdx===i?"auto":"none",
              }}>
                <blockquote className="serif" style={{
                  fontSize:"clamp(22px, 3.5vw, 32px)", fontWeight:400,
                  lineHeight:1.35, letterSpacing:"-0.01em", maxWidth:700, marginBottom:24,
                  fontStyle:"italic",
                }}>
                  "{t.quote}"
                </blockquote>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{
                    width:40, height:40, borderRadius:"50%", background:black,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:16, fontWeight:700, color:white,
                  }}>{t.initial}</div>
                  <div>
                    <p style={{ fontSize:14, fontWeight:600 }}>{t.name}</p>
                    <p style={{ fontSize:12, color:muted }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:6 }}>
            {TESTIMONIALS.map((_,i) => (
              <button key={i} onClick={() => setTestIdx(i)} style={{
                width: testIdx===i?24:8, height:8, borderRadius:100, border:"none",
                background: testIdx===i?black:"rgba(0,0,0,0.1)", cursor:"pointer", padding:0,
                transition:"all 0.3s ease",
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section id="contact" style={{ borderTop:`1px solid ${border}`, background:black, color:white }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"88px 32px", textAlign:"center" }}>
          <R>
            <h2 className="cta-h serif" style={{ fontSize:"clamp(32px, 5.5vw, 56px)", fontWeight:400, fontStyle:"italic", letterSpacing:"-0.02em", lineHeight:1.08, marginBottom:16 }}>
              Let's build something<br />extraordinary.
            </h2>
          </R>
          <R d={0.08}>
            <p style={{ fontSize:16, color:"#A1A1AA", maxWidth:400, margin:"0 auto 32px", lineHeight:1.6 }}>
              Whether you're a founder or an investor seeking impact — we'd love to hear from you.
            </p>
          </R>
          <R d={0.14}>
            <a href="mailto:hello@locfortune.com" style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"14px 32px", borderRadius:100, fontSize:14, fontWeight:600,
              background:white, color:black,
            }}>Get in touch <ArrowRight size={15} /></a>
          </R>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop:`1px solid ${border}` }}>
        <div className="ft-g" style={{ maxWidth:1100, margin:"0 auto", padding:"44px 32px 28px", display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:36 }}>
          <div>
            <span style={{ fontSize:24, fontWeight:800, letterSpacing:"-0.06em", display:"block" }}>L</span>
          </div>
          {[
            { t:"Company", l:["About","Portfolio","Thesis"] },
            { t:"Social", l:["LinkedIn","Twitter"] },
            { t:"Legal", l:["Terms","Privacy"] },
          ].map((col,ci) => (
            <div key={ci}>
              <p className="mono" style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:dim, marginBottom:12 }}>{col.t}</p>
              {col.l.map(l => (
                <a key={l} href="#" className="uline" style={{ display:"block", fontSize:13, color:muted, marginBottom:10 }}>{l}</a>
              ))}
            </div>
          ))}
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
