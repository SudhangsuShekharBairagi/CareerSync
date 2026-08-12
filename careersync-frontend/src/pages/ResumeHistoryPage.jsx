import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { t, fontInter, fontMono, s } from '../theme/tokens'
import {
  getResumeBuilderHistory,
  deleteResumeBuilder,
  clearResumeBuilderHistory,
} from '../api/resumeBuilderApi'

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function ResumeHistoryPage() {
  const [history, setHistory] = useState([])
  const [selected, setSelected] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false
    getResumeBuilderHistory()
      .then((list) => {
        if (cancelled) return
        setHistory((list || []).map((item) => ({ ...item, resume: item })))
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load resume history')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteResumeBuilder(id)
      setHistory((prev) => prev.filter((h) => h.id !== id))
      if (selected?.id === id) setSelected(null)
    } catch {
      setError('Failed to delete resume')
    }
    setConfirmDelete(null)
  }

  const handleClearAll = async () => {
    try {
      await clearResumeBuilderHistory()
      setHistory([])
      setSelected(null)
    } catch {
      setError('Failed to clear history')
    }
  }

  return (
    <div style={{ ...fontInter, display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: t.onSurface, margin: 0 }}>Resume History</h1>
            {history.length > 0 && (
              <span style={{ background: t.deepCoal, border: `1px solid ${t.steelBorder}`, color: t.primaryLight, fontSize: '9px', ...fontMono, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {history.length} saved
              </span>
            )}
          </div>
          <p style={{ fontSize: '13px', color: t.fog, margin: 0 }}>All your previously generated resumes at one place — click any card to preview.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {history.length > 0 && (
            <button
              id="btn-clear-all-history"
              onClick={handleClearAll}
              style={{ background: 'transparent', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', ...fontInter, display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" />
              </svg>
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div style={{ background: 'rgba(255, 77, 79, 0.1)', border: '1px solid rgba(255, 77, 79, 0.4)', borderRadius: '8px', padding: '10px 12px', fontSize: '12px', color: '#ff6b6b' }}>
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ ...s.card, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 24px' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '1px', color: t.fog }}>LOADING...</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && history.length === 0 && (
        <div style={{ ...s.card, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 24px', textAlign: 'center', gap: '16px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: t.deepCoal, border: `1px solid ${t.steelBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={t.fog} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: t.onSurface, marginBottom: '6px' }}>No resumes yet</div>
            <div style={{ fontSize: '13px', color: t.fog, maxWidth: '280px', lineHeight: 1.6 }}>Generate your first AI-powered resume</div>
          </div>
          <button
            onClick={() => navigate('/resume')}
            style={{ marginTop: '8px', background: '#fff', color: t.bg, border: 'none', padding: '10px 22px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', ...fontInter, display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            Generate Resume
          </button>
        </div>
      )}

      {/* List + Preview layout */}
      {!loading && history.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '340px 1fr' : '1fr', gap: '18px', alignItems: 'start' }}>
          {/* History list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelected(selected?.id === item.id ? null : item)}
                style={{
                  ...s.card,
                  cursor: 'pointer',
                  border: `1px solid ${selected?.id === item.id ? t.primaryCont : t.steelBorder}`,
                  background: selected?.id === item.id ? t.deepCoal : t.cardCarbon,
                  transition: 'all 0.18s',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  {/* Icon */}
                  <div style={{ width: '36px', height: '36px', flexShrink: 0, borderRadius: '8px', background: t.deepCoal, border: `1px solid ${t.steelBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={selected?.id === item.id ? t.primaryCont : t.fog} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: t.onSurface, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.resume?.name || 'Resume'}</span>
                      <span style={{ fontSize: '10px', ...fontMono, color: t.fog, flexShrink: 0 }}>{timeAgo(item.createdAt)}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: t.ash, margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.description || 'No description'}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '12px', justifyContent: 'flex-end' }}>
                  <button
                    id={`btn-download-${item.id}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{ background: t.deepCoal, border: `1px solid ${t.steelBorder}`, color: t.ash, padding: '5px 10px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', ...fontInter }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    PDF
                  </button>
                  {confirmDelete === item.id ? (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(item.id) }}
                        style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', padding: '5px 10px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', ...fontInter }}
                      >Confirm</button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setConfirmDelete(null) }}
                        style={{ background: 'transparent', border: `1px solid ${t.steelBorder}`, color: t.fog, padding: '5px 10px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', ...fontInter }}
                      >Cancel</button>
                    </>
                  ) : (
                    <button
                      id={`btn-delete-${item.id}`}
                      onClick={(e) => { e.stopPropagation(); setConfirmDelete(item.id) }}
                      style={{ background: 'transparent', border: `1px solid ${t.steelBorder}`, color: t.fog, padding: '5px 10px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', ...fontInter }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Preview panel */}
          {selected && (
            <div style={{ ...s.card, padding: '32px', background: t.cardCarbon, position: 'sticky', top: '24px', animation: 'fadeInRight 0.25s ease forwards' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '11px', ...fontMono, textTransform: 'uppercase', letterSpacing: '1.5px', color: t.fog }}>Preview</span>
                <button onClick={() => setSelected(null)} style={{ background: 'transparent', border: 'none', color: t.fog, cursor: 'pointer', padding: '4px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>

              {/* Resume data */}
              {selected.resume && (
                <>
                  <div style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: `1px solid ${t.steelBorder}` }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 800, color: t.onSurface, margin: '0 0 2px', letterSpacing: '-0.3px' }}>{selected.resume.name}</h2>
                    <div style={{ fontSize: '13px', color: t.primaryCont, fontWeight: 600, marginBottom: '10px' }}>{selected.resume.title}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {Object.entries(selected.resume.contact || {}).map(([k, v]) => (
                        <span key={k} style={{ fontSize: '11px', color: t.fog, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: t.primaryCont }} />{v}
                        </span>
                      ))}
                    </div>
                  </div>

                  <PreviewSection title="Summary">
                    <p style={{ fontSize: '12px', color: t.ash, lineHeight: 1.65, margin: 0 }}>{selected.resume.summary}</p>
                  </PreviewSection>

                  <PreviewSection title="Experience">
                    {(selected.resume.experience || []).map((exp) => (
                      <div key={exp.company} style={{ marginBottom: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: t.onSurface }}>{exp.role}</span>
                          <span style={{ fontSize: '10px', ...fontMono, color: t.fog }}>{exp.period}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: t.primaryCont, fontWeight: 600, marginBottom: '6px' }}>{exp.company}</div>
                        <ul style={{ margin: 0, paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {exp.bullets.map((b) => (
                            <li key={b} style={{ fontSize: '11.5px', color: t.ash, lineHeight: 1.55 }}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </PreviewSection>

                  <PreviewSection title="Skills">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {(selected.resume.skills || []).map((sk) => (
                        <span key={sk} style={{ background: t.deepCoal, border: `1px solid ${t.steelBorder}`, color: t.primaryLight, fontSize: '11px', padding: '3px 10px', borderRadius: '6px' }}>{sk}</span>
                      ))}
                    </div>
                  </PreviewSection>

                  {selected.resume.education && (
                    <PreviewSection title="Education" last>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: t.onSurface }}>{selected.resume.education.degree}</div>
                          <div style={{ fontSize: '11px', color: t.primaryCont, fontWeight: 600 }}>{selected.resume.education.school}</div>
                        </div>
                        <span style={{ fontSize: '10px', ...fontMono, color: t.fog }}>{selected.resume.education.year}</span>
                      </div>
                    </PreviewSection>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  )
}

function PreviewSection({ title, children, last }) {
  return (
    <div style={{ marginBottom: last ? 0 : '18px', paddingBottom: last ? 0 : '18px', borderBottom: last ? 'none' : `1px solid ${t.steelBorder}` }}>
      <h4 style={{ fontSize: '9px', ...fontMono, textTransform: 'uppercase', letterSpacing: '2px', color: t.primaryCont, margin: '0 0 10px', fontWeight: 600 }}>{title}</h4>
      {children}
    </div>
  )
}
