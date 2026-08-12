import { Link } from 'react-router-dom'
import { t, fontInter, fontMono } from '../theme/tokens'
import { useScrollReveal } from '../hook/useScrollReveal'
import EditorMockup from '../components/EditorMockup'

export default function LandingPage() {
  const pageRef = useScrollReveal()

  return (
    <div ref={pageRef} style={{
      minHeight: '100vh', backgroundColor: t.bg, color: t.onSurface, position: 'relative',
      ...fontInter, WebkitFontSmoothing: 'antialiased',
    }}>
      {/* ── Fixed GPU-accelerated Grid Background ── */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `linear-gradient(${t.cardCarbon} 1px, transparent 1px), linear-gradient(90deg, ${t.cardCarbon} 1px, transparent 1px)`,
        backgroundSize: '40px 40px', backgroundPosition: 'center top',
      }} />

      {/* ═══════ Top Nav ═══════ */}
      <nav className="animate-fade-in" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10, 10, 10, 0.85)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${t.steelBorder}`,
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          height: 64, padding: '0 24px', maxWidth: 1200, margin: '0 auto',
        }}>
          {/* Brand */}
          <Link to="/" style={{
            ...fontInter, fontSize: 24, fontWeight: 600, letterSpacing: '-0.5px',
            color: t.onSurface, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none',
          }}>
            CareerSync
          </Link>

          {/* Centre links */}
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {['Home', 'Features', 'Contact Us'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{
                ...fontInter, fontSize: 16, fontWeight: 500, color: t.ash, textDecoration: 'none',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = t.onSurface}
              onMouseLeave={e => e.currentTarget.style.color = t.ash}
              >{l}</a>
            ))}
          </div>

          {/* Right buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link to="/login" style={{
              ...fontInter, fontSize: 16, fontWeight: 500, color: t.onSurface,
              textDecoration: 'none', transition: 'color 0.15s',
            }}>Log In</Link>
            <Link to="/register" className="btn-hover-lift" style={{
              background: '#fff', color: t.bg, padding: '8px 16px', borderRadius: 8,
              ...fontInter, fontSize: 14, fontWeight: 500, textDecoration: 'none',
            }}>Try Free</Link>
          </div>
        </div>
      </nav>

      {/* ═══════ Main Content ═══════ */}
      <main style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '64px 32px 0', position: 'relative', zIndex: 10 }}>

        {/* ── Hero ── */}
        <section style={{
          padding: '64px 0 128px', display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 64, alignItems: 'center', position: 'relative',
        }}>
          {/* Hero left — entry animations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, zIndex: 10 }}>
            <h1 className="animate-fade-up" style={{
              ...fontInter, fontSize: 64, lineHeight: 1.13, letterSpacing: '-2.3px',
              fontWeight: 600, color: t.onSurface,
            }}>
              Build engineered resumes.
            </h1>
            <p className="animate-fade-up" style={{
              ...fontInter, fontSize: 20, lineHeight: 1.4, letterSpacing: '-0.42px',
              fontWeight: 500, color: t.ash, maxWidth: 400,
              animationDelay: '0.12s',
            }}>
              A technical workspace for precision-driven careers. Eliminate formatting chaos with data-driven templates.
            </p>
            <div className="animate-fade-up" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, paddingTop: 16, animationDelay: '0.24s' }}>
              <Link to="/register" id="hero-get-started" className="btn-hover-lift" style={{
                background: '#fff', color: t.bg, padding: '16px 32px', borderRadius: 8,
                ...fontInter, fontSize: 16, fontWeight: 500, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                Start Building
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
              </Link>
              
            </div>
            <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 32, color: t.ash, ...fontMono, fontSize: 12, letterSpacing: '0.85px', textTransform: 'uppercase', animationDelay: '0.4s' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>verified</span>
              <span>No credit card required for standard templates.</span>
            </div>
          </div>

          {/* Hero right — slide in from right */}
          <div className="animate-slide-right" style={{ animationDelay: '0.2s' }}>
            <EditorMockup />
          </div>
        </section>

        {/* ── Trust Bar ── */}
        <section className="reveal" style={{
          padding: '32px 0',
          display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', textAlign: 'center',
        }}>
          <p style={{ ...fontMono, fontSize: 12, letterSpacing: '0.85px', color: t.ash, textTransform: 'uppercase' }}>
            Compatible with major ATS parsers
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 48, opacity: 0.45, filter: 'grayscale(1)', transition: 'all 0.5s' }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'grayscale(0)'; e.currentTarget.style.opacity = '1' }}
            onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(1)'; e.currentTarget.style.opacity = '0.45' }}
          >
            {[
              { name: 'greenhouse' },
              { name: 'LEVER' },
              { name: 'workday' },
              { name: 'Taleo' },
              { name: 'Ashby' },
              { name: 'bambooHR' },
            ].map(c => (
              <div key={c.name} style={{ ...fontInter, fontSize: 24, fontWeight: 600, letterSpacing: '-0.3px', color: t.onSurface, whiteSpace: 'nowrap' }}>
                {c.name}
              </div>
            ))}
          </div>
        </section>

        {/* ── Precision Templates (Features) ── */}
        <section id="features" style={{ padding: '64px 0', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', textAlign: 'center' }}>
            <span style={{ ...fontMono, fontSize: 12, letterSpacing: '0.85px', color: t.ash, textTransform: 'uppercase' }}>Precision Layouts</span>
            <h2 style={{ ...fontInter, fontSize: 40, lineHeight: 1.2, letterSpacing: '-0.84px', fontWeight: 600, color: t.onSurface }}>
              Designed for parsing, built for humans.
            </h2>
            <p style={{ ...fontInter, fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.19px', color: t.ash, maxWidth: 672 }}>
              Our templates feature strictly single-column, mathematically spaced layouts, rigorously tested against modern and legacy ATS parsers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, paddingTop: 16 }}>
            {[
              {
                tag: 'Dev', title: 'The Standard',
                desc: 'A high-density, single-column layout optimized for maximum technical bullet points and skill matrices.',
                preview: (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, position: 'relative', ...fontInter, fontSize: 11, lineHeight: 1.4 }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(103,152,255,0.2)', color: t.primaryCont, ...fontMono, fontSize: 10, padding: '2px 8px', borderRadius: 4 }}>Dev</div>
                    <div style={{ fontWeight: 600, color: t.onSurface, fontSize: 12, paddingRight: 40 }}>Senior Backend Engineer — Edge Platform</div>
                    <div style={{ color: t.ash }}>
                      <div>• Cut p95 latency by 40% via Redis-backed caching layer</div>
                      <div>• Sharded Postgres to 12 shards, scaling to 1.2B rows/day</div>
                      <div>• Rebuilt CI/CD, cutting deploy time from 45m to 8m</div>
                      <div>• Led migration of 6 services to Kubernetes on AWS</div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ background: 'rgba(103,152,255,0.15)', color: t.primaryCont, ...fontMono, fontSize: 9, padding: '2px 7px', borderRadius: 3, letterSpacing: '0.4px' }}>+40% LATENCY DROP</span>
                      <span style={{ background: 'rgba(103,152,255,0.15)', color: t.primaryCont, ...fontMono, fontSize: 9, padding: '2px 7px', borderRadius: 3, letterSpacing: '0.4px' }}>3x DEPLOY SPEED</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 2 }}>
                      {['Go', 'React', 'K8s', 'Postgres', 'Redis', 'gRPC', 'Terraform', 'Kafka'].map(s => (
                        <span key={s} style={{ border: `1px solid ${t.graphite}`, color: t.ash, fontSize: 9, padding: '2px 7px', borderRadius: 3 }}>{s}</span>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                tag: 'Lead', title: 'The Executive',
                desc: 'A centered typographic hierarchy designed to emphasize leadership impact and key milestones.',
                preview: (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, position: 'relative', ...fontInter, fontSize: 11, lineHeight: 1.4, textAlign: 'center' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(103,152,255,0.2)', color: t.primaryCont, ...fontMono, fontSize: 10, padding: '2px 8px', borderRadius: 4 }}>Lead</div>
                    <div style={{ fontWeight: 600, color: t.onSurface, fontSize: 13 }}>VP of Engineering</div>
                    <div style={{ color: t.ash, fontSize: 10 }}>Acme Corp · 2021 — Present</div>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                      <span style={{ background: 'rgba(103,152,255,0.15)', color: t.primaryCont, ...fontMono, fontSize: 9, padding: '3px 9px', borderRadius: 12, letterSpacing: '0.3px' }}>MANAGED $15M BUDGET</span>
                      <span style={{ background: 'rgba(103,152,255,0.15)', color: t.primaryCont, ...fontMono, fontSize: 9, padding: '3px 9px', borderRadius: 12, letterSpacing: '0.3px' }}>LED 25+ ENG TEAM</span>
                    </div>
                    <div style={{ width: '100%', height: 1, background: t.steelBorder, margin: '2px 0' }} />
                    <div style={{ color: t.ash, textAlign: 'left' }}>
                      <div>• Grew org from 4 to 120 engineers across 3 time zones</div>
                      <div>• Drove platform P&L to $38M annual revenue</div>
                      <div>• Delivered 40% margin improvement in 2 fiscal years</div>
                      <div>• Established OKR cadence adopted company-wide</div>
                    </div>
                  </div>
                ),
              },
              {
                tag: 'Data', title: 'The Analyst',
                desc: 'A structured, linear format designed to cleanly separate key achievements, metrics, and technical competencies.',
                preview: (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, position: 'relative', ...fontInter, fontSize: 11, lineHeight: 1.4 }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(103,152,255,0.2)', color: t.primaryCont, ...fontMono, fontSize: 10, padding: '2px 8px', borderRadius: 4 }}>Data</div>
                    <div style={{ fontWeight: 600, color: t.onSurface, fontSize: 12, paddingRight: 40 }}>Analytics Engineer — Growth</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, color: t.ash }}>
                      <div style={{ display: 'flex', gap: 8 }}><span style={{ color: t.graphite, ...fontMono, fontSize: 9, minWidth: 92 }}>LANGUAGES</span><span>Python · SQL</span></div>
                      <div style={{ display: 'flex', gap: 8 }}><span style={{ color: t.graphite, ...fontMono, fontSize: 9, minWidth: 92 }}>WAREHOUSE</span><span>Snowflake · BigQuery</span></div>
                      <div style={{ display: 'flex', gap: 8 }}><span style={{ color: t.graphite, ...fontMono, fontSize: 9, minWidth: 92 }}>ORCHESTRATION</span><span>dbt · Airflow · Looker</span></div>
                    </div>
                    <div style={{ width: '100%', height: 1, background: t.steelBorder, margin: '2px 0' }} />
                    <div style={{ color: t.ash }}>
                      <div>• Modeled pipelines serving 2M daily-active users</div>
                      <div>• Cut reporting runtime by 65% with incremental dbt runs</div>
                      <div>• Lifted data-quality pass rate from 82% to 99.9%</div>
                      <div>• Automated anomaly alerts, saving 10 hrs/week</div>
                    </div>
                  </div>
                ),
              },
            ].map((card, idx) => (
              <div key={card.title} className={`reveal-scale card-hover stagger-${idx + 1}`} style={{
                background: t.cardCarbon, borderRadius: 8, padding: 24,
                border: `1px solid ${t.steelBorder}`, display: 'flex', flexDirection: 'column', gap: 12,
                cursor: 'default',
              }}>
                <div style={{
                  height: 240, background: t.deepCoal, borderRadius: 4,
                  border: `1px solid ${t.steelBorder}`, padding: 16, overflow: 'hidden',
                }}>
                  {card.preview}
                </div>
                <div>
                  <h3 style={{ ...fontInter, fontSize: 16, fontWeight: 500, color: t.onSurface }}>{card.title}</h3>
                  <p style={{ ...fontInter, fontSize: 14, lineHeight: 1.5, letterSpacing: '-0.17px', color: t.ash, marginTop: 8 }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section id="pricing" className="reveal-scale" style={{
          padding: '64px 32px', margin: '64px 0', background: t.deepCoal, borderRadius: 8,
          border: `1px solid ${t.steelBorder}`, display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center', gap: 16,
        }}>
          <h2 style={{ ...fontInter, fontSize: 40, lineHeight: 1.2, letterSpacing: '-0.84px', fontWeight: 600, color: t.onSurface }}>
            Ready to compile your career?
          </h2>
          <p style={{ ...fontInter, fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.19px', color: t.ash, maxWidth: 560 }}>
            Stop wrestling with Word margins. Start building a technical document that respects your engineering background.
          </p>
          <Link to="/register" id="cta-get-started" className="btn-hover-lift" style={{
            marginTop: 12, background: '#fff', color: t.bg, padding: '16px 64px', borderRadius: 8,
            ...fontInter, fontSize: 16, fontWeight: 500, textDecoration: 'none',
          }}>
            Start Building Free
          </Link>
        </section>
      </main>

      {/* ═══════ Footer ═══════ */}
      <footer className="reveal" style={{
        width: '100%', background: t.deepCoal, padding: '32px 0', borderTop: `1px solid ${t.steelBorder}`,
        marginTop: 64,
      }}>
        <div style={{
          padding: '0 24px', maxWidth: 1200, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{
            ...fontInter, fontSize: 24, fontWeight: 600, letterSpacing: '-0.5px',
            color: t.onSurface, display: 'flex', alignItems: 'center', gap: 8,
          }}>
            CareerSync
          </div>
          <p style={{ ...fontInter, fontSize: 14, lineHeight: 1.5, letterSpacing: '-0.17px', color: t.ash }}>
            © 2026 CareerSync. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
