const principles = [
  {
    title: "Choose tools from the problem.",
    description:
      "Languages are implementation choices, not professional identities. I work from constraints, performance, operability, team context, and delivery needs to choose the right stack.",
  },
  {
    title: "Treat reliability as product work.",
    description:
      "Retries, rate limits, observability, data consistency, and failure modes shape the user experience as much as the interface does.",
  },
  {
    title: "Collaborate beyond the ticket.",
    description:
      "The best engineering decisions come from understanding product intent, operational constraints, and what teammates need to keep moving.",
  },
]

export const EngineeringApproachSection = () => {
  return (
    <section
      id="engineering-approach"
      className="bg-[#f3f0e8] px-5 py-20 text-[#0d1613] transition-colors duration-300 dark:bg-[#0d1613] dark:text-[#f3f0e8] md:px-8 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] md:gap-20">
        <div className="self-start">
          <p className="mb-7 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#ccff00]">
            03 / Engineering Approach
          </p>
          <h2 className="max-w-md text-5xl font-medium leading-[0.96] tracking-[-0.04em] md:text-7xl">
            Strong systems
            <br />
            make teams
            <br />
            <span className="font-serif italic text-[#ccff00]">move better.</span>
          </h2>
        </div>

        <div className="border-t border-[#0d1613]/15 dark:border-white/15">
          {principles.map((principle, index) => (
            <article
              key={principle.title}
              className="grid gap-4 border-b border-[#0d1613]/15 py-8 dark:border-white/15 md:grid-cols-[48px_1fr] md:gap-8 md:py-9"
            >
              <span className="font-mono text-[11px] font-semibold text-[#ccff00]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-2xl font-medium leading-tight md:text-3xl">
                  {principle.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#0d1613]/60 dark:text-white/50 md:text-base">
                  {principle.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}