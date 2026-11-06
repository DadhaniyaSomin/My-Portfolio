import { SectionHeading } from "@/components/SectionHeading"

const roles = [
  {
    dates: "2024 — Present",
    role: "Software Engineer",
    company: "Webmobtech",
    url: "https://webmobtech.com/",
    location: "Ahmedabad, India",
    outcome: "Helped new developers become productive 50% faster by standardizing the local environment with Docker.",
    points: [
      "Designed REST APIs used by mobile apps and partner systems, improving integration reliability across teams.",
      "Automated testing and deployment with GitHub Actions, making releases repeatable and reducing manual verification.",
      "Lead development of a high-performance Go reporting microservice for faster, more scalable reporting workflows.",
      "Deliver features across Go, Laravel, PHP, PostgreSQL, and MySQL, from backend design through production.",
    ],
    tools: ["Go", "Laravel", "Docker", "GitHub Actions", "PostgreSQL", "MySQL"],
  },
  {
    dates: "2022 — 2024",
    role: "Backend Developer",
    company: "E2logy",
    url: "https://e2logy.com/",
    location: "Ahmedabad, India",
    outcome: "Reduced API response times by 25% on performance-sensitive workflows through query optimization and Redis caching.",
    points: [
      "Built Laravel and MySQL backend modules from requirements through delivery, contributing to client-facing product features.",
      "Designed REST API contracts for frontend teams and external services to make integrations predictable.",
      "Integrated Stripe and PayPal payment APIs into product workflows.",
      "Mentored junior developers and reviewed code to improve consistency and long-term maintainability.",
    ],
    tools: ["Laravel", "PHP", "MySQL", "Redis", "REST APIs", "Stripe"],
  },
]

export const ExperienceSection = () => (
  <section id="experience" className="border-b border-neutral-200 bg-white py-20">
    <div className="container mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHeading
        eyebrow="01 / Experience"
        title="Where I’ve worked."
        description="Across two engineering roles, I’ve built APIs for mobile and partner systems, improved database-backed performance, automated release workflows, and developed reporting services."
      />
      <div className="border-t-2 border-black">
        {roles.map((role) => (
          <article key={role.company} className="grid gap-5 border-b border-neutral-300 py-8 md:grid-cols-[170px_1fr] md:gap-10 md:py-10">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-neutral-500">{role.dates}</p>
            <div>
              <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-extrabold tracking-tight text-black md:text-3xl">{role.role}</h3>
                <a href={role.url} target="_blank" rel="noopener noreferrer" className="font-mono text-sm font-semibold text-cyan-800 underline decoration-cyan-300 underline-offset-4 hover:text-black">{role.company} ↗</a>
                <span className="font-mono text-xs text-neutral-500">{role.location}</span>
              </div>
              <p className="mb-5 max-w-3xl border-l-4 border-primary bg-cyan-50 px-4 py-3 font-mono text-xs leading-6 text-neutral-800 md:text-sm">{role.outcome}</p>
              <ul className="mb-5 max-w-3xl list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
                {role.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <div className="flex flex-wrap gap-2">
                {role.tools.map((tool) => <span key={tool} className="border border-neutral-300 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-neutral-600">{tool}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)
