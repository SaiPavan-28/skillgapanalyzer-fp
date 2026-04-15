import { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Upload, FileText, Briefcase, AlertCircle, ChevronRight, X, CheckCircle, Loader2
} from 'lucide-react'

const SAMPLE_JD = `We are looking for a Full Stack Developer with the following skills:

Required:
- Strong proficiency in React.js and Node.js
- Experience with REST APIs and GraphQL
- Proficiency in SQL and MongoDB databases
- Knowledge of AWS or cloud platforms (EC2, S3, Lambda)
- Experience with Docker and containerization
- Proficiency in TypeScript and JavaScript
- Git version control
- Experience with CI/CD pipelines

Nice to have:
- Kubernetes orchestration
- Redis caching
- System design experience
- Agile/Scrum methodology`

export default function DashboardPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [file, setFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped && dropped.type === 'application/pdf') {
      setFile(dropped)
      setError('')
    } else {
      setError('Please upload a PDF file.')
    }
  }, [])

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected && selected.type === 'application/pdf') {
      setFile(selected)
      setError('')
    } else {
      setError('Please upload a PDF file.')
    }
  }

  const handleAnalyze = async () => {
    if (!file) { setError('Please upload your resume PDF.'); return }
    if (jobDescription.trim().length < 50) { setError('Job description is too short. Please add more details.'); return }
    setError('')
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('resume', file)
      formData.append('jobDescription', jobDescription)
      const res = await axios.post('/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      navigate('/results', { state: { results: res.data, fileName: file.name } })
    } catch (err) {
      const msg = err.response?.data?.error || 'Analysis failed. Please check that the backend is running.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-6 relative">
      {/* background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12 fade-in-up">
          <h1 className="text-4xl font-black mb-3">
            Resume <span className="gradient-text">Analyzer</span>
          </h1>
          <p className="text-slate-400 text-lg">Upload your resume and paste a job description to begin.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
            <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <FileText size={16} className="text-purple-400" />
              Step 1: Upload Resume (PDF)
            </label>

            <div
              className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer min-h-[240px] flex flex-col items-center justify-center p-8
                ${dragActive ? 'border-purple-400 bg-purple-500/10 drop-zone-active' : 'border-white/20 hover:border-purple-500/50 hover:bg-white/5'}
                ${file ? 'border-emerald-500/50 bg-emerald-500/5' : ''}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => !file && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />

              {file ? (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <p className="text-emerald-400 font-semibold mb-1">{file.name}</p>
                  <p className="text-slate-500 text-sm">{(file.size / 1024).toFixed(1)} KB</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setFile(null) }}
                    className="mt-3 flex items-center gap-1 text-slate-500 hover:text-red-400 text-sm mx-auto transition-colors"
                  >
                    <X size={14} /> Remove
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                    <Upload size={32} className="text-purple-400" />
                  </div>
                  <p className="text-white font-semibold mb-1">Drag & drop your PDF here</p>
                  <p className="text-slate-500 text-sm mb-4">or click to browse files</p>
                  <span className="px-4 py-2 glass rounded-lg text-xs text-slate-400 border border-white/10">
                    PDF files only · Max 10MB
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* JD Section */}
          <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <Briefcase size={16} className="text-blue-400" />
              Step 2: Paste Job Description
            </label>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              rows={10}
              className="w-full glass rounded-2xl p-5 text-slate-200 placeholder-slate-600 text-sm leading-relaxed resize-none focus:outline-none focus:border-purple-500/50 border border-white/10 transition-all duration-200 hover:border-white/20 min-h-[240px]"
            />

            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-slate-600">{jobDescription.length} characters</span>
              <button
                onClick={() => setJobDescription(SAMPLE_JD)}
                className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
              >
                Use sample JD →
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 fade-in-up">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Analyze Button */}
        <div className="mt-8 text-center fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="group relative px-16 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl
              hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-2xl shadow-purple-500/30
              disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center gap-3 mx-auto"
          >
            {loading ? (
              <>
                <Loader2 size={22} className="spinner" />
                Analyzing Resume...
              </>
            ) : (
              <>
                Analyze My Resume
                <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          {loading && (
            <p className="text-slate-500 text-sm mt-3 animate-pulse">
              Extracting skills · Computing match · Generating roadmap...
            </p>
          )}
        </div>

        {/* Checklist */}
        <div className="mt-10 glass rounded-2xl p-6 border border-white/5 fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="font-semibold text-slate-300 mb-4 text-sm uppercase tracking-wider">What you'll get</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Match Score %', 'Matching Skills', 'Missing Skills',
              'AI Feedback', 'Learning Roadmap', 'Resume Issues', 'Suitable Jobs',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-slate-400 text-sm">
                <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
