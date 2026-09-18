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
    <div className="mx-auto mb-16 max-w-3xl text-center">
      <div className="mb-5 flex items-center justify-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
        <span>{eyebrow}</span>
        <span className="h-px w-10 bg-primary/50" />
      </div>
      <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-foreground md:text-7xl">
        {title}
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
        {description}
      </p>
    </div>
  )
}
