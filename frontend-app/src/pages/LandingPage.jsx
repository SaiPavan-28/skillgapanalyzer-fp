import { useNavigate } from 'react-router-dom'
import { BrainCircuit, Zap, BarChart3, Map, Shield, ArrowRight, Star, CheckCircle } from 'lucide-react'

const features = [
  {
    icon: <BarChart3 size={24} />,
    title: 'Match Score',
    desc: 'Instant percentage match between your resume and any job description.',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: <Zap size={24} />,
    title: 'Skill Gap Analysis',
    desc: 'Clearly see which skills you have and which ones are missing.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: <BrainCircuit size={24} />,
    title: 'AI Feedback',
    desc: 'Human-readable explanations — not just numbers, but real insights.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: <Map size={24} />,
    title: 'Personalized Roadmap',
    desc: 'Week-by-week learning plan tailored to your exact skill gaps.',
    color: 'from-orange-500 to-amber-600',
  },
  {
    icon: <Shield size={24} />,
    title: 'Resume Quality Check',
    desc: 'Detect missing sections, weak structure, and formatting issues.',
    color: 'from-rose-500 to-pink-600',
  },
  {
    icon: <Star size={24} />,
    title: 'Instant Results',
    desc: 'No sign-up required. Upload, analyze, and get results in seconds.',
    color: 'from-yellow-500 to-orange-500',
  },
]

const steps = [
  { num: '01', title: 'Upload Resume', desc: 'Drag & drop your PDF resume' },
  { num: '02', title: 'Paste Job Description', desc: 'Copy the JD from any job posting' },
  { num: '03', title: 'Get Analysis', desc: 'Receive your personalized report' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-purple-300 border border-purple-500/30 mb-8 fade-in-up">
            <Star size={14} className="text-yellow-400" />
            AI-Powered Career Intelligence Platform
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight fade-in-up" style={{ animationDelay: '0.1s' }}>
            Land Your{' '}
            <span className="gradient-text">Dream Job</span>
            <br />
            With AI Precision
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed fade-in-up" style={{ animationDelay: '0.2s' }}>
            Analyze your resume against any job description. Get your match score,
            identify skill gaps, and receive a personalized week-by-week learning roadmap.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => navigate('/dashboard')}
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-2xl shadow-purple-500/30 flex items-center gap-3 justify-center text-lg"
            >
              Analyze My Resume
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 glass text-slate-300 font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10"
            >
              See How It Works
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16">
            {[
              { value: '95%', label: 'Match Accuracy' },
              { value: '200+', label: 'Skills Tracked' },
              { value: '< 5s', label: 'Analysis Time' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-black gradient-text">{value}</div>
                <div className="text-slate-500 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black mb-4">Everything You Need to <span className="gradient-text">Get Hired</span></h2>
            <p className="text-slate-500 text-lg">Powered by intelligent keyword matching and career domain expertise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon, title, desc, color }, i) => (
              <div
                key={title}
                className="glass rounded-2xl p-6 card-hover fade-in-up border border-white/5"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  {icon}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black mb-4">How It <span className="gradient-text">Works</span></h2>
            <p className="text-slate-500 text-lg">Three simple steps to career clarity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ num, title, desc }, i) => (
              <div key={num} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl font-black text-white mx-auto mb-4 shadow-xl shadow-purple-500/30">
                  {num}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-2xl shadow-purple-500/30 text-xl flex items-center gap-3 mx-auto"
            >
              Start Now — It's Free
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-center text-slate-600 text-sm">
        <div className="flex items-center justify-center gap-2">
          <BrainCircuit size={16} className="text-purple-500" />
          <span>CareerAI — AI Career Assistant &copy; 2026</span>
        </div>
      </footer>
    </div>
  )
}
