import { GsapReveal } from "@/components/gsap/GsapReveal"

const principles = [
  {
    title: "Lead with curiosity.",
    description:
      "I listen for context before offering answers, ask questions early, and stay open to changing my view. Good decisions make room for different perspectives and honest uncertainty.",
  },
  {
    title: "Be clear and dependable.",
    description:
      "I communicate what I can commit to, follow through, and raise concerns while there is still time to act. When plans change, I share that early and help the team adjust.",
  },
  {
    title: "Make room to learn.",
    description:
      "I give feedback with respect, receive it with curiosity, and treat mistakes as something to understand together. People learn faster when they can ask, disagree, and speak up without blame.",
  },
]

export const EngineeringApproachSection = () => {
  return (
    <section
      id="engineering-approach"
      className="border-y border-neutral-200 bg-neutral-50 px-5 py-20 text-black md:px-8"
    >
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] md:gap-20">
        <div className="self-start">
          <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[.16em] text-cyan-800">
            05 / Approach
          </p>
          <h2 className="max-w-md text-4xl font-extrabold uppercase leading-[.9] tracking-[-.06em] md:text-6xl">
            How I
            <br />
            work.
          </h2>
        </div>

        <div className="border-t-2 border-black">
          {principles.map((principle, index) => (
            <GsapReveal key={principle.title} delay={index * 0.06}>
              <article className="grid gap-4 border-b border-neutral-300 py-7 md:grid-cols-[48px_1fr] md:gap-8 md:py-8">
                <span className="font-mono text-xs font-semibold text-cyan-800">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-extrabold leading-tight md:text-2xl">
                    {principle.title}
                  </h3>
                  <p className="mt-3 max-w-2xl font-mono text-xs leading-6 text-neutral-600 md:text-sm md:leading-7">
                    {principle.description}
                  </p>
                </div>
              </article>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
