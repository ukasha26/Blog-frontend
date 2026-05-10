import { Clock } from 'lucide-react'
import { posts } from '../data/posts.js'
import Sidebar from '../components/Sidebar.jsx'

export default function Newest() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <section className="lg:col-span-8">
        <p className="text-[10px] tracking-[0.4em] uppercase text-accent mb-2">Fresh off the desk</p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">Newest Blogs</h2>
        <div className="h-px bg-black mb-10" />

        <div className="grid sm:grid-cols-2 gap-10">
          {posts.map((p) => (
            <article key={p.id} className="group cursor-pointer">
              <img src={p.image} alt={p.title} className="w-full h-56 object-cover mb-4 grayscale group-hover:grayscale-0 transition" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-2">{p.category}</p>
              <h3 className="font-serif text-2xl leading-snug mb-2 group-hover:text-accent">{p.title}</h3>
              <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{p.excerpt}</p>
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                <span>{p.date}</span>
                <span className="flex items-center gap-1"><Clock size={11} />{p.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Sidebar />
    </div>
  )
}
