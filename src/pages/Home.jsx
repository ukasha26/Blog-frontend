import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, User, ArrowRight, Loader2 } from 'lucide-react'
import { client, urlFor } from '../lib/sanityClient' // Sanity client import
import Sidebar from '../components/Sidebar.jsx'

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Sanity se data fetch karne ka logic
  useEffect(() => {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      "author": author->name,
      "category": categories[0]->title,
      "date": publishedAt,
      excerpt,
      "bodyText": pt::text(body),
      "readTime": estimatedReadingTime
    }`;

    client.fetch(query)
      .then((data) => {
        setPosts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sanity Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="font-serif italic text-lg">Fetching Latest Journals...</p>
      </div>
    );
  }

  // Pehla blog featured ban jayega, baaki list mein jayenge
  const [featured, ...rest] = posts;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <section className="lg:col-span-8">
        
        {/* ── FEATURED POST ── */}
        {featured ? (
          <article 
            className="mb-12 group cursor-pointer"
            onClick={() => navigate(`/post/${featured.slug?.current || featured._id}`)}
          >
            {featured.mainImage && (
              <div className="overflow-hidden mb-6">
                <img 
                  src={urlFor(featured.mainImage).width(1200).url()} 
                  alt={featured.title} 
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
            )}
            <p className="text-[10px] tracking-[0.3em] uppercase text-orange-600 font-bold mb-3">
              {featured.category || "Tech"} — Featured
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-4 group-hover:text-orange-600 transition-colors">
              {featured.title}
            </h2>
            <div className="flex items-center gap-5 text-xs uppercase tracking-[0.2em] text-neutral-500 mb-5">
              <span className="flex items-center gap-1.5"><User size={12} /> {featured.author || "Admin"}</span>
              <span>{featured.date ? new Date(featured.date).toLocaleDateString() : 'No date'}</span>
              <span className="flex items-center gap-1.5"><Clock size={12} /> {featured.readTime || '5'} min read</span>
            </div>
            <p className="text-lg text-neutral-700 leading-relaxed mb-5">
              {featured.excerpt || (featured.bodyText ? featured.bodyText.substring(0, 300) + '...' : '')}
            </p>
          </article>
        ) : (
          <p className="text-center py-20 font-serif italic">No posts found in Sanity.</p>
        )}

        {/* ── LATEST STORIES LIST ── */}
        <div className="border-t border-black pt-6">
          <h3 className="font-serif text-2xl mb-8 font-bold">Latest Stories</h3>
          <div className="space-y-10">
            {rest.map((p) => (
              <article 
                key={p._id} 
                className="grid grid-cols-12 gap-6 group cursor-pointer"
                onClick={() => navigate(`/post/${p.slug?.current || p._id}`)}
              >
                <div className="col-span-5 sm:col-span-4 h-40 overflow-hidden">
                  <img 
                    src={p.mainImage ? urlFor(p.mainImage).width(400).url() : 'https://via.placeholder.com/400'} 
                    alt={p.title} 
                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition duration-500" 
                  />
                </div>
                <div className="col-span-7 sm:col-span-8">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-orange-600 font-bold mb-2">{p.category || "General"}</p>
                  <h4 className="font-serif text-2xl leading-snug mb-2 group-hover:text-orange-600 transition-colors font-bold">{p.title}</h4>
                  <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                    {p.excerpt || (p.bodyText ? p.bodyText.substring(0, 150) + '...' : '')}
                  </p>
                  <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                    <span>{p.author || "Admin"}</span>
                    <span>{p.date ? new Date(p.date).toLocaleDateString() : 'No date'}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{p.readTime || '5'}m</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Sidebar />
    </div>
  )
}