import { useState } from 'react'

const s = {
  card: { background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '18px' },
  page: { fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: '20px' },
}

const initialJobs = {
  saved: [
    { id: 1, company: 'OpenAI', role: 'Frontend Engineer', salary: '$180k–$240k', tags: ['React', 'TypeScript'] },
    { id: 2, company: 'Anthropic', role: 'Product Engineer', salary: '$200k–$280k', tags: ['Next.js', 'AI'] },
    { id: 3, company: 'Figma', role: 'UI Engineer', salary: '$160k–$210k', tags: ['React', 'CSS'] },
  ],
  applied: [
    { id: 4, company: 'Vercel', role: 'Product Engineer', salary: '$170k–$220k', tags: ['Next.js', 'Edge'], date: 'Applied Aug 4' },
    { id: 5, company: 'Linear', role: 'Full Stack Dev', salary: '$150k–$200k', tags: ['React', 'Node'], date: 'Applied Aug 3' },
  ],
  interviewing: [
    { id: 6, company: 'Stripe', role: 'Senior Frontend', salary: '$200k–$260k', tags: ['React', 'TypeScript'], date: 'Interview: Aug 9' },
    { id: 7, company: 'Notion', role: 'Software Engineer', salary: '$160k–$220k', tags: ['React', 'Python'], date: 'Interview: Aug 12' },
  ],
  offer: [
    { id: 8, company: 'Figma', role: 'UI Engineer', salary: '$175k + equity', tags: ['CSS', 'Web APIs'], date: 'Expires Aug 15' },
  ],
}

const columns = [
  { key: 'saved', label: 'Saved', color: '#a78bfa', dotColor: '#a78bfa', tagBg: 'rgba(167,139,250,0.12)', tagBorder: 'rgba(167,139,250,0.25)', tagColor: '#c4b5fd' },
  { key: 'applied', label: 'Applied', color: '#60a5fa', dotColor: '#60a5fa', tagBg: 'rgba(59,130,246,0.12)', tagBorder: 'rgba(59,130,246,0.25)', tagColor: '#93c5fd' },
  { key: 'interviewing', label: 'Interviewing', color: '#fcd34d', dotColor: '#fbbf24', tagBg: 'rgba(245,158,11,0.12)', tagBorder: 'rgba(245,158,11,0.25)', tagColor: '#fcd34d' },
  { key: 'offer', label: 'Offer', color: '#86efac', dotColor: '#4ade80', tagBg: 'rgba(74,222,128,0.12)', tagBorder: 'rgba(74,222,128,0.25)', tagColor: '#86efac' },
]

function JobCard({ job, col }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', cursor: 'grab' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#dfe2f3' }}>
          {job.company[0]}
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#424754" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
          <circle cx="12" cy="5" r="1" fill="#424754" /><circle cx="12" cy="12" r="1" fill="#424754" /><circle cx="12" cy="19" r="1" fill="#424754" />
        </svg>
      </div>
      <div style={{ fontSize: '13px', fontWeight: 600, color: '#dfe2f3', marginBottom: '2px' }}>{job.company}</div>
      <div style={{ fontSize: '11px', color: '#8c909f', marginBottom: job.date ? '8px' : '10px' }}>{job.role}</div>
      {job.date && (
        <div style={{ fontSize: '10px', fontFamily: "'JetBrains Mono',monospace", color: col.color, marginBottom: '10px' }}>{job.date}</div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
        {job.tags.map((tag) => (
          <span key={tag} style={{ background: col.tagBg, border: `1px solid ${col.tagBorder}`, color: col.tagColor, fontSize: '10px', fontFamily: "'JetBrains Mono',monospace", padding: '2px 7px', borderRadius: '4px' }}>
            {tag}
          </span>
        ))}
      </div>
      <div style={{ paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '11px', color: '#8c909f' }}>{job.salary}</div>
    </div>
  )
}

export default function JobTracker() {
  const [jobs] = useState(initialJobs)
  const [showModal, setShowModal] = useState(false)

  const total = Object.values(jobs).flat().length

  return (
    <div style={s.page}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#dfe2f3', margin: 0 }}>Job Tracker</h1>
          <p style={{ fontSize: '13px', color: '#8c909f', marginTop: '4px' }}>{total} applications tracked across all stages</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8c909f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="search" placeholder="Search jobs..." style={{ background: '#0a0e1a', border: '1px solid rgba(255,255,255,0.1)', color: '#dfe2f3', outline: 'none', padding: '9px 14px 9px 32px', borderRadius: '8px', fontSize: '13px', width: '180px', fontFamily: 'Inter, sans-serif' }} />
          </div>
          <button id="btn-add-job" onClick={() => setShowModal(true)} style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)', color: 'white', border: 'none', padding: '9px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Job
          </button>
        </div>
      </div>

      {/* Kanban */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', alignItems: 'start' }}>
        {columns.map((col) => (
          <div key={col.key} style={{ background: '#0a0e1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '14px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.dotColor, flexShrink: 0 }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: col.color }}>{col.label}</span>
              </div>
              <span style={{ fontSize: '11px', fontFamily: "'JetBrains Mono',monospace", color: '#424754', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '999px' }}>
                {jobs[col.key]?.length || 0}
              </span>
            </div>
            {/* Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(jobs[col.key] || []).map((job) => (
                <JobCard key={job.id} job={job} col={col} />
              ))}
            </div>
            {/* Add card btn */}
            <button style={{ width: '100%', marginTop: '10px', padding: '9px', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.08)', fontSize: '12px', color: '#424754', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontFamily: 'Inter, sans-serif' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add card
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}>
          <div style={{ background: 'rgba(26,31,44,0.95)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '400px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#dfe2f3', margin: 0 }}>Add New Application</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8c909f', display: 'flex', padding: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[{ id: 'company', label: 'Company Name', placeholder: 'e.g., Stripe', type: 'text' }, { id: 'role', label: 'Job Title', placeholder: 'e.g., Senior Frontend Engineer', type: 'text' }, { id: 'url', label: 'Job URL', placeholder: 'https://...', type: 'url' }].map((f) => (
                <div key={f.id}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#c2c6d6', marginBottom: '6px' }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} style={{ background: '#0a0e1a', border: '1px solid rgba(255,255,255,0.1)', color: '#dfe2f3', outline: 'none', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', width: '100%', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#c2c6d6', marginBottom: '6px' }}>Status</label>
                <select style={{ background: '#0a0e1a', border: '1px solid rgba(255,255,255,0.1)', color: '#dfe2f3', outline: 'none', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', width: '100%', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}>
                  <option value="saved">Saved</option>
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offer">Offer</option>
                </select>
              </div>
              <button style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginTop: '4px' }}>
                Add Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
