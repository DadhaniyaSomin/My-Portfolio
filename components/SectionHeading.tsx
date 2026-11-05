type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) => {
  return (
    <div className="mx-auto mb-12 max-w-6xl text-left">
      <div className="mb-4 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800">
        <span className="h-2 w-2 bg-primary" />
        <span>{eyebrow}</span>
        <span className="h-px w-12 bg-neutral-300" />
      </div>
      <h2 className="text-4xl font-extrabold uppercase leading-[0.9] tracking-[-0.06em] text-black md:text-6xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl font-mono text-sm leading-7 text-neutral-600 md:text-base">
        {description}
      </p>
    </div>
  )
}
