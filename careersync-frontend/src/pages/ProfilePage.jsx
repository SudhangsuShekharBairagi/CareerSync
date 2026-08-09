import { useState } from 'react'

const s = {
  card: { background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '20px' },
  input: { background: '#0a0e1a', border: '1px solid rgba(255,255,255,0.1)', color: '#dfe2f3', outline: 'none', padding: '9px 12px', borderRadius: '8px', fontSize: '13px', width: '100%', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', transition: 'border 0.2s' },
  label: { display: 'block', fontSize: '11px', color: '#c2c6d6', marginBottom: '5px' },
}

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
    <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: '860px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#dfe2f3', margin: 0 }}>Profile</h1>
          <p style={{ fontSize: '13px', color: '#8c909f', marginTop: '4px' }}>Manage your career profile and settings</p>
        </div>
        <button
          id="btn-edit-profile"
          onClick={() => setEditing(!editing)}
          style={{ background: editing ? 'linear-gradient(135deg,#3b82f6,#6366f1)' : 'transparent', color: '#dfe2f3', border: editing ? 'none' : '1px solid rgba(255,255,255,0.15)', padding: '9px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
        >
          {editing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile card */}
      <div style={s.card}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: '84px', height: '84px', borderRadius: '16px', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 700, color: 'white', boxShadow: '0 0 16px rgba(59,130,246,0.25)' }}>
              AJ
            </div>
            {editing && (
              <button style={{ position: 'absolute', bottom: '-8px', right: '-8px', width: '26px', height: '26px', borderRadius: '50%', background: '#1b1f2c', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#8c909f' }}>
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
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#dfe2f3', margin: '0 0 3px' }}>{name}</h2>
                <p style={{ fontSize: '13px', color: '#60a5fa', margin: '0 0 6px' }}>{title}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#8c909f' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {location}
                </div>
              </>
            )}

            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              {['Open to Work', 'Remote OK', 'Senior Level'].map((badge) => (
                <span key={badge} style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.22)', color: '#93c5fd', fontSize: '10px', fontFamily: "'JetBrains Mono',monospace", padding: '3px 9px', borderRadius: '999px', letterSpacing: '0.4px' }}>{badge}</span>
              ))}
            </div>
          </div>

          {/* Score */}
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#60a5fa' }}>87</div>
            <div style={{ fontSize: '11px', color: '#8c909f' }}>Resume Score</div>
          </div>
        </div>

        {/* Bio */}
        <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <label style={s.label}>Bio</label>
          {editing ? (
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} style={{ ...s.input, resize: 'none', lineHeight: 1.6 }} />
          ) : (
            <p style={{ fontSize: '13px', color: '#c2c6d6', lineHeight: 1.65, margin: 0 }}>{bio}</p>
          )}
        </div>
      </div>

      {/* Skills + Contact */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Skills */}
        <div style={s.card}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#dfe2f3', margin: '0 0 14px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {skills.map((sk) => (
              <span key={sk} style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#93c5fd', fontSize: '11px', fontFamily: "'JetBrains Mono',monospace", padding: '4px 10px', borderRadius: '999px' }}>{sk}</span>
            ))}
            {editing && (
              <button style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '999px', border: '1px dashed rgba(255,255,255,0.12)', color: '#424754', background: 'transparent', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>+ Add skill</button>
            )}
          </div>
        </div>

        {/* Contact */}
        <div style={s.card}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#dfe2f3', margin: '0 0 14px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Contact & Links</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {contactLinks.map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '16px', flexShrink: 0, width: '20px', textAlign: 'center' }}>{item.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '9px', fontFamily: "'JetBrains Mono',monospace", color: '#424754', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px' }}>{item.label}</div>
                  {editing ? (
                    <input defaultValue={item.value} style={{ ...s.input, padding: '5px 8px', fontSize: '12px' }} />
                  ) : (
                    <div style={{ fontSize: '12px', color: '#c2c6d6' }}>{item.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Career History */}
      <div style={s.card}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#dfe2f3', margin: '0 0 18px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Career History</h3>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '16px', top: '6px', bottom: '6px', width: '1px', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {careerHistory.map((item) => (
              <div key={item.role} style={{ display: 'flex', gap: '20px', paddingLeft: '38px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '11px', top: '5px', width: '11px', height: '11px', borderRadius: '50%', background: '#1b1f2c', border: '2px solid #3b82f6' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#dfe2f3' }}>{item.role}</div>
                      <div style={{ fontSize: '12px', color: '#60a5fa' }}>{item.company}</div>
                    </div>
                    <span style={{ fontSize: '11px', fontFamily: "'JetBrains Mono',monospace", color: '#424754', flexShrink: 0 }}>{item.period}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#8c909f', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
