import { Outlet, NavLink } from 'react-router-dom'
import { Twitter, Github, Rss } from 'lucide-react'

const navClass = ({ isActive }) =>
  `tracking-[0.2em] text-xs font-medium uppercase pb-1 border-b-2 ${
    isActive ? 'border-accent text-black' : 'border-transparent text-neutral-700 hover:text-accent'
  }`

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-6 text-center">
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-3">
            Vol. IV — Established 2024
          </p>
          <h1 className="font-serif font-black text-5xl md:text-7xl tracking-tight text-black">
            TECH <span className="text-accent">PULSE</span>
          </h1>
          <p className="mt-3 text-xs md:text-sm tracking-[0.35em] uppercase text-neutral-600">
            Authentic Insights into AI &amp; Robotics
          </p>
        </div>
        <nav className="border-t border-neutral-200">
          <ul className="max-w-6xl mx-auto px-6 flex justify-center gap-10 py-4">
            <li><NavLink to="/" end className={navClass}>Home</NavLink></li>
            <li><NavLink to="/about" className={navClass}>About Us</NavLink></li>
            <li><NavLink to="/newest" className={navClass}>Newest Blogs</NavLink></li>
          </ul>
        </nav>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10 md:py-14">
        <Outlet />
      </main>

      <footer className="border-t border-neutral-200 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif text-lg">TECH <span className="text-accent">PULSE</span></p>
          <p className="text-xs tracking-[0.25em] uppercase text-neutral-500">
            © 2026 Tech Pulse Editorial — All Rights Reserved
          </p>
          <div className="flex items-center gap-3 text-neutral-700">
            <a href="#" aria-label="Twitter" className="hover:text-accent"><Twitter size={16} /></a>
            <a href="#" aria-label="Github" className="hover:text-accent"><Github size={16} /></a>
            <a href="#" aria-label="RSS" className="hover:text-accent"><Rss size={16} /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
