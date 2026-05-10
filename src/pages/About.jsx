import { ShieldCheck, BookOpenCheck, Microscope, Compass } from 'lucide-react'

const pillars = [
  { icon: ShieldCheck, title: '100% Authentic Data', text: 'Every figure, quote, and benchmark is sourced, verified, and cited. No synthetic filler, no recycled press releases.' },
  { icon: BookOpenCheck, title: 'Real-World Facts', text: 'Our reporters work from labs, factory floors, and datacenters — not from rumour or speculation.' },
  { icon: Microscope, title: 'Expert Analysis', text: 'Senior contributors hold backgrounds in machine learning research, robotics engineering, and silicon design.' },
  { icon: Compass, title: 'Independent Direction', text: 'We accept no sponsored coverage. Editorial decisions are made by the newsroom, not by advertisers.' },
]

export default function About() {
  return (
    <article className="max-w-3xl mx-auto">
      <p className="text-[10px] tracking-[0.4em] uppercase text-accent text-center mb-4">Our Editorial Mission</p>
      <h2 className="font-serif text-5xl md:text-6xl font-bold text-center leading-tight mb-6">
        Reporting the truth of intelligent machines.
      </h2>
      <div className="w-16 h-0.5 bg-accent mx-auto mb-10" />

      <p className="font-serif text-2xl leading-relaxed text-neutral-800 mb-6 first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none">
        Tech Pulse exists to cut through the noise surrounding artificial intelligence and robotics. In a moment defined by hype cycles and synthetic content, we hold ourselves to a single discipline: report what is real, document what is verified, and explain what genuinely matters.
      </p>

      <p className="text-base text-neutral-700 leading-relaxed mb-12">
        Founded by a small group of engineers and journalists, our newsroom publishes long-form analysis, field reports, and benchmark investigations. We believe that the public conversation around AI deserves the same rigor traditionally reserved for science and finance reporting — and we are building a publication around that conviction.
      </p>

      <div className="border-t border-b border-black py-12 my-12">
        <h3 className="font-serif text-3xl text-center mb-10">Our Four Commitments</h3>
        <div className="grid sm:grid-cols-2 gap-10">
          {pillars.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <Icon className="text-accent mb-3" size={28} strokeWidth={1.5} />
              <h4 className="font-serif text-xl mb-2">{title}</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <blockquote className="text-center my-14">
        <p className="font-serif text-3xl italic leading-snug text-neutral-800">
          “In an industry obsessed with the future, our job is to describe the present — accurately.”
        </p>
        <footer className="mt-4 text-xs tracking-[0.3em] uppercase text-neutral-500">— The Editorial Board</footer>
      </blockquote>

      <p className="text-base text-neutral-700 leading-relaxed">
        We invite researchers, engineers, and informed readers to hold us accountable. Corrections are issued promptly and publicly. Sources are protected. And every story we publish — without exception — is built on facts you can verify yourself.
      </p>
    </article>
  )
}
