import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const s = {
  page: { minHeight: '100vh', display: 'flex', backgroundColor: '#0f131f', fontFamily: 'Inter, sans-serif', overflow: 'hidden' },
  leftPanel: { display: 'none', width: '50%', position: 'relative', overflow: 'hidden', backgroundColor: '#0a0e1a', flexDirection: 'column' },
  rightPanel: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', position: 'relative' },
  card: { background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' },
  inputField: { background: '#0a0e1a', border: '1px solid rgba(255,255,255,0.1)', color: '#dfe2f3', outline: 'none', padding: '11px 14px', borderRadius: '8px', fontSize: '13px', width: '100%', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', transition: 'border 0.2s' },
  label: { display: 'block', fontSize: '12px', fontWeight: 500, color: '#c2c6d6', marginBottom: '6px' },
  btnPrimary: { background: 'linear-gradient(135deg,#3b82f6,#6366f1)', color: 'white', border: 'none', padding: '13px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', width: '100%', fontFamily: 'Inter, sans-serif' },
  btnGoogle: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#dfe2f3', padding: '11px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontFamily: 'Inter, sans-serif' },
}

export default function AuthPage({ mode = 'login' }) {
  const [tab, setTab] = useState(mode)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/resume')
  }

  return (
    <div style={s.page}>
      {/* Left decorative panel — visible only on large screens */}
      <div style={{ ...s.leftPanel, display: typeof window !== 'undefined' && window.innerWidth >= 1024 ? 'flex' : 'none' }}>
        {/* Orbs */}
        <div style={{ position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(59,130,246,0.12)', filter: 'blur(70px)', top: '-80px', left: '-80px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(99,102,241,0.1)', filter: 'blur(70px)', bottom: '60px', right: '20px', pointerEvents: 'none' }} />
        {/* Grid lines */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '48px 56px' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '56px' }}>
            {/* <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(59,130,246,0.3)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div> */}
            <div>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#dfe2f3' }}>CareerSync</span>
              {/* <span style={{ marginLeft: '4px', fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: '#3b82f6', letterSpacing: '2px', textTransform: 'uppercase' }}>AI</span> */}
            </div>
          </Link>

          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#dfe2f3', lineHeight: 1.2, marginBottom: '14px' }}>
            Your AI Career<br />
            <span style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1,#0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Command Center
            </span>
          </h1>
          <p style={{ fontSize: '14px', color: '#c2c6d6', lineHeight: 1.7, marginBottom: '40px', maxWidth: '320px' }}>
            One platform to optimize your resume, track applications, and unlock your career potential with AI.
          </p>

          {/* Feature checkmarks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {['AI Resume Scoring & Optimization', 'Smart Job Application Tracker', 'Personalized Career Insights'].map((feat) => (
              <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span style={{ fontSize: '13px', color: '#c2c6d6' }}>{feat}</span>
              </div>
            ))}
          </div>

          {/* Floating stat cards */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '48px' }}>
            {[{ val: '87%', lbl: 'Avg Resume Score', color: '#60a5fa' }, { val: '3.2x', lbl: 'More Callbacks', color: '#818cf8' }].map((st) => (
              <div key={st.lbl} style={{ ...s.card, padding: '14px 18px' }}>
                <div style={{ fontSize: '22px', fontWeight: 700, color: st.color }}>{st.val}</div>
                <div style={{ fontSize: '11px', color: '#8c909f', marginTop: '2px' }}>{st.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right auth panel */}
      <div style={s.rightPanel}>
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(59,130,246,0.07)', filter: 'blur(80px)', top: 0, right: 0, pointerEvents: 'none' }} />

        <div style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 10 }}>
          {/* Mobile logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '28px' }}>
            {/* <div style={{ width: '30px', height: '30px', borderRadius: '7px', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div> */}
            {/* <span style={{ fontSize: '18px', fontWeight: 700, color: '#dfe2f3' }}>CareerSync</span> */}
          </div>

          {/* Tab switcher */}
          <div style={{ ...s.card, padding: '4px', display: 'flex', marginBottom: '28px' }}>
            {['login', 'register'].map((t) => (
              <button
                key={t}
                id={`tab-${t}`}
                onClick={() => setTab(t)}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: 'none', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s', background: tab === t ? 'linear-gradient(135deg,#3b82f6,#6366f1)' : 'transparent', color: tab === t ? 'white' : '#8c909f' }}
              >
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* Title */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#dfe2f3', marginBottom: '4px' }}>
              {tab === 'login' ? 'Welcome back' : 'Get started today'}
            </h2>
            <p style={{ fontSize: '13px', color: '#8c909f' }}>
              {tab === 'login' ? 'Sign in to your CareerSync AI account' : 'Create your free account — no credit card required'}
            </p>
          </div>

          {/* Google */}
          <button id="btn-google-auth" style={s.btnGoogle}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '18px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#424754' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {tab === 'register' && (
              <div>
                <label style={s.label}>Full Name</label>
                <input id="input-name" type="text" placeholder="Alex Johnson" required style={s.inputField} />
              </div>
            )}
            <div>
              <label style={s.label}>Email Address</label>
              <input id="input-email" type="email" placeholder="alex@company.com" required style={s.inputField} />
            </div>
            <div>
              <label style={s.label}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="input-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  style={{ ...s.inputField, paddingRight: '40px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#8c909f', display: 'flex', padding: 0 }}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {tab === 'register' && (
              <div>
                <label style={s.label}>Confirm Password</label>
                <input id="input-confirm-password" type="password" placeholder="••••••••" required style={s.inputField} />
              </div>
            )}
            {tab === 'login' && (
              <div style={{ textAlign: 'right' }}>
                <a href="#" style={{ fontSize: '12px', color: '#60a5fa', textDecoration: 'none' }}>Forgot password?</a>
              </div>
            )}
            <button id="btn-submit-auth" type="submit" style={{ ...s.btnPrimary, marginTop: '4px' }}>
              {tab === 'login' ? 'Sign In to CareerSync' : 'Create Free Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '12px', color: '#8c909f', marginTop: '20px' }}>
            {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
              style={{ color: '#60a5fa', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '12px', fontFamily: 'Inter, sans-serif' }}
            >
              {tab === 'login' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
