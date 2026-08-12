import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { t, fontMono } from '../theme/tokens'

const navGroups = [
  {
    label: 'Resume',
    items: [
      {
        path: '/resume',
        label: 'Resume',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        ),
      },
      {
        path: '/resume/history',
        label: 'History',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        ),
      },
    ],
  },
  {
    label: 'Analyser',
    items: [
      {
        path: '/analyser',
        label: 'Analyser',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        ),
      },
      {
        path: '/analyser/history',
        label: 'History',
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        ),
      },
    ],
  },
]

export default function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const hideHeaderTools = ['/resume', '/resume/history', '/analyser', '/analyser/history'].includes(location.pathname)

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: t.bg, overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', flexShrink: 0, display: 'flex', flexDirection: 'column', borderRight: `1px solid ${t.steelBorder}`, backgroundColor: t.deepCoal }}>
        {/* Logo */}
        <div style={{ height: '64px', display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: `1px solid ${t.steelBorder}` }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: t.onSurface, letterSpacing: '-0.3px' }}>CareerSync</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
          {navGroups.map((group, gi) => (
            <div key={group.label} style={{ marginBottom: gi < navGroups.length - 1 ? '8px' : 0 }}>
              <p style={{ padding: '0 12px', marginBottom: '6px', marginTop: gi > 0 ? '14px' : 0, fontSize: '10px', ...fontMono, textTransform: 'uppercase', letterSpacing: '2px', color: t.graphite }}>
                {group.label}
              </p>
              {gi > 0 && <div style={{ height: '1px', background: t.steelBorder, margin: '-4px 0 10px' }} />}
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    color: isActive ? t.primaryCont : t.ash,
                    backgroundColor: isActive ? 'rgba(103,152,255,0.1)' : 'transparent',
                    marginBottom: '2px',
                    transition: 'all 0.15s',
                    position: 'relative',
                  })}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '3px', height: '60%', background: t.primaryCont, borderRadius: '0 2px 2px 0' }} />
                      )}
                      {item.icon}
                      {item.label}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Sign out */}
        <div style={{ padding: '12px', borderTop: `1px solid ${t.steelBorder}` }}>
          <button
            onClick={() => navigate('/login')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', color: t.ash, background: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.15s' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <header style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: `1px solid ${t.steelBorder}`, backgroundColor: t.bg, flexShrink: 0 }}>
          {!hideHeaderTools && (
            <div style={{ position: 'relative' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.fog} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                placeholder="Search..."
                style={{ background: t.deepCoal, border: `1px solid ${t.steelBorder}`, color: t.onSurface, outline: 'none', padding: '8px 14px 8px 34px', borderRadius: '8px', fontSize: '13px', width: '220px', fontFamily: 'Inter, sans-serif' }}
              />
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto' }}>
            {!hideHeaderTools && (
              <button style={{ position: 'relative', padding: '8px', borderRadius: '8px', color: t.fog, background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span style={{ position: 'absolute', top: '6px', right: '6px', width: '6px', height: '6px', background: t.primaryCont, borderRadius: '50%' }} />
              </button>
            )}
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: t.graphite, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '13px', fontWeight: 600 }}>
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
