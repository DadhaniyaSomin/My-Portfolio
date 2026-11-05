const proofPoints = [
  { value: "4+ years", label: "Building backend products" },
  { value: "50% faster", label: "Developer onboarding" },
  { value: "25% faster", label: "API response times" },
]

export function ProofSection() {
  return (
    <section aria-label="Experience highlights" className="border-b-2 border-black bg-primary">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y-2 divide-black px-5 sm:px-8 md:grid-cols-3 md:divide-x-2 md:divide-y-0">
        {proofPoints.map((point, index) => (
          <div key={point.label} className="flex items-baseline justify-between gap-4 py-5 md:flex-col md:items-start md:gap-2 md:px-6 md:py-7 first:md:pl-0 last:md:pr-0">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[.14em] text-black/65">0{index + 1} / {point.label}</p>
            <p className="text-2xl font-extrabold uppercase leading-none tracking-[-.04em] text-black md:text-3xl">{point.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
