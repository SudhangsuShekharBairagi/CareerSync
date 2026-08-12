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
            {['Features', 'Templates', 'Pricing'].map(l => (
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
            Trusted by engineers at
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 64, opacity: 0.5, filter: 'grayscale(1)', transition: 'all 0.5s' }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'grayscale(0)'; e.currentTarget.style.opacity = '1' }}
            onMouseLeave={e => { e.currentTarget.style.filter = 'grayscale(1)'; e.currentTarget.style.opacity = '0.5' }}
          >
            {[
              { icon: 'hexagon', name: 'Acme Corp' },
              { icon: 'change_history', name: 'Zenith' },
              { icon: 'trip_origin', name: 'Globex' },
              { icon: 'square', name: 'Initech' },
            ].map(c => (
              <div key={c.name} style={{ ...fontInter, fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="material-symbols-outlined">{c.icon}</span>
                {c.name}
              </div>
            ))}
          </div>
        </section>

        {/* ── Precision Templates (Features) ── */}
        <section id="features" style={{ padding: '64px 0', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', textAlign: 'center' }}>
            <span style={{ ...fontMono, fontSize: 12, letterSpacing: '0.85px', color: t.ash, textTransform: 'uppercase' }}>01. Precision Layouts</span>
            <h2 style={{ ...fontInter, fontSize: 40, lineHeight: 1.2, letterSpacing: '-0.84px', fontWeight: 600, color: t.onSurface }}>
              Designed for parsing, built for humans.
            </h2>
            <p style={{ ...fontInter, fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.19px', color: t.ash, maxWidth: 672 }}>
              Our templates are strictly single-column, mathematically spaced, and rigorously tested against standard ATS parsers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, paddingTop: 16 }}>
            {[
              {
                tag: 'Dev', title: 'The Standard',
                desc: 'A ruthless, single-column execution optimized for maximum data density.',
                preview: (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(103,152,255,0.2)', color: t.primaryCont, ...fontMono, fontSize: 10, padding: '2px 6px', borderRadius: 4 }}>Dev</div>
                    <div style={{ width: '100%', height: 8, background: t.surfBright, borderRadius: 4 }} />
                    <div style={{ width: '66%', height: 8, background: t.surfBright, borderRadius: 4, marginBottom: 6 }} />
                    <div style={{ width: '100%', height: 4, background: t.surfCont, borderRadius: 4 }} />
                    <div style={{ width: '83%', height: 4, background: t.surfCont, borderRadius: 4 }} />
                    <div style={{ width: '100%', height: 4, background: t.surfCont, borderRadius: 4 }} />
                  </div>
                ),
              },
              {
                tag: 'Lead', title: 'The Executive',
                desc: 'Centered typographic hierarchy designed for management and staff-level roles.',
                preview: (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(103,152,255,0.2)', color: t.primaryCont, ...fontMono, fontSize: 10, padding: '2px 6px', borderRadius: 4 }}>Lead</div>
                    <div style={{ width: '50%', height: 12, background: t.surfBright, borderRadius: 4, margin: '0 auto', marginBottom: 6 }} />
                    <div style={{ width: '100%', height: 1, background: t.steelBorder, marginBottom: 6 }} />
                    <div style={{ display: 'flex', gap: 6 }}>
                      <div style={{ width: '25%', minHeight: 20, background: t.surfCont, borderRadius: 4 }} />
                      <div style={{ width: '75%', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ width: '100%', height: 4, background: t.surfBright, borderRadius: 4 }} />
                        <div style={{ width: '100%', height: 4, background: t.surfBright, borderRadius: 4 }} />
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                tag: 'Data', title: 'The Academic',
                desc: 'A structured two-column layout for extensive publication and patent lists.',
                preview: (
                  <div style={{ display: 'flex', gap: 6, width: '100%', height: '100%', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(103,152,255,0.2)', color: t.primaryCont, ...fontMono, fontSize: 10, padding: '2px 6px', borderRadius: 4 }}>Data</div>
                    <div style={{ width: '33%', borderRight: `1px solid ${t.steelBorder}`, display: 'flex', flexDirection: 'column', gap: 4, paddingRight: 4 }}>
                      <div style={{ width: '100%', height: 8, background: t.surfBright, borderRadius: 4, marginBottom: 6 }} />
                      <div style={{ width: '100%', height: 4, background: t.surfCont, borderRadius: 4 }} />
                      <div style={{ width: '100%', height: 4, background: t.surfCont, borderRadius: 4 }} />
                    </div>
                    <div style={{ width: '67%', display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 4 }}>
                      <div style={{ width: '100%', height: 8, background: t.surfBright, borderRadius: 4, marginBottom: 6 }} />
                      <div style={{ width: '100%', height: 4, background: t.surfCont, borderRadius: 4 }} />
                      <div style={{ width: '100%', height: 4, background: t.surfCont, borderRadius: 4 }} />
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
                  height: 192, background: t.deepCoal, borderRadius: 4,
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
        width: '100%', background: t.deepCoal, padding: '64px 0', borderTop: `1px solid ${t.steelBorder}`,
        marginTop: 64,
      }}>
        <div style={{
          padding: '0 24px', maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              ...fontInter, fontSize: 24, fontWeight: 600, letterSpacing: '-0.5px',
              color: t.onSurface, display: 'flex', alignItems: 'center', gap: 8,
            }}>
              CareerSync
            </div>
            <p style={{ ...fontInter, fontSize: 14, lineHeight: 1.5, letterSpacing: '-0.17px', color: t.ash }}>
              © 2026 CareerSync Systems. Built for precision.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'flex-end' }}>
            {['Privacy Policy', 'Terms of Service', 'Security', 'Status', 'API Documentation'].map(l => (
              <a key={l} href="#" style={{
                ...fontInter, fontSize: 14, lineHeight: 1.5, letterSpacing: '-0.17px',
                color: t.ash, textDecoration: 'none', transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = t.onSurface}
              onMouseLeave={e => e.currentTarget.style.color = t.ash}
              >{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
