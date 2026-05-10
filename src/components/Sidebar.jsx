import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { posts } from '../data/posts.js'

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const recent = posts.slice(0, 5)
  return (
    <aside className="lg:col-span-4 space-y-10">
      <section>
        <h3 className="font-serif text-xl mb-3">Search</h3>
        <div className="h-px bg-black mb-4" />
        <form className="relative" onSubmit={handleSearch}>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full border border-neutral-300 px-4 py-3 pr-12 text-sm focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-white p-2 hover:bg-orange-700"
          >
            <Search size={14} />
          </button>
        </form>
      </section>

      <section>
        <h3 className="font-serif text-xl mb-3">Recent Posts</h3>
        <div className="h-px bg-black mb-4" />
        <ul className="space-y-5">
          {recent.map((p) => (
            <li 
              key={p.id} 
              className="flex gap-4 group cursor-pointer"
              onClick={() => navigate(`/post/${p.slug || p.id}`)}
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-20 h-20 object-cover flex-shrink-0 grayscale group-hover:grayscale-0 transition"
              />
              <div className="flex-1">
                <p className="text-[10px] tracking-[0.2em] uppercase text-accent mb-1">{p.category}</p>
                <h4 className="font-serif text-base leading-snug group-hover:text-accent">
                  {p.title}
                </h4>
                <p className="text-xs text-neutral-500 mt-1">{p.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="border border-black p-6">
        <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-2">Newsletter</p>
        <h3 className="font-serif text-2xl leading-tight mb-3">The Weekly Dispatch</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Verified reporting on AI and robotics, delivered every Sunday.
        </p>
        <button className="w-full bg-accent text-white text-xs tracking-[0.25em] uppercase py-3 hover:bg-orange-700">
          Subscribe
        </button>
      </section>
    </aside>
  )
}
