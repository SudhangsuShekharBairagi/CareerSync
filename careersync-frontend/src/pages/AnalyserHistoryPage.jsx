import { useEffect, useState } from 'react'
import { getResumeHistory, getResumeAnalysisById } from '../api/AnaysisApi'
import { t, fontInter, fontMono, s } from '../theme/tokens'

function ScoreRing({ score }) {
  const color = score >= 80 ? '#4ade80' : score >= 60 ? '#fbbf24' : '#f87171'
  const radius = 22
  const circ = 2 * Math.PI * radius
  const dash = (score / 100) * circ
  return (
    <div style={{ position: 'relative', width: '60px', height: '60px', flexShrink: 0 }}>
      <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="30" cy="30" r={radius} fill="none" stroke={t.deepCoal} strokeWidth="5" />
        <circle cx="30" cy="30" r={radius} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color }}>{score}%</span>
      </div>
    </div>
  )
}

function SkillBadge({ label, variant = 'blue' }) {
  const colors = {
    blue: { bg: t.deepCoal, border: t.steelBorder, color: t.primaryLight },
    purple: { bg: t.deepCoal, border: t.steelBorder, color: '#c084fc' },
    green: { bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.2)', color: '#86efac' },
    red: { bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)', color: '#fca5a5' },
    orange: { bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)', color: '#fcd34d' },
  }
  const c = colors[variant]
  return (
    <span style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color, fontSize: '12px', padding: '4px 12px', borderRadius: '6px', fontWeight: 500 }}>
      {label}
    </span>
  )
}

function ExpandedAnalysis({ data, onClose }) {
  const { candidateName, candidateSummary, technicalSkills = [], softSkills = [], strengths = [], weaknesses = [], missingKeywords = [], recommendedJobs = [], atsScore } = data

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', animation: 'fadeInUp 0.4s ease forwards' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: t.onSurface, margin: 0 }}>Resume Analysis — #{data.id}</h2>
        <button onClick={onClose} style={{ background: 'transparent', color: t.fog, border: `1px solid ${t.steelBorder}`, padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', ...fontInter }}>
          Close
        </button>
      </div>

      <div style={{ ...s.card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '10px', ...fontMono, textTransform: 'uppercase', letterSpacing: '2px', color: t.primaryCont, marginBottom: '4px' }}>CANDIDATE</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: t.onSurface }}>{candidateName}</div>
        </div>
        <ScoreRing score={atsScore} />
      </div>

      <div style={s.card}>
        <div style={{ fontSize: '10px', ...fontMono, textTransform: 'uppercase', letterSpacing: '2px', color: t.primaryCont, marginBottom: '10px' }}>SUMMARY</div>
        <p style={{ fontSize: '13px', color: t.ash, lineHeight: 1.75, margin: 0 }}>{candidateSummary}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div style={s.card}>
          <div style={{ fontSize: '10px', ...fontMono, textTransform: 'uppercase', letterSpacing: '2px', color: t.primaryLight, marginBottom: '10px' }}>TECHNICAL SKILLS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{technicalSkills.map((sk) => <SkillBadge key={sk} label={sk} variant="purple" />)}</div>
        </div>
        <div style={s.card}>
          <div style={{ fontSize: '10px', ...fontMono, textTransform: 'uppercase', letterSpacing: '2px', color: t.primaryCont, marginBottom: '10px' }}>SOFT SKILLS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{softSkills.map((sk) => <SkillBadge key={sk} label={sk} variant="blue" />)}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div style={s.card}>
          <div style={{ fontSize: '10px', ...fontMono, textTransform: 'uppercase', letterSpacing: '2px', color: '#fcd34d', marginBottom: '10px' }}>AREAS TO IMPROVE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{weaknesses.map((w) => <SkillBadge key={w} label={w} variant="orange" />)}</div>
        </div>
        <div style={s.card}>
          <div style={{ fontSize: '10px', ...fontMono, textTransform: 'uppercase', letterSpacing: '2px', color: '#fca5a5', marginBottom: '6px' }}>MISSING KEYWORDS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{missingKeywords.map((kw) => <SkillBadge key={kw} label={kw} variant="red" />)}</div>
        </div>
      </div>

      {strengths.length > 0 && (
        <div style={s.card}>
          <div style={{ fontSize: '10px', ...fontMono, textTransform: 'uppercase', letterSpacing: '2px', color: '#4ade80', marginBottom: '10px' }}>STRENGTHS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {strengths.map((st, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '8px 12px', background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: '8px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12" /></svg>
                <span style={{ fontSize: '13px', color: t.ash }}>{st}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {recommendedJobs.length > 0 && (
        <div style={s.card}>
          <div style={{ fontSize: '10px', ...fontMono, textTransform: 'uppercase', letterSpacing: '2px', color: t.primaryLight, marginBottom: '12px' }}>RECOMMENDED JOBS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '8px' }}>
            {recommendedJobs.map((job, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: t.deepCoal, border: `1px solid ${t.steelBorder}`, borderRadius: '8px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={t.primaryCont} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>
                <span style={{ fontSize: '12px', color: t.ash, fontWeight: 500 }}>{job}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  )
}

export default function AnalyserHistoryPage() {
  const [resumes, setResumes] = useState([])
  const [selectedAnalysis, setSelectedAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getResumeHistory()
        setResumes(data)
      } catch (err) {
        console.error(err)
        setError('Unable to load your resume history.')
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  const handleViewAnalysis = async (resumeId) => {
    try {
      setAnalysisLoading(true)
      setError(null)
      const data = await getResumeAnalysisById(resumeId)
      setSelectedAnalysis(data)
      setTimeout(() => document.getElementById('resume-analysis')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (err) {
      console.error(err)
      setError('Unable to load resume analysis.')
    } finally {
      setAnalysisLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: '12px' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={t.primaryCont} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
        <span style={{ fontSize: '13px', color: t.fog }}>Loading history…</span>
        <style>{`@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ ...fontInter, display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: t.onSurface, margin: '0 0 6px' }}>Analyser History</h1>
        <p style={{ fontSize: '13px', color: t.fog, margin: 0 }}>All your previously analysed resumes at one place — click any card to view the full report.</p>
      </div>

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '8px', color: '#fca5a5', fontSize: '13px' }}>
          {error}
        </div>
      )}

      {resumes.length === 0 ? (
        <div style={{ ...s.card, textAlign: 'center', padding: '60px 24px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: t.deepCoal, border: `1px solid ${t.steelBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={t.fog} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          </div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: t.onSurface, marginBottom: '6px' }}>No analyses yet</div>
          <div style={{ fontSize: '13px', color: t.fog }}>Upload and analyse your first resume to see it here.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {resumes.map((resume) => {
            const scoreColor = resume.atsScore >= 80 ? '#4ade80' : resume.atsScore >= 60 ? '#fbbf24' : '#f87171'
            return (
              <div key={resume.id} style={{ ...s.card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', padding: '16px 20px', transition: 'border-color 0.15s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: t.deepCoal, border: `1px solid ${t.steelBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.primaryCont} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: t.onSurface, marginBottom: '3px' }}>
                      {resume.candidateName || `Resume #${resume.id}`}
                    </div>
                    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '12px', color: t.fog, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                        {resume.createdAt ? new Date(resume.createdAt).toLocaleDateString() : 'Unknown date'}
                      </span>
                      <span style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', color: scoreColor, fontWeight: 600 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                        ATS: {resume.atsScore}%
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleViewAnalysis(resume.id)}
                  disabled={analysisLoading}
                  style={{
                    background: analysisLoading ? t.deepCoal : '#fff',
                    color: analysisLoading ? t.fog : t.bg,
                    border: analysisLoading ? `1px solid ${t.steelBorder}` : 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: analysisLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    ...fontInter,
                    flexShrink: 0,
                  }}
                >
                  {analysisLoading ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                      Loading…
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      View Analysis
                    </>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      )}

      {selectedAnalysis && (
        <div id="resume-analysis">
          <ExpandedAnalysis data={selectedAnalysis} onClose={() => setSelectedAnalysis(null)} />
        </div>
      )}

      <style>{`@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`}</style>
    </div>
  )
}
