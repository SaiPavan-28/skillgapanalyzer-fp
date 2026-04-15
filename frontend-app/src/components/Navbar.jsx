import { Link, useLocation } from 'react-router-dom'
import { BrainCircuit, LayoutDashboard, Home } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Home', icon: <Home size={16} /> },
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  ]

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/40 transition-shadow">
            <BrainCircuit size={20} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight gradient-text">CareerAI</span>
        </Link>

        <div className="flex items-center gap-2">
          {navLinks.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${location.pathname === to
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
            >
              {icon}
              {label}
            </Link>
          ))}
          <Link
            to="/dashboard"
            className="ml-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-200 shadow-lg hover:shadow-purple-500/30"
          >
            Analyze Resume →
          </Link>
        </div>
      </div>
    </nav>
  )
}
