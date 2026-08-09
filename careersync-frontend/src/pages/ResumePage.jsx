import { useState } from 'react'

const s = {
  card: {
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '14px',
    padding: '24px',
  },
}

const placeholderDesc = `Senior Frontend Engineer at Stripe — 5 years of experience building scalable React applications. Proficient in TypeScript, Next.js, GraphQL, and design systems. Led a team of 4 engineers to redesign the merchant dashboard, reducing load time by 42%. Strong background in accessibility, performance optimization, and CI/CD pipelines.`

const sampleResume = {
  name: 'Alex Rivera',
  title: 'Senior Frontend Engineer',
  contact: { email: 'alex@email.com', phone: '+1 (555) 123-4567', location: 'San Francisco, CA', linkedin: 'linkedin.com/in/alexrivera' },
  summary: 'Results-driven Senior Frontend Engineer with 5+ years of experience building high-performance web applications at scale. Proven track record of leading engineering teams and delivering impactful features at fintech companies.',
  experience: [
    {
      role: 'Senior Frontend Engineer',
      company: 'Stripe',
      period: 'Jan 2021 – Present',
      bullets: [
        'Led a team of 4 engineers to redesign the merchant dashboard, reducing average load time by 42%',
        'Architected a shared React component library used across 6 product teams, cutting UI dev time by 30%',
        'Implemented end-to-end TypeScript migration for a 80k LOC codebase, eliminating 95% of runtime type errors',
      ],
    },
    {
      role: 'Frontend Engineer',
      company: 'Robinhood',
      period: 'Jun 2019 – Dec 2020',
      bullets: [
        'Built real-time stock trading UI with WebSockets and React, handling 50k concurrent users',
        'Improved Lighthouse performance score from 62 to 94 through lazy loading and code splitting',
      ],
    },
  ],
  skills: ['React', 'Next.js', 'TypeScript', 'GraphQL', 'Node.js', 'CI/CD', 'Figma', 'Accessibility (WCAG)'],
  education: { degree: 'B.S. Computer Science', school: 'UC Berkeley', year: '2019' },
}

function Section({ title, children, last }) {
  return (
    <div style={{ marginBottom: last ? 0 : '24px', paddingBottom: last ? 0 : '24px', borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
      <h3 style={{ fontSize: '10px', fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '2px', color: '#3b82f6', margin: '0 0 14px', fontWeight: 600 }}>{title}</h3>
      {children}
    </div>
  )
}

export default function ResumePage() {
  const [description, setDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const [charFocus, setCharFocus] = useState(false)

  const handleGenerate = () => {
    if (!description.trim()) return
    setIsGenerating(true)
    setProgress(0)
    setGenerated(false)

    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 18 + 5
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => {
          setIsGenerating(false)
          setGenerated(true)
          const history = JSON.parse(localStorage.getItem('resumeHistory') || '[]')
          history.unshift({
            id: Date.now(),
            createdAt: new Date().toISOString(),
            description: description.trim().slice(0, 120),
            resume: sampleResume,
          })
          localStorage.setItem('resumeHistory', JSON.stringify(history.slice(0, 20)))
        }, 300)
      }
      setProgress(Math.min(p, 100))
    }, 200)
  }

  const handleCopy = () => {
    const text = `${sampleResume.name} — ${sampleResume.title}\n\n${sampleResume.summary}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setGenerated(false)
    setDescription('')
    setProgress(0)
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          {/* <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div> */}
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#dfe2f3', margin: 0 }}>Build your resume with AI</h1>
        </div>
        <p style={{ fontSize: '13px', color: '#8c909f', margin: 0 }}>Describe yourself and your experience — our AI crafts a polished, ATS-optimized resume in seconds.</p>
      </div>

      {/* Input section */}
      {!generated && (
        <div style={s.card}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#c2c6d6', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            Your Description
          </label>
          <div style={{ position: 'relative' }}>
            <textarea
              id="resume-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={() => setCharFocus(true)}
              onBlur={() => setCharFocus(false)}
              placeholder={placeholderDesc}
              rows={8}
              style={{
                width: '100%',
                background: '#0a0e1a',
                border: `1px solid ${charFocus ? '#3b82f6' : 'rgba(255,255,255,0.1)'}`,
                boxShadow: charFocus ? '0 0 0 3px rgba(59,130,246,0.15)' : 'none',
                color: '#dfe2f3',
                outline: 'none',
                padding: '14px',
                borderRadius: '10px',
                fontSize: '13.5px',
                lineHeight: 1.65,
                fontFamily: 'Inter, sans-serif',
                resize: 'vertical',
                boxSizing: 'border-box',
                transition: 'border 0.2s, box-shadow 0.2s',
              }}
            />
            <span style={{ position: 'absolute', bottom: '10px', right: '12px', fontSize: '11px', color: description.length > 1800 ? '#f87171' : '#424754', fontFamily: "'JetBrains Mono', monospace" }}>
              {description.length}/2000
            </span>
          </div>

          {/* Tips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
            {['Include years of experience', 'Mention key technologies', 'List notable achievements', 'Specify target role'].map((tip) => (
              <span key={tip} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#8c909f', fontSize: '11px', padding: '4px 10px', borderRadius: '20px' }}>
                💡 {tip}
              </span>
            ))}
          </div>

          {/* Generate button */}
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              id="btn-generate-resume"
              onClick={handleGenerate}
              disabled={!description.trim() || isGenerating}
              style={{
                background: description.trim() && !isGenerating ? 'linear-gradient(135deg,#3b82f6,#6366f1)' : 'rgba(255,255,255,0.06)',
                color: description.trim() && !isGenerating ? 'white' : '#424754',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '9px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: description.trim() && !isGenerating ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s',
                boxShadow: description.trim() && !isGenerating ? '0 4px 20px rgba(59,130,246,0.25)' : 'none',
              }}
            >
              {isGenerating ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Generating…
                </>
              ) : (
                <>
                    {/* <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg> */}
                  Generate Resume
                </>
              )}
            </button>
            {/* {description.trim() && !isGenerating && (
              <span style={{ fontSize: '12px', color: '#8c909f' }}>Takes ~3 seconds</span>
            )} */}
          </div>

          {/* Progress bar */}
          {isGenerating && (
            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', color: '#8c909f' }}>Crafting your resume…</span>
                <span style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", color: '#3b82f6' }}>{Math.round(progress)}%</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg,#3b82f6,#6366f1)', borderRadius: '999px', width: `${progress}%`, transition: 'width 0.2s ease' }} />
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '10px', flexWrap: 'wrap' }}>
                {['Parsing experience', 'Extracting skills', 'Optimizing for ATS', 'Formatting layout'].map((step, i) => (
                  <span key={step} style={{ fontSize: '11px', color: progress > i * 25 ? '#4ade80' : '#424754', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {progress > i * 25 ? '✓' : '○'} {step}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Generated resume */}
      {generated && (
        <div style={{ animation: 'fadeInUp 0.5s ease forwards' }}>
          {/* Actions bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
              <span style={{ fontSize: '13px', color: '#4ade80', fontWeight: 500 }}>Resume generated successfully</span>
              <span style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', color: '#4ade80', fontSize: '9px', fontFamily: "'JetBrains Mono', monospace", padding: '2px 7px', borderRadius: '4px' }}>SAVED TO HISTORY</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button id="btn-copy-resume" onClick={handleCopy} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: copied ? '#4ade80' : '#c2c6d6', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s' }}>
                {copied ? (
                  <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>Copied!</>
                ) : (
                  <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>Copy</>
                )}
              </button>
              <button id="btn-download-resume" style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                Download PDF
              </button>
              <button id="btn-new-resume" onClick={handleReset} style={{ background: 'transparent', color: '#8c909f', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>
                New
              </button>
            </div>
          </div>

          {/* Resume preview card */}
          <div style={{ ...s.card, padding: '40px', maxWidth: '780px', margin: '0 auto', background: 'rgba(255,255,255,0.02)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(59,130,246,0.06)', filter: 'blur(60px)', pointerEvents: 'none' }} />

            {/* Name & contact */}
            <div style={{ marginBottom: '28px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#dfe2f3', margin: '0 0 4px', letterSpacing: '-0.5px' }}>{sampleResume.name}</h2>
              <div style={{ fontSize: '15px', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 600, marginBottom: '12px' }}>{sampleResume.title}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {Object.entries(sampleResume.contact).map(([k, v]) => (
                  <span key={k} style={{ fontSize: '12px', color: '#8c909f', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3b82f6' }} />
                    {v}
                  </span>
                ))}
              </div>
            </div>

            <Section title="Professional Summary">
              <p style={{ fontSize: '13px', color: '#c2c6d6', lineHeight: 1.7, margin: 0 }}>{sampleResume.summary}</p>
            </Section>

            <Section title="Experience">
              {sampleResume.experience.map((exp) => (
                <div key={exp.company} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#dfe2f3' }}>{exp.role}</span>
                    <span style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", color: '#8c909f' }}>{exp.period}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 600, marginBottom: '8px' }}>{exp.company}</div>
                  <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {exp.bullets.map((b) => (
                      <li key={b} style={{ fontSize: '12.5px', color: '#c2c6d6', lineHeight: 1.6 }}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>

            <Section title="Skills">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {sampleResume.skills.map((sk) => (
                  <span key={sk} style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#93c5fd', fontSize: '12px', padding: '4px 12px', borderRadius: '20px', fontWeight: 500 }}>{sk}</span>
                ))}
              </div>
            </Section>

            <Section title="Education" last>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#dfe2f3' }}>{sampleResume.education.degree}</div>
                  <div style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 600 }}>{sampleResume.education.school}</div>
                </div>
                <span style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", color: '#8c909f' }}>{sampleResume.education.year}</span>
              </div>
            </Section>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}
