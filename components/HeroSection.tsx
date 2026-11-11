import { ArrowDownRight, Download, Github, Linkedin } from "lucide-react"

export const HeroSection = () => (
  <section id="home" role="banner" className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden border-b-2 border-black bg-white px-5 pb-16 pt-28 sm:px-8 lg:px-12">
    <div className="mx-auto grid w-full max-w-6xl items-end gap-12 lg:grid-cols-[1fr_300px]">
      <div>
        <div className="mb-8 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[.16em] text-neutral-600">
          <span className="h-2.5 w-2.5 bg-primary" /> Somin Dadhaniya <span className="text-neutral-300">/</span> Backend engineer
        </div>
        <h1 className="max-w-5xl text-[clamp(3.8rem,5vw,7.6rem)] font-extrabold uppercase leading-[.84] tracking-[-.075em] text-black">
          BEYOND THE API.<br /><span className="text-primary">INTO THE SYSTEM.</span>
        </h1>
        <p className="mt-10 max-w-2xl font-mono text-sm leading-7 tracking-wide text-neutral-700 md:text-base">
          I'm Somin, a backend engineer focused on designing and building reliable systems, scalable APIs, and data-driven applications using Go, PHP, and PostgreSQL.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="inline-flex h-12 items-center gap-2 border-2 border-black bg-primary px-5 text-xs font-bold uppercase tracking-widest text-black shadow-[4px_4px_0_#0a0a0a] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-cyan-100 hover:shadow-[6px_6px_0_#0a0a0a]">
            See selected work <ArrowDownRight size={16} />
          </a>
          {process.env.NEXT_PUBLIC_RESUME_URL ? (
            <a href={process.env.NEXT_PUBLIC_RESUME_URL} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 border-2 border-black bg-white px-5 text-xs font-bold uppercase tracking-widest text-black transition hover:bg-neutral-100"><Download size={16} /> Résumé</a>
          ) : (
            <a href="#about" className="inline-flex h-12 items-center gap-2 border-2 border-black bg-white px-5 text-xs font-bold uppercase tracking-widest text-black transition hover:bg-neutral-100">About me <ArrowDownRight size={16} /></a>
          )}
        </div>
      </div>
      <aside className="border-2 border-black bg-white p-5 shadow-[5px_5px_0_#00b8d4]">
        <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-3 font-mono text-[11px] font-semibold uppercase tracking-[.14em]">
          <span>Engineer profile</span><span className="text-cyan-700">[SD]</span>
        </div>
        <dl className="space-y-3 font-mono text-xs">
          <div className="flex justify-between gap-4"><dt className="text-neutral-500">BASED</dt><dd className="text-right font-semibold">Ahmedabad, India</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-neutral-500">FOCUS</dt><dd className="text-right font-semibold">Backend / Systems</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-neutral-500">CORE</dt><dd className="text-right font-semibold">Go · PHP · SQL</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-neutral-500">EXPERIENCE</dt><dd className="text-right font-semibold">4+ years</dd></div>
        </dl>
        <div className="mt-5 flex gap-2 border-t border-neutral-200 pt-4">
          <a aria-label="GitHub" href="https://github.com/somindadhaniya" target="_blank" rel="noreferrer" className="border border-black p-2 transition hover:bg-cyan-50"><Github size={16}/></a>
          <a aria-label="LinkedIn" href="https://www.linkedin.com/in/dadhaniya-somin-3a4137121/" target="_blank" rel="noreferrer" className="border border-black p-2 transition hover:bg-cyan-50"><Linkedin size={16}/></a>
        </div>
      </aside>
    </div>
    <div className="pointer-events-none absolute bottom-5 right-6 font-mono text-[10px] uppercase tracking-[.16em] text-neutral-400">Portfolio / 2026</div>
  </section>
)
