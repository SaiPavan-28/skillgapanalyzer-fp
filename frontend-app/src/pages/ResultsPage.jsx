import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  CheckCircle, XCircle, AlertTriangle, ArrowLeft,
  RotateCcw, ChevronRight, Clock, BookOpen, Target, AlertCircle, Sparkles, Briefcase,
  DollarSign, ExternalLink, TrendingUp
} from 'lucide-react'

// ----- Circular Score Chart -----
function ScoreRing({ score }) {
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const color = score >= 70 ? '#34d399' : score >= 45 ? '#fbbf24' : '#f87171'
  const label = score >= 70 ? 'Excellent Match' : score >= 45 ? 'Good Match' : 'Needs Work'

  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="180" className="-rotate-90">
        {/* Background ring */}
        <circle cx="90" cy="90" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
        {/* Score ring */}
        <circle
          cx="90" cy="90" r={radius} fill="none"
          stroke={color} strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          style={{
            transition: 'stroke-dashoffset 1.5s ease-out',
            strokeDashoffset: offset,
          }}
          ref={(el) => {
            if (el) {
              setTimeout(() => {
                el.style.strokeDashoffset = offset
              }, 100)
            }
          }}
        />
      </svg>
      <div className="-mt-28 text-center">
        <div className="text-5xl font-black" style={{ color }}>{score}%</div>
        <div className="text-slate-400 text-sm mt-1">{label}</div>
      </div>
      <div className="mt-10" />
    </div>
  )
}

// ----- Skill Pill -----
function SkillPill({ skill, type }) {
  const classes = {
    matched: 'skill-matched',
    missing: 'skill-missing',
    neutral: 'skill-neutral',
  }
  return (
    <span className={`skill-pill ${classes[type]}`}>
      {type === 'matched' && <CheckCircle size={11} />}
      {type === 'missing' && <XCircle size={11} />}
      {skill}
    </span>
  )
}

// ----- Feedback Card -----
function FeedbackCard({ items }) {
  return (
    <div className="space-y-3">
      {items.map((msg, i) => (
        <div key={i} className="flex items-start gap-3 p-4 glass rounded-xl border border-white/5 fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
          <div className="text-lg flex-shrink-0">{msg.charAt(0)}</div>
          <p className="text-slate-300 text-sm leading-relaxed">{msg.slice(2)}</p>
        </div>
      ))}
    </div>
  )
}

// ----- Roadmap Timeline -----
function RoadmapTimeline({ items }) {
  return (
    <div className="space-y-0">
      {items.map((item, i) => (
        <div key={i} className="relative flex gap-6 pb-8 timeline-item fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
          {/* Icon circle */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-base shadow-lg shadow-purple-500/20 z-10">
            {item.icon}
          </div>
          {/* Content */}
          <div className="flex-1 glass rounded-xl p-5 border border-white/5 card-hover">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={11} />
                {item.week}
              </span>
            </div>
            <h4 className="font-bold text-white mb-2">{item.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">{item.description}</p>
            {item.resources && (
              <div className="flex items-center gap-2 text-xs text-blue-400">
                <BookOpen size={12} />
                <span>{item.resources}</span>
              </div>
            )}
            {item.skills && item.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {item.skills.map((s) => (
                  <span key={s} className="skill-pill skill-neutral">{s}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// ----- Resume Issues -----
function ResumeIssues({ issues }) {
  const severityConfig = {
    high: { icon: <AlertCircle size={16} />, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
    medium: { icon: <AlertTriangle size={16} />, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' },
    low: { icon: <AlertTriangle size={16} />, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
    good: { icon: <CheckCircle size={16} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
  }

  return (
    <div className="space-y-3">
      {issues.map((issue, i) => {
        const cfg = severityConfig[issue.severity] || severityConfig.medium
        return (
          <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${cfg.bg} fade-in-up`} style={{ animationDelay: `${i * 0.08}s` }}>
            <span className={cfg.color}>{cfg.icon}</span>
            <p className={`text-sm ${cfg.color}`}>{issue.message}</p>
          </div>
        )
      })}
    </div>
  )
}

// ----- Job Card -----
function JobCard({ job, index }) {
  const scoreColor = job.matchScore >= 70 ? '#34d399' : job.matchScore >= 45 ? '#fbbf24' : '#f87171'
  const levelColors = {
    'Junior-Mid': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Mid': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Mid-Senior': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Senior': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  }
  const levelColor = levelColors[job.experienceLevel] || levelColors['Mid']

  return (
    <div
      className="glass rounded-2xl p-6 border border-white/5 card-hover fade-in-up flex flex-col gap-4"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-white text-lg leading-tight">{job.title}</h3>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed">{job.description}</p>
        </div>
        <div className="flex-shrink-0 text-center">
          <div className="text-2xl font-black" style={{ color: scoreColor }}>{job.matchScore}%</div>
          <div className="text-xs text-slate-500">match</div>
        </div>
      </div>

      {/* Match bar */}
      <div className="w-full bg-white/5 rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full transition-all duration-700"
          style={{ width: `${job.matchScore}%`, background: `linear-gradient(to right, ${scoreColor}88, ${scoreColor})` }}
        />
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${levelColor}`}>
          {job.experienceLevel}
        </span>
        <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
          <DollarSign size={11} />{job.salaryRange}
        </span>
      </div>

      {/* Skills */}
      <div>
        <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Your matched skills</p>
        <div className="flex flex-wrap gap-1.5">
          {job.yourMatchedSkills.slice(0, 5).map((s) => (
            <span key={s} className="skill-pill skill-matched text-xs">{s}</span>
          ))}
          {job.missingSkills.slice(0, 3).map((s) => (
            <span key={s} className="skill-pill skill-missing text-xs">{s}</span>
          ))}
          {(job.yourMatchedSkills.length > 5 || job.missingSkills.length > 3) && (
            <span className="skill-pill skill-neutral text-xs">+more</span>
          )}
        </div>
      </div>

      {/* Apply button */}
      <a
        href={job.applyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
          bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/30
          text-purple-300 text-sm font-semibold hover:from-purple-600/50 hover:to-blue-600/50
          hover:border-purple-400/50 hover:text-white transition-all duration-200 group"
      >
        Apply on LinkedIn
        <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  )
}

// ----- Jobs Panel -----
function JobsPanel({ jobs }) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <Briefcase size={40} className="text-slate-600 mx-auto mb-3" />
        <p className="text-slate-400 font-semibold">No strong job matches found</p>
        <p className="text-slate-600 text-sm mt-1">Add more skills to your resume to unlock job recommendations.</p>
      </div>
    )
  }
  return (
    <div>
      <div className="flex items-center gap-2 mb-5 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <TrendingUp size={15} className="text-blue-400 flex-shrink-0" />
        <p className="text-blue-300 text-xs">Jobs are matched based on skills detected in your resume. Green pills = skills you have · Red pills = skills to gain.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {jobs.map((job, i) => (
          <JobCard key={job.title} job={job} index={i} />
        ))}
      </div>
    </div>
  )
}

// ----- Section Header -----
function SectionHeader({ icon, title, subtitle, color = 'text-purple-400' }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className={`${color}`}>{icon}</div>
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
    </div>
  )
}

// ----- Main Results Page -----
export default function ResultsPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('feedback')

  useEffect(() => {
    if (!state?.results) navigate('/dashboard')
  }, [state, navigate])

  if (!state?.results) return null

  const { results, fileName } = state
  const { score, matched_skills, missing_skills, feedback, roadmap, resume_issues, job_recommendations } = results

  const tabs = [
    { id: 'feedback', label: 'AI Feedback', icon: <Sparkles size={15} /> },
    { id: 'roadmap', label: 'Roadmap', icon: <Target size={15} /> },
    { id: 'issues', label: 'Resume Issues', icon: <AlertTriangle size={15} /> },
    { id: 'jobs', label: 'Suitable Jobs', icon: <Briefcase size={15} /> },
  ]

  return (
    <div className="min-h-screen py-10 px-6 relative">
      {/* BG Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Back button + header */}
        <div className="flex items-center justify-between mb-8 fade-in-up">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back</span>
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm text-slate-400 hover:text-white border border-white/10 hover:border-purple-500/30 transition-all"
          >
            <RotateCcw size={15} />
            New Analysis
          </button>
        </div>

        <div className="text-center mb-10 fade-in-up">
          <h1 className="text-4xl font-black mb-2">
            Analysis <span className="gradient-text">Results</span>
          </h1>
          <p className="text-slate-500 text-sm">
            {fileName} · {matched_skills.length + missing_skills.length} skills detected
          </p>
        </div>

        {/* TOP ROW: Score + Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Score Card */}
          <div className="glass rounded-2xl p-8 border border-white/5 flex flex-col items-center card-hover fade-in-up">
            <SectionHeader
              icon={<Target size={20} />}
              title="Match Score"
              subtitle="vs. job description"
              color="text-purple-400"
            />
            <ScoreRing score={score} />
            <div className="w-full mt-2 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Matched skills</span>
                <span className="text-emerald-400 font-semibold">{matched_skills.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Missing skills</span>
                <span className="text-red-400 font-semibold">{missing_skills.length}</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 mt-3">
                <div
                  className="h-2 rounded-full transition-all duration-1000"
                  style={{
                    width: `${score}%`,
                    background: `linear-gradient(to right, #7c3aed, #2563eb)`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Skills Comparison */}
          <div className="lg:col-span-2 glass rounded-2xl p-6 border border-white/5 fade-in-up" style={{ animationDelay: '0.1s' }}>
            <SectionHeader
              icon={<CheckCircle size={20} />}
              title="Skills Comparison"
              subtitle="Your skills vs. required skills"
              color="text-blue-400"
            />
            
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-400">Matched ({matched_skills.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {matched_skills.length > 0 ? matched_skills.map((s) => (
                    <SkillPill key={s} skill={s} type="matched" />
                  )) : (
                    <span className="text-slate-500 text-sm italic">No matching skills detected</span>
                  )}
                </div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-sm font-semibold text-red-400">Missing ({missing_skills.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {missing_skills.length > 0 ? missing_skills.map((s) => (
                    <SkillPill key={s} skill={s} type="missing" />
                  )) : (
                    <span className="text-emerald-400 text-sm">🎉 You have all the required skills!</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TAB SECTION */}
        <div className="glass rounded-2xl border border-white/5 overflow-hidden fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Tab Bar */}
          <div className="flex border-b border-white/10">
            {tabs.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all duration-200
                  ${activeTab === id
                    ? 'text-purple-300 border-b-2 border-purple-500 bg-purple-500/10'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                  }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'feedback' && (
              <div>
                <p className="text-slate-400 text-sm mb-5">
                  AI-generated insights based on your skill profile and the job requirements.
                </p>
                <FeedbackCard items={feedback} />
              </div>
            )}

            {activeTab === 'roadmap' && (
              <div>
                <p className="text-slate-400 text-sm mb-6">
                  Your personalized {roadmap.length}-week learning plan to close the skill gaps.
                </p>
                <RoadmapTimeline items={roadmap} />
              </div>
            )}

            {activeTab === 'issues' && (
              <div>
                <p className="text-slate-400 text-sm mb-5">
                  Resume quality checks — fix these to improve your application strength.
                </p>
                <ResumeIssues issues={resume_issues} />
              </div>
            )}

            {activeTab === 'jobs' && (
              <div>
                <p className="text-slate-400 text-sm mb-5">
                  Top {job_recommendations?.length || 0} job roles that match your current skill set.
                </p>
                <JobsPanel jobs={job_recommendations} />
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => navigate('/dashboard')}
            className="group px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-2xl shadow-purple-500/30 flex items-center gap-2 mx-auto"
          >
            Analyze Another Resume
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}
