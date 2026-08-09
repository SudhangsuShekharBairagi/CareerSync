import { useState } from 'react'

const s = {
  page: { fontFamily: 'Inter, sans-serif' },
  card: { background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px' },
  badge: (color) => ({ background: `rgba(${color},0.12)`, border: `1px solid rgba(${color},0.25)`, color: '#dfe2f3', fontSize: '10px', fontFamily: "'JetBrains Mono',monospace", padding: '3px 8px', borderRadius: '999px', display: 'inline-block', letterSpacing: '0.8px', textTransform: 'uppercase' }),
}

// Status badge styles
const statusMap = {
  applied: { bg: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd' },
  interviewing: { bg: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#fcd34d' },
  offer: { bg: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', color: '#86efac' },
  rejected: { bg: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.3)', color: '#fca5a5' },
  saved: { bg: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)', color: '#c4b5fd' },
}

const statCards = [
  { label: 'Total Applications', value: '42', change: '+5 this week', color: '#60a5fa', bgFrom: 'rgba(59,130,246,0.08)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg> },
  { label: 'Interviews Scheduled', value: '8', change: '+2 this week', color: '#818cf8', bgFrom: 'rgba(99,102,241,0.08)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> },
  { label: 'Resume Score', value: '87%', change: '+4 from last update', color: '#38bdf8', bgFrom: 'rgba(14,165,233,0.08)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg> },
  { label: 'Jobs Saved', value: '23', change: '+8 this week', color: '#a78bfa', bgFrom: 'rgba(167,139,250,0.08)',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg> },
]

const recentApplications = [
  { company: 'Stripe', role: 'Senior Frontend Engineer', status: 'interviewing', date: 'Aug 5' },
  { company: 'Vercel', role: 'Product Engineer', status: 'applied', date: 'Aug 4' },
  { company: 'Linear', role: 'Full Stack Developer', status: 'applied', date: 'Aug 3' },
  { company: 'Notion', role: 'Software Engineer', status: 'saved', date: 'Aug 2' },
  { company: 'Figma', role: 'UI Engineer', status: 'offer', date: 'Jul 30' },
]

const aiInsights = [
  'Optimize your resume for Fintech roles — add keywords like "payment processing" and "PCI DSS"',
  'Follow up with Stripe recruiter — your last email was 5 days ago',
  'New opening at Notion matches your skill set 92% — apply now',
  'Tailor your cover letter to emphasize TypeScript experience for Senior roles',
]

function ActivityChart() {
  const data = [8, 12, 6, 15, 11, 18, 9, 22, 17, 25, 20, 28, 19, 30, 24, 26, 21, 32, 27, 35, 29, 33, 28, 38, 31, 36, 30, 42, 35, 40]
  const max = Math.max(...data)
  const w = 800, h = 130, padX = 8, padY = 8
  const chartW = w - padX * 2, chartH = h - padY * 2
  const pts = data.map((v, i) => ({ x: padX + (i / (data.length - 1)) * chartW, y: padY + (1 - v / max) * chartH }))
  const pathD = pts.reduce((d, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${d} L ${p.x} ${p.y}`), '')
  const areaD = `${pathD} L ${pts[pts.length-1].x} ${h} L ${pts[0].x} ${h} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: '110px' }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#cg)" />
      <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="4" fill="#3b82f6" />
    </svg>
  )
}

export default function Dashboard() {
  return (
    <div style={{ ...s.page, display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#dfe2f3', margin: 0 }}>Welcome back, Alex 👋</h1>
          <p style={{ fontSize: '13px', color: '#8c909f', marginTop: '4px' }}>Here's what's happening with your career today.</p>
        </div>
        <button id="btn-new-application" style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Application
        </button>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        {statCards.map((card) => (
          <div key={card.label} style={{ ...s.card, background: card.bgFrom, padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {card.icon}
              </div>
              <span style={{ fontSize: '28px', fontWeight: 700, color: card.color }}>{card.value}</span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#dfe2f3', marginBottom: '4px' }}>{card.label}</div>
            <div style={{ fontSize: '11px', color: '#4ade80', fontFamily: "'JetBrains Mono', monospace" }}>↑ {card.change}</div>
          </div>
        ))}
      </div>

      {/* Middle: Recent Apps + AI Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,3fr) minmax(0,2fr)', gap: '16px' }}>
          {/* Recent Applications */}
          <div style={s.card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#dfe2f3', margin: 0 }}>Recent Applications</h2>
              <a href="/jobs" style={{ fontSize: '12px', color: '#60a5fa', textDecoration: 'none' }}>View all →</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {recentApplications.map((app) => {
                const st = statusMap[app.status]
                return (
                  <div key={app.company} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#dfe2f3', flexShrink: 0 }}>
                      {app.company[0]}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: '#dfe2f3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.company}</div>
                      <div style={{ fontSize: '11px', color: '#8c909f', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.role}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                      <span style={{ background: st.bg, border: st.border, color: st.color, fontSize: '9px', fontFamily: "'JetBrains Mono',monospace", padding: '2px 7px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{app.status}</span>
                      <span style={{ fontSize: '10px', color: '#424754' }}>{app.date}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* AI Insights */}
          <div style={{ ...s.card, border: '1px solid rgba(59,130,246,0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                  </svg>
                </div>
                <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#dfe2f3', margin: 0 }}>AI Insights</h2>
              </div>
              <span style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)', color: '#93c5fd', fontSize: '9px', fontFamily: "'JetBrains Mono',monospace", padding: '2px 7px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Live</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {aiInsights.map((insight, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', padding: '10px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#60a5fa', flexShrink: 0, marginTop: '4px' }} />
                  <p style={{ fontSize: '12px', color: '#c2c6d6', lineHeight: 1.55, margin: 0 }}>{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div style={s.card}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#dfe2f3', margin: 0 }}>Application Activity</h2>
            <p style={{ fontSize: '11px', color: '#8c909f', marginTop: '2px' }}>Last 30 days</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#8c909f' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />
            Applications
          </div>
        </div>
        <ActivityChart />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          {['Aug 1', 'Aug 8', 'Aug 15', 'Aug 22', 'Aug 29'].map((d) => (
            <span key={d} style={{ fontSize: '10px', color: '#424754', fontFamily: "'JetBrains Mono',monospace" }}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
