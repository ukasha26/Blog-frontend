import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { client, urlFor } from '../lib/sanityClient';
import { Clock, Loader2 } from 'lucide-react';
import Sidebar from '../components/Sidebar.jsx';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const q = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) {
      setResults([]);
      return;
    }
    setLoading(true);
    const query = `*[_type == "post" && (title match $keyword || excerpt match $keyword)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      "author": author->name,
      "category": categories[0]->title,
      "date": publishedAt,
      excerpt,
      "readTime": estimatedReadingTime
    }`;
    
    client.fetch(query, { keyword: `*${q}*` })
      .then((data) => {
        setResults(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [q]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <section className="lg:col-span-8">
        <h2 className="font-serif text-3xl font-bold mb-6">Search Results for "{q}"</h2>
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-slate-400">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p>Searching...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-10 border-t border-black pt-6">
            {results.map((p) => (
              <article 
                key={p._id} 
                className="grid grid-cols-12 gap-6 group cursor-pointer"
                onClick={() => navigate(`/post/${p.slug?.current}`)}
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
                  <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{p.excerpt}</p>
                  <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                    <span>{p.author || "Admin"}</span>
                    <span>{new Date(p.date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{p.readTime || '5'}m</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </section>
      <Sidebar />
    </div>
  );
}