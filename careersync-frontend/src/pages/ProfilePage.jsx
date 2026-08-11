import { useState } from 'react'
import { t, fontInter, fontMono, s } from '../theme/tokens'

const careerHistory = [
  { role: 'Senior Frontend Engineer', company: 'Stripe', period: '2024 – Present', desc: 'Led frontend architecture for payment dashboard. Improved performance by 40% using code-splitting and lazy loading.' },
  { role: 'Frontend Developer', company: 'Vercel', period: '2022 – 2024', desc: 'Built and maintained core framework tooling. Contributed to Next.js App Router implementation.' },
  { role: 'Junior Developer', company: 'Startup', period: '2020 – 2022', desc: 'Built React applications from scratch. Worked on authentication, dashboards, and APIs.' },
]

const skills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GraphQL', 'PostgreSQL', 'AWS', 'Docker', 'Figma']

const contactLinks = [
  { emoji: '✉', label: 'Email', value: 'alex@email.com' },
  { emoji: '🔗', label: 'LinkedIn', value: 'linkedin.com/in/alexj' },
  { emoji: '🐙', label: 'GitHub', value: 'github.com/alexj' },
  { emoji: '🌐', label: 'Portfolio', value: 'alexjohnson.dev' },
]

export default function ProfilePage() {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState('Alex Johnson')
  const [title, setTitle] = useState('Senior Frontend Engineer')
  const [bio, setBio] = useState('Passionate frontend engineer with 6+ years building scalable web applications. Focused on performance, DX, and modern React patterns.')
  const [location, setLocation] = useState('San Francisco, CA')

  return (
    <div style={{ ...fontInter, maxWidth: '860px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: t.onSurface, margin: 0 }}>Profile</h1>
          <p style={{ fontSize: '13px', color: t.fog, marginTop: '4px' }}>Manage your career profile and settings</p>
        </div>
        <button
          id="btn-edit-profile"
          onClick={() => setEditing(!editing)}
          style={{ background: editing ? '#fff' : 'transparent', color: editing ? t.bg : t.onSurface, border: editing ? 'none' : `1px solid ${t.steelBorder}`, padding: '9px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', ...fontInter }}
        >
          {editing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile card */}
      <div style={s.card}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: '84px', height: '84px', borderRadius: '12px', background: t.graphite, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 700, color: '#fff' }}>
              AJ
            </div>
            {editing && (
              <button style={{ position: 'absolute', bottom: '-8px', right: '-8px', width: '26px', height: '26px', borderRadius: '50%', background: t.deepCoal, border: `1px solid ${t.steelBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: t.fog }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            )}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: '200px' }}>
            {editing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input value={name} onChange={(e) => setName(e.target.value)} style={{ ...s.input, fontSize: '15px', fontWeight: 700 }} />
                <input value={title} onChange={(e) => setTitle(e.target.value)} style={s.input} />
                <input value={location} onChange={(e) => setLocation(e.target.value)} style={s.input} />
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: t.onSurface, margin: '0 0 3px' }}>{name}</h2>
                <p style={{ fontSize: '13px', color: t.primaryCont, margin: '0 0 6px' }}>{title}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: t.fog }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {location}
                </div>
              </>
            )}

            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              {['Open to Work', 'Remote OK', 'Senior Level'].map((badge) => (
                <span key={badge} style={{ background: t.deepCoal, border: `1px solid ${t.steelBorder}`, color: t.primaryLight, fontSize: '10px', ...fontMono, padding: '3px 9px', borderRadius: '6px', letterSpacing: '0.4px' }}>{badge}</span>
              ))}
            </div>
          </div>

          {/* Score */}
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: t.primaryCont }}>87</div>
            <div style={{ fontSize: '11px', color: t.fog }}>Resume Score</div>
          </div>
        </div>

        {/* Bio */}
        <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: `1px solid ${t.steelBorder}` }}>
          <label style={s.label}>Bio</label>
          {editing ? (
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} style={{ ...s.input, resize: 'none', lineHeight: 1.6 }} />
          ) : (
            <p style={{ fontSize: '13px', color: t.ash, lineHeight: 1.65, margin: 0 }}>{bio}</p>
          )}
        </div>
      </div>

      {/* Skills + Contact */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Skills */}
        <div style={s.card}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: t.onSurface, margin: '0 0 14px', paddingBottom: '12px', borderBottom: `1px solid ${t.steelBorder}` }}>Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {skills.map((sk) => (
              <span key={sk} style={{ background: t.deepCoal, border: `1px solid ${t.steelBorder}`, color: t.primaryLight, fontSize: '11px', ...fontMono, padding: '4px 10px', borderRadius: '6px' }}>{sk}</span>
            ))}
            {editing && (
              <button style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '6px', border: `1px dashed ${t.steelBorder}`, color: t.fog, background: 'transparent', cursor: 'pointer', ...fontInter }}>+ Add skill</button>
            )}
          </div>
        </div>

        {/* Contact */}
        <div style={s.card}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: t.onSurface, margin: '0 0 14px', paddingBottom: '12px', borderBottom: `1px solid ${t.steelBorder}` }}>Contact & Links</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {contactLinks.map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px', flexShrink: 0, width: '20px', textAlign: 'center' }}>{item.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '9px', ...fontMono, color: t.fog, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px' }}>{item.label}</div>
                  {editing ? (
                    <input defaultValue={item.value} style={{ ...s.input, padding: '5px 8px', fontSize: '12px' }} />
                  ) : (
                    <div style={{ fontSize: '12px', color: t.ash }}>{item.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Career History */}
      <div style={s.card}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: t.onSurface, margin: '0 0 18px', paddingBottom: '12px', borderBottom: `1px solid ${t.steelBorder}` }}>Career History</h3>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '16px', top: '6px', bottom: '6px', width: '1px', background: t.steelBorder }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {careerHistory.map((item) => (
              <div key={item.role} style={{ display: 'flex', gap: '20px', paddingLeft: '38px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '11px', top: '5px', width: '11px', height: '11px', borderRadius: '50%', background: t.deepCoal, border: `2px solid ${t.primaryCont}` }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: t.onSurface }}>{item.role}</div>
                      <div style={{ fontSize: '12px', color: t.primaryCont }}>{item.company}</div>
                    </div>
                    <span style={{ fontSize: '11px', ...fontMono, color: t.fog, flexShrink: 0 }}>{item.period}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: t.fog, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
