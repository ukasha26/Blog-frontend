import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { client, urlFor } from '../lib/sanityClient';
import { Clock, User, Loader2 } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import Sidebar from '../components/Sidebar.jsx';

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const query = `*[_type == "post" && (slug.current == $slug || _id == $slug)][0] {
      _id,
      title,
      mainImage,
      "author": author->name,
      "category": categories[0]->title,
      "date": publishedAt,
      body,
      excerpt,
      "readTime": estimatedReadingTime
    }`;
    
    client.fetch(query, { slug })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="font-serif italic text-lg">Loading post...</p>
      </div>
    );
  }

  if (!post) return <div className="text-center py-20 font-serif text-2xl">Post not found.</div>;

  const ptComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <img
            alt={value.alt || 'Post image'}
            loading="lazy"
            src={urlFor(value).width(800).auto('format').url()}
            className="w-full my-8 rounded-xl shadow-sm object-cover"
          />
        );
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <section className="lg:col-span-8">
        <article className="mb-12">
          {post.mainImage && (
             <div className="overflow-hidden mb-6">
               <img 
                 src={urlFor(post.mainImage).width(1200).url()} 
                 alt={post.title} 
                 className="w-full max-h-[500px] object-cover" 
               />
             </div>
          )}
          <p className="text-[10px] tracking-[0.3em] uppercase text-orange-600 font-bold mb-3">
             {post.category || "General"}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-4">
             {post.title}
          </h1>
          <div className="flex items-center gap-5 text-xs uppercase tracking-[0.2em] text-neutral-500 mb-8 border-b border-black pb-4">
             <span className="flex items-center gap-1.5"><User size={12} /> {post.author || "Admin"}</span>
             <span>{new Date(post.date).toLocaleDateString()}</span>
             <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime || '5'} min read</span>
          </div>
          
          <div className="prose prose-lg max-w-none mb-10 text-neutral-800 leading-relaxed space-y-6">
             {post.excerpt && <p className="font-serif italic text-xl mb-6">{post.excerpt}</p>}
             {post.body && (
               <div className="portable-text-content">
                 <PortableText value={post.body} components={ptComponents} />
               </div>
             )}
          </div>
        </article>
      </section>
      <Sidebar />
    </div>
  );
}