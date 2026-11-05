const principles = [
  {
    title: "Design the failure path.",
    description:
      "Timeouts, retries, and clear API contracts matter as much as the happy path. I account for how a service behaves when its dependencies slow down or fail.",
  },
  {
    title: "Measure before optimizing.",
    description:
      "I look at the request and query paths before adding complexity. Query optimization and Redis caching reduced API response times by 25% in a performance-sensitive workflow.",
  },
  {
    title: "Make delivery repeatable.",
    description:
      "Docker standardized local development, while GitHub Actions made testing and deployment more consistent. The goal is a setup teammates can use and maintain with confidence.",
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
            <article
              key={principle.title}
              className="grid gap-4 border-b border-neutral-300 py-7 md:grid-cols-[48px_1fr] md:gap-8 md:py-8"
            >
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
          ))}
        </div>
      </div>
    </section>
  )
}
