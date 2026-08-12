import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { t, fontInter, fontMono, s } from '../theme/tokens'

export default function AuthPage({ mode = 'login' }) {
  const [tab, setTab] = useState(mode)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/resume')
  }

  const isLogin = tab === 'login'

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: t.bg, ...fontInter,
      backgroundImage: `linear-gradient(${t.cardCarbon} 1px, transparent 1px), linear-gradient(90deg, ${t.cardCarbon} 1px, transparent 1px)`,
      backgroundSize: '40px 40px', backgroundPosition: 'center top',
      padding: '40px 24px',
    }}>

      {/* ── Centred auth card ── */}
      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 10 }}>

        {/* Logo / home link */}
        <Link to="/" style={{
          display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none',
          justifyContent: 'center', marginBottom: 32,
        }}>
          <span style={{ ...fontInter, fontSize: 24, fontWeight: 600, letterSpacing: '-0.5px', color: t.onSurface }}>
            CareerSync
          </span>
        </Link>

        {/* Card shell */}
        <div style={s.card}>

          {/* Tab switcher */}
          <div style={{
            display: 'flex', background: t.deepCoal, borderRadius: 8,
            border: `1px solid ${t.steelBorder}`, padding: 3, marginBottom: 28,
          }}>
            {['login', 'register'].map((v) => (
              <button
                key={v}
                id={`tab-${v}`}
                onClick={() => setTab(v)}
                style={{
                  flex: 1, padding: '10px 0', borderRadius: 6, fontSize: 13,
                  fontWeight: 600, cursor: 'pointer', border: 'none', ...fontInter,
                  transition: 'all 0.15s',
                  background: tab === v ? '#fff' : 'transparent',
                  color: tab === v ? t.bg : t.fog,
                }}
              >
                {v === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ ...fontInter, fontSize: 22, fontWeight: 600, color: t.onSurface, letterSpacing: '-0.5px', marginBottom: 4 }}>
              {isLogin ? 'Welcome back' : 'Get started today'}
            </h2>
            <p style={{ fontSize: 13, color: t.fog }}>
              {isLogin
                ? 'Sign in to your CareerSync account'
                : 'Create your free account — no credit card required'}
            </p>
          </div>

          {/* Google button */}
          <button id="btn-google-auth" style={{
            background: t.deepCoal, border: `1px solid ${t.steelBorder}`, color: t.onSurface,
            padding: '11px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500,
            cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 10, ...fontInter, transition: 'border-color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = t.graphite}
          onMouseLeave={e => e.currentTarget.style.borderColor = t.steelBorder}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
            <div style={{ flex: 1, height: 1, background: t.steelBorder }} />
            <span style={{ ...fontMono, fontSize: 11, letterSpacing: '0.85px', color: t.fog }}>or</span>
            <div style={{ flex: 1, height: 1, background: t.steelBorder }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {!isLogin && (
              <div>
                <label style={s.label}>Full Name</label>
                <input id="input-name" type="text" placeholder="Alex Johnson" required style={s.input}
                  onFocus={e => e.target.style.borderColor = t.primaryCont}
                  onBlur={e => e.target.style.borderColor = t.steelBorder}
                />
              </div>
            )}
            <div>
              <label style={s.label}>Email Address</label>
              <input id="input-email" type="email" placeholder="alex@company.com" required style={s.input}
                onFocus={e => e.target.style.borderColor = t.primaryCont}
                onBlur={e => e.target.style.borderColor = t.steelBorder}
              />
            </div>
            <div>
              <label style={s.label}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="input-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  style={{ ...s.input, paddingRight: 42 }}
                  onFocus={e => e.target.style.borderColor = t.primaryCont}
                  onBlur={e => e.target.style.borderColor = t.steelBorder}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: t.fog,
                    display: 'flex', padding: 0,
                  }}
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
            {!isLogin && (
              <div>
                <label style={s.label}>Confirm Password</label>
                <input id="input-confirm-password" type="password" placeholder="••••••••" required style={s.input}
                  onFocus={e => e.target.style.borderColor = t.primaryCont}
                  onBlur={e => e.target.style.borderColor = t.steelBorder}
                />
              </div>
            )}
            {isLogin && (
              <div style={{ textAlign: 'right' }}>
                <a href="#" style={{ fontSize: 12, color: t.primaryCont, textDecoration: 'none' }}>Forgot password?</a>
              </div>
            )}
            <button id="btn-submit-auth" type="submit" style={{
              background: '#fff', color: t.bg, border: 'none',
              padding: '13px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600,
              cursor: 'pointer', width: '100%', ...fontInter, marginTop: 4,
              transition: 'background 0.15s',
            }}>
              {isLogin ? 'Sign In to CareerSync' : 'Create Free Account'}
            </button>
          </form>

          {/* Toggle link */}
          <p style={{ textAlign: 'center', fontSize: 12, color: t.fog, marginTop: 20 }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setTab(isLogin ? 'register' : 'login')}
              style={{
                color: t.primaryCont, background: 'none', border: 'none',
                cursor: 'pointer', fontWeight: 600, fontSize: 12, ...fontInter,
              }}
            >
              {isLogin ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Footer note */}
        <p style={{
          textAlign: 'center', marginTop: 24,
          ...fontMono, fontSize: 11, letterSpacing: '0.85px', color: t.fog,
        }}>
          © 2026 CAREERSYNC
        </p>
      </div>
    </div>
  )
}
