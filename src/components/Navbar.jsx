import { useState } from 'react'
import { Search, PlaySquare } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    navigate(`/?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-white font-bold">
          <PlaySquare className="w-6 h-6 text-red-500" />
          <span className="hidden sm:block">BlueTube</span>
        </Link>
        <form onSubmit={onSubmit} className="flex-1 flex items-center">
          <div className="w-full max-w-2xl mx-auto flex items-center bg-slate-800/70 border border-slate-700 rounded-full overflow-hidden">
            <input
              className="flex-1 bg-transparent px-4 py-2 text-slate-100 placeholder-slate-400 outline-none"
              placeholder="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button type="submit" className="px-4 py-2 text-slate-300 hover:text-white">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
        <Link to="/upload" className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md">Upload</Link>
      </div>
    </header>
  )
}
