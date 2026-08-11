/* ──────── Centralized Design System Tokens ──────── */
export const t = {
  bg: '#0a0a0a',
  deepCoal: '#141414',
  cardCarbon: '#1e1e1e',
  steelBorder: '#313131',
  graphite: '#454545',
  fog: '#7c7c7c',
  ash: '#a7a7a7',
  onSurface: '#e5e2e1',
  primary: '#afc6ff',
  primaryCont: '#6798ff',
  primaryLight: '#afc6ff',
  surfBright: '#3a3939',
  surfCont: '#201f1f',
  surfContHigh: '#2a2a2a',
}

/* ──────── Typography Helpers ──────── */
export const fontInter = { fontFamily: "'Inter', sans-serif" }
export const fontMono = { fontFamily: "'JetBrains Mono', monospace" }

/* ──────── Centralized Shared UI Component Styles ──────── */
export const s = {
  card: {
    background: t.cardCarbon,
    border: `1px solid ${t.steelBorder}`,
    borderRadius: '12px',
    padding: '24px',
  },
  input: {
    background: t.deepCoal,
    border: `1px solid ${t.steelBorder}`,
    color: t.onSurface,
    outline: 'none',
    padding: '12px 14px',
    borderRadius: '8px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
    ...fontInter,
    transition: 'border-color 0.15s',
  },
  label: {
    display: 'block',
    fontSize: '11px',
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 600,
    color: t.ash,
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
}
