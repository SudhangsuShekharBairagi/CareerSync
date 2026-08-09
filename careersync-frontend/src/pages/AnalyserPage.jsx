import { useState } from 'react'
import { uploadResume } from '../api/AnaysisApi'
import CandidateAnalysis from '../components/CandidateAnalysis'

const s = {
  card: {
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    padding: '24px',
  },
}

function FileIcon({ type }) {
  if (type === 'application/pdf') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    )
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function ScoreRing({ score }) {
  const color = score >= 80 ? '#4ade80' : score >= 60 ? '#fbbf24' : '#f87171'
  const radius = 36
  const circ = 2 * Math.PI * radius
  const dash = (score / 100) * circ
  return (
    <div style={{ position: 'relative', width: '96px', height: '96px', flexShrink: 0 }}>
      <svg width="96" height="96" viewBox="0 0 96 96" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="48" cy="48" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle cx="48" cy="48" r={radius} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s ease' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '20px', fontWeight: 800, color, lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: '9px', color: '#8c909f', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '1px' }}>ATS</span>
      </div>
    </div>
  )
}

function SkillBadge({ label, variant = 'blue' }) {
  const colors = {
    blue: { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)', color: '#93c5fd' },
    purple: { bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)', color: '#a5b4fc' },
    green: { bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.2)', color: '#86efac' },
    red: { bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)', color: '#fca5a5' },
    orange: { bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)', color: '#fcd34d' },
  }
  const c = colors[variant]
  return (
    <span style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color, fontSize: '12px', padding: '4px 12px', borderRadius: '20px', fontWeight: 500 }}>
      {label}
    </span>
  )
}

function AnalysisResult({ data }) {
  const { candidateName, candidateSummary, technicalSkills = [], softSkills = [], strengths = [], weaknesses = [], missingKeywords = [], recommendedJobs = [], atsScore } = data
  const scoreColor = atsScore >= 80 ? '#4ade80' : atsScore >= 60 ? '#fbbf24' : '#f87171'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeInUp 0.5s ease forwards' }}>
      {/* Header card */}
      <div style={{ ...s.card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '2px', color: '#3b82f6', marginBottom: '6px' }}>CANDIDATE</div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#dfe2f3', margin: 0 }}>{candidateName}</h2>
          <p style={{ fontSize: '13px', color: '#8c909f', marginTop: '4px' }}>Resume Analysis Report</p>
        </div>
        <ScoreRing score={atsScore} />
      </div>

      {/* Summary */}
      <div style={s.card}>
        <div style={{ fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '2px', color: '#3b82f6', marginBottom: '10px' }}>SUMMARY</div>
        <p style={{ fontSize: '13.5px', color: '#c2c6d6', lineHeight: 1.75, margin: 0 }}>{candidateSummary}</p>
      </div>

      {/* Skills row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={s.card}>
          <div style={{ fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '2px', color: '#a5b4fc', marginBottom: '12px' }}>TECHNICAL SKILLS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {technicalSkills.map((sk) => <SkillBadge key={sk} label={sk} variant="purple" />)}
          </div>
        </div>
        <div style={s.card}>
          <div style={{ fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '2px', color: '#93c5fd', marginBottom: '12px' }}>SOFT SKILLS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {softSkills.map((sk) => <SkillBadge key={sk} label={sk} variant="blue" />)}
          </div>
        </div>
      </div>

      {/* Strengths */}
      <div style={s.card}>
        <div style={{ fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '2px', color: '#4ade80', marginBottom: '12px' }}>STRENGTHS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {strengths.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 12px', background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.1)', borderRadius: '8px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}><polyline points="20 6 9 17 4 12" /></svg>
              <span style={{ fontSize: '13px', color: '#c2c6d6', lineHeight: 1.6 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weaknesses & Missing Keywords */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={s.card}>
          <div style={{ fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '2px', color: '#fcd34d', marginBottom: '12px' }}>AREAS TO IMPROVE</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {weaknesses.map((w) => <SkillBadge key={w} label={w} variant="orange" />)}
          </div>
        </div>
        <div style={s.card}>
          <div style={{ fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '2px', color: '#fca5a5', marginBottom: '8px' }}>MISSING KEYWORDS</div>
          <p style={{ fontSize: '11px', color: '#8c909f', marginBottom: '10px' }}>Add these to improve your ATS score</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {missingKeywords.map((kw) => <SkillBadge key={kw} label={kw} variant="red" />)}
          </div>
        </div>
      </div>

      {/* Recommended Jobs */}
      <div style={s.card}>
        <div style={{ fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '2px', color: '#a5b4fc', marginBottom: '14px' }}>RECOMMENDED JOBS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
          {recommendedJobs.map((job, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '10px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>
              <span style={{ fontSize: '13px', color: '#c2c6d6', fontWeight: 500 }}>{job}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  )
}

export default function AnalyserPage() {
  const [file, setFile] = useState(null)
  const [analysisData, setAnalysisData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = (f) => {
    if (!f) return
    setFile(f)
    setError(null)
    setAnalysisData(null)
  }

  const handleFileUpload = (e) => handleFileSelect(e.target.files[0])

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files[0])
  }

  const handleGetAnalysis = async () => {
    if (!file) { setError('Please upload your resume first.'); return }
    try {
      setLoading(true)
      setError(null)
      const data = await uploadResume(file)
      setAnalysisData(data)
    } catch (err) {
      console.error(err)
      setError('Failed to analyze resume. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => { setFile(null); setAnalysisData(null); setError(null) }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#dfe2f3', margin: '0 0 6px' }}>Resume Analyser</h1>
        <p style={{ fontSize: '13px', color: '#8c909f', margin: 0 }}>Upload your resume and get an ATS score, skill breakdown, and personalised career insights.</p>
      </div>

      {/* Upload card — hidden once analysis is shown */}
      {!analysisData && (
        <div style={s.card}>
          {/* Drop zone */}
          <label
            htmlFor="analyser-upload"
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            style={{
              display: 'block',
              cursor: 'pointer',
              border: `2px dashed ${dragOver ? '#3b82f6' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '12px',
              padding: '40px 24px',
              textAlign: 'center',
              background: dragOver ? 'rgba(59,130,246,0.06)' : 'transparent',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#dfe2f3', marginBottom: '4px' }}>
              {file ? file.name : 'Drop your resume here'}
            </div>
            <div style={{ fontSize: '12px', color: '#8c909f' }}>
              {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Click to browse · PDF, DOC, DOCX supported'}
            </div>
            <input id="analyser-upload" type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>

          {/* File chip */}
          {file && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '14px', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
              <div style={{ color: '#3b82f6', flexShrink: 0 }}><FileIcon type={file.type} /></div>
              <span style={{ fontSize: '13px', color: '#c2c6d6', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
          )}

          {/* Analyse button */}
          <button
            onClick={handleGetAnalysis}
            disabled={loading || !file}
            style={{
              width: '100%',
              marginTop: '18px',
              background: file && !loading ? 'linear-gradient(135deg,#3b82f6,#6366f1)' : 'rgba(255,255,255,0.06)',
              color: file && !loading ? 'white' : '#424754',
              border: 'none',
              padding: '13px 20px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: file && !loading ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontFamily: 'Inter, sans-serif',
              boxShadow: file && !loading ? '0 4px 20px rgba(59,130,246,0.25)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {loading ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                Analysing Resume…
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                Analyse Resume
              </>
            )}
          </button>

          {/* Progress steps */}
          {loading && (
            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {['Parsing document', 'Extracting skills', 'Scoring ATS', 'Generating insights'].map((step, i) => (
                  <span key={step} style={{ fontSize: '11px', color: '#8c909f', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: `spin 1s linear ${i * 0.2}s infinite` }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                    {step}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '8px', color: '#fca5a5', fontSize: '13px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              {error}
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {analysisData && !loading && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
              <span style={{ fontSize: '13px', color: '#4ade80', fontWeight: 500 }}>Analysis complete</span>
            </div>
            <button
              onClick={handleReset}
              style={{ background: 'transparent', color: '#8c909f', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
              Analyse Another
            </button>
          </div>
          <AnalysisResult data={analysisData} />
        </>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
