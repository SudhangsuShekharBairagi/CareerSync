import { t, fontInter, fontMono } from '../theme/tokens'

export default function EditorMockup() {
  return (
    <div className="animate-float-gentle" style={{
      position: 'relative', zIndex: 10, width: '100%', height: '520px',
      background: t.cardCarbon, borderRadius: '12px', border: `1px solid ${t.steelBorder}`,
      boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden', ...fontInter,
    }}>
      {/* Top Window Chrome / Bar */}
      <div style={{
        height: '42px', background: t.deepCoal, borderBottom: `1px solid ${t.steelBorder}`,
        padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
          <span style={{ ...fontMono, fontSize: '11px', color: t.fog, marginLeft: '8px', letterSpacing: '0.5px' }}>
            career_sync_app / resume_v2.pdf
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.3)',
            color: '#4ade80', fontSize: '10px', ...fontMono, padding: '2px 8px', borderRadius: '4px',
            fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
            ATS SCORE 94%
          </span>
        </div>
      </div>

      {/* Main Workspace split */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Mini Sidebar */}
        <div style={{
          width: '160px', background: t.deepCoal, borderRight: `1px solid ${t.steelBorder}`,
          padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0,
        }}>
          {/* App Brand */}
          <div style={{ fontSize: '13px', fontWeight: 700, color: t.onSurface, letterSpacing: '-0.3px' }}>
            CareerSync
          </div>

          {/* Mini Nav Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { label: 'Resume Builder', active: true, icon: '📄' },
              { label: 'ATS Analyser', active: false, icon: '⚡' },
              { label: 'History', active: false, icon: '⏱' },
              { label: 'Profile', active: false, icon: '👤' },
            ].map((item) => (
              <div key={item.label} style={{
                padding: '6px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 500,
                color: item.active ? t.primaryCont : t.fog,
                background: item.active ? 'rgba(103,152,255,0.1)' : 'transparent',
                border: item.active ? `1px solid rgba(103,152,255,0.2)` : '1px solid transparent',
                display: 'flex', alignItems: 'center', gap: '6px', cursor: 'default',
              }}>
                <span>{item.icon}</span>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* User badge */}
          <div style={{
            marginTop: 'auto', padding: '8px', background: t.cardCarbon, borderRadius: '8px',
            border: `1px solid ${t.steelBorder}`, display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', background: t.graphite,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px', fontWeight: 700, color: '#fff',
            }}>
              AR
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '10px', fontWeight: 600, color: t.onSurface, truncate: true }}>Alex Rivera</div>
              <div style={{ fontSize: '8px', color: t.fog }}>PRO PLAN</div>
            </div>
          </div>
        </div>

        {/* Main Canvas Document Area */}
        <div style={{
          flex: 1, background: t.bg, padding: '16px', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative',
        }}>
          {/* Document Header */}
          <div style={{
            background: t.cardCarbon, border: `1px solid ${t.steelBorder}`, borderRadius: '8px',
            padding: '16px', position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: t.onSurface, margin: 0 }}>Alex Rivera</h3>
                <p style={{ fontSize: '12px', color: t.primaryCont, fontWeight: 600, margin: '2px 0 0' }}>Senior Frontend Engineer</p>
              </div>
              <span style={{
                background: t.deepCoal, border: `1px solid ${t.steelBorder}`,
                color: t.ash, fontSize: '9px', ...fontMono, padding: '2px 6px', borderRadius: '4px',
              }}>
                SINGLE COLUMN
              </span>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '10px', fontSize: '10px', color: t.fog }}>
              <span>✉ alex@stripe.com</span>
              <span>📍 San Francisco, CA</span>
              <span>🔗 linkedin.com/in/alexr</span>
            </div>
          </div>

          {/* Section: Summary */}
          <div style={{
            background: t.cardCarbon, border: `1px solid ${t.steelBorder}`, borderRadius: '8px',
            padding: '14px',
          }}>
            <div style={{ fontSize: '9px', ...fontMono, color: t.primaryCont, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px', fontWeight: 600 }}>
              SUMMARY
            </div>
            <p style={{ fontSize: '11px', color: t.ash, lineHeight: 1.5, margin: 0 }}>
              Results-driven Senior Frontend Engineer with 5+ years experience building high-performance web applications at scale. Led cross-functional teams to redesign core product interfaces.
            </p>
          </div>

          {/* Section: Experience */}
          <div style={{
            background: t.cardCarbon, border: `1px solid ${t.steelBorder}`, borderRadius: '8px',
            padding: '14px', flex: 1,
          }}>
            <div style={{ fontSize: '9px', ...fontMono, color: t.primaryCont, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px', fontWeight: 600 }}>
              EXPERIENCE
            </div>

            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ fontWeight: 700, color: t.onSurface }}>Senior Frontend Engineer</span>
                <span style={{ ...fontMono, fontSize: '9px', color: t.fog }}>2021 – Present</span>
              </div>
              <div style={{ fontSize: '10px', color: t.primaryCont, fontWeight: 600, marginBottom: '4px' }}>Stripe</div>
              <ul style={{ margin: 0, paddingLeft: '12px', fontSize: '10px', color: t.ash, lineHeight: 1.45 }}>
                <li>Led team of 4 engineers to redesign merchant dashboard, reducing load times by 42%.</li>
                <li>Architected shared React component library cutting UI dev time by 30%.</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Floating AI Assistant Bar */}
        <div style={{
          position: 'absolute', bottom: '16px', right: '16px',
          background: t.deepCoal, border: `1px solid ${t.steelBorder}`,
          borderRadius: '8px', padding: '8px 12px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', gap: '10px', zIndex: 20,
        }}>
          <div style={{
            width: 24, height: 24, borderRadius: '6px', background: 'rgba(103,152,255,0.2)',
            color: t.primaryCont, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700,
          }}>
            ✨
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: t.onSurface }}>AI Optimization Applied</div>
            <div style={{ fontSize: '9px', color: '#4ade80', ...fontMono }}>+18% ATS Keyword Match</div>
          </div>
        </div>

      </div>
    </div>
  )
}
