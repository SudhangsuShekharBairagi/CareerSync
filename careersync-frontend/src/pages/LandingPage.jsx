import { Link } from 'react-router-dom'

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    ),
    title: 'AI Resume Analyzer',
    desc: 'AI-driven feedback to optimize your resume for ATS and industry standards. Get a score and actionable improvements in seconds.',
    tag: 'POWERED BY AI',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
    title: 'Smart Job Tracker',
    desc: 'Stay organized with a kanban-style board and automated application updates. Never lose track of an opportunity.',
    tag: 'SMART TRACKING',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Career AI Insights',
    desc: 'Personalized career growth recommendations based on market trends and your unique profile. Stay ahead of the curve.',
    tag: 'REAL-TIME DATA',
  },
]

const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '89%', label: 'Interview Rate' },
  { value: '3.2x', label: 'More Callbacks' },
  { value: '4.8★', label: 'User Rating' },
]

// Inline style objects
const s = {
  page: { minHeight: '100vh', backgroundColor: '#0f131f', overflowX: 'hidden', fontFamily: 'Inter, sans-serif' },
  nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: '64px', borderBottom: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(15,19,31,0.85)', backdropFilter: 'blur(20px)' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '32px' },
  navLink: { fontSize: '14px', color: '#c2c6d6', textDecoration: 'none', transition: 'color 0.15s' },
  navBtns: { display: 'flex', alignItems: 'center', gap: '12px' },
  btnPrimary: { background: 'linear-gradient(135deg,#3b82f6,#6366f1)', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' },
  btnSecondary: { background: 'transparent', color: '#dfe2f3', border: '1px solid rgba(255,255,255,0.18)', padding: '8px 18px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' },
  hero: { position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '100px 16px 60px', overflow: 'hidden' },
  badge: { background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', color: '#93c5fd', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.05em', padding: '5px 12px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '28px' },
  h1: { fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', textAlign: 'center', maxWidth: '800px', color: '#dfe2f3', marginBottom: '20px' },
  subtext: { fontSize: '17px', color: '#c2c6d6', lineHeight: 1.7, textAlign: 'center', maxWidth: '560px', marginBottom: '36px' },
  heroButtons: { display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '56px' },
  section: { padding: '80px 16px', position: 'relative' },
  sectionTitle: { fontSize: '36px', fontWeight: 700, color: '#dfe2f3', textAlign: 'center', marginBottom: '12px' },
  sectionSub: { fontSize: '15px', color: '#c2c6d6', textAlign: 'center', marginBottom: '48px' },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', maxWidth: '1100px', margin: '0 auto' },
  grid4: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '32px', maxWidth: '960px', margin: '0 auto', textAlign: 'center' },
  card: { background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' },
  cardIcon: { width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' },
}

// Mockup mini dashboard
function DashboardMockup() {
  return (
    <div style={{ ...s.card, width: '100%', maxWidth: '860px', margin: '0 auto 0', boxShadow: '0 0 40px rgba(59,130,246,0.1)' }}>
      {/* Window chrome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,59,48,0.5)' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,204,0,0.5)' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(40,205,65,0.5)' }} />
        <div style={{ flex: 1, maxWidth: '260px', margin: '0 auto', background: 'rgba(255,255,255,0.04)', borderRadius: '5px', padding: '4px 10px' }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: '#424754' }}>app.careersync.ai/dashboard</span>
        </div>
      </div>
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '16px' }}>
        {[
          { label: 'Applications', value: '42', color: '#60a5fa' },
          { label: 'Interviews', value: '8', color: '#818cf8' },
          { label: 'Resume Score', value: '87%', color: '#38bdf8' },
          { label: 'Jobs Saved', value: '23', color: '#a78bfa' },
        ].map((st) => (
          <div key={st.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: st.color }}>{st.value}</div>
            <div style={{ fontSize: '11px', color: '#8c909f', marginTop: '2px' }}>{st.label}</div>
          </div>
        ))}
      </div>
      {/* Chart + insights */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#8c909f', marginBottom: '10px' }}>Application Activity</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '52px' }}>
            {[30, 45, 28, 60, 55, 70, 48, 80, 65, 75, 90, 85].map((h, i) => (
              <div key={i} style={{ flex: 1, borderRadius: '2px', background: 'linear-gradient(to top, #3b82f6, #6366f1)', height: `${h}%`, opacity: 0.8 }} />
            ))}
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#8c909f', marginBottom: '10px' }}>AI Insights</div>
          {['Optimize for Fintech', 'Follow up with Stripe'].map((tip) => (
            <div key={tip} style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#3b82f6', marginTop: '5px', flexShrink: 0 }} />
              <span style={{ fontSize: '11px', color: '#c2c6d6' }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div style={s.page}>
      {/* Nav */}
      <nav style={s.nav}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* <div style={{ width: '30px', height: '30px', borderRadius: '7px', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div> */}
          <div>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#dfe2f3' }}>CareerSync</span>
            {/* <span style={{ marginLeft: '4px', fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: '#3b82f6', letterSpacing: '2px', textTransform: 'uppercase' }}>AI</span> */}
          </div>
        </div>
        <div style={s.navLinks}>
          <a href="#features" style={s.navLink}>Features</a>
          <a href="#how-it-works" style={s.navLink}>How It Works</a>
          <a href="#stats" style={s.navLink}>Pricing</a>
        </div>
        <div style={s.navBtns}>
          <Link to="/login" style={{ ...s.btnSecondary, padding: '7px 16px' }}>Login</Link>
          <Link to="/register" style={s.btnPrimary}>Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={s.hero}>
        {/* Orbs */}
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(59,130,246,0.1)', filter: 'blur(80px)', top: '-100px', left: '-100px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(99,102,241,0.08)', filter: 'blur(80px)', top: '40%', right: '-80px', pointerEvents: 'none' }} />

        <div style={s.badge}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#60a5fa', display: 'inline-block' }} />
          AI-Powered Career Platform
        </div>

        <h1 style={s.h1}>
          Sync Your Career,{' '}
          <span style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1,#0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Powered by AI
          </span>
        </h1>

        <p style={s.subtext}>
          Harness the power of AI to optimize your resume, track job applications, and gain personalized career insights — all in one unified platform.
        </p>

        <div style={s.heroButtons}>
          <Link to="/register" id="hero-get-started" style={{ ...s.btnPrimary, padding: '12px 28px', fontSize: '15px', borderRadius: '10px', boxShadow: '0 0 24px rgba(59,130,246,0.3)' }}>
            Get Started for Free
          </Link>
          <Link to="/dashboard" id="hero-demo" style={{ ...s.btnSecondary, padding: '12px 28px', fontSize: '15px', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Watch Demo
          </Link>
        </div>

        <DashboardMockup />
      </section>

      {/* Stats */}
      <section id="stats" style={{ padding: '48px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0a0e1a' }}>
        <div style={s.grid4}>
          {stats.map((st) => (
            <div key={st.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: 700, background: 'linear-gradient(135deg,#3b82f6,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '6px' }}>{st.value}</div>
              <div style={{ fontSize: '13px', color: '#8c909f' }}>{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ ...s.section, maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}><div style={s.badge}>Features</div></div>
        <h2 style={s.sectionTitle}>Everything You Need to Land Your Dream Job</h2>
        <p style={s.sectionSub}>Powerful AI tools designed to give you a competitive edge in your job search.</p>

        <div style={s.grid3}>
          {features.map((f) => (
            <div key={f.title} style={s.card}>
              <div style={s.cardIcon}>{f.icon}</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: '#93c5fd', letterSpacing: '1px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)', padding: '3px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '12px', textTransform: 'uppercase' }}>{f.tag}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#dfe2f3', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '13px', color: '#c2c6d6', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ ...s.section, background: '#0a0e1a' }}>
        <h2 style={s.sectionTitle}>How It Works</h2>
        <p style={s.sectionSub}>Get started in minutes with our simple 3-step process.</p>
        <div style={{ ...s.grid3, maxWidth: '900px' }}>
          {[
            { step: '01', title: 'Upload Your Resume', desc: 'Upload your existing resume or build one from scratch with our AI-powered builder.' },
            { step: '02', title: 'Get AI Analysis', desc: 'Our AI scores your resume, identifies gaps, and gives you targeted recommendations.' },
            { step: '03', title: 'Track & Optimize', desc: 'Track your applications on a kanban board and get personalized insights as you apply.' },
          ].map((item) => (
            <div key={item.step} style={{ textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: "'JetBrains Mono',monospace", fontSize: '18px', fontWeight: 700, color: '#60a5fa' }}>{item.step}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#dfe2f3', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ fontSize: '13px', color: '#c2c6d6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...s.section, textAlign: 'center' }}>
        <div style={{ ...s.card, maxWidth: '680px', margin: '0 auto', padding: '48px 40px', border: '1px solid rgba(59,130,246,0.12)' }}>
          <h2 style={{ fontSize: '34px', fontWeight: 700, color: '#dfe2f3', marginBottom: '14px' }}>Ready to Sync Your Career?</h2>
          <p style={{ fontSize: '15px', color: '#c2c6d6', marginBottom: '28px', lineHeight: 1.6 }}>Join 50,000+ professionals who use CareerSync AI to land better jobs, faster.</p>
          <Link to="/register" id="cta-get-started" style={{ ...s.btnPrimary, padding: '14px 32px', fontSize: '15px', borderRadius: '10px', boxShadow: '0 0 24px rgba(59,130,246,0.3)' }}>
            Get Started for Free — No Credit Card
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 32px', background: '#0a0e1a', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* <div style={{ width: '22px', height: '22px', borderRadius: '5px', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div> */}
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#dfe2f3' }}>CareerSync</span>
        </div>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#424754' }}>© 2026 CareerSync AI. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy', 'Terms', 'Contact'].map((l) => (
            <a key={l} href="#" style={{ fontSize: '12px', color: '#8c909f', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}
