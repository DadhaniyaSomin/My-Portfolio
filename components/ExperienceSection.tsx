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
      "Build REST APIs for mobile applications and partner systems, improving reliability across integrations.",
      "Standardize Docker-based local development to make onboarding more consistent for new developers.",
      "Automate test and deployment workflows with GitHub Actions to make releases repeatable and reduce manual verification.",
      "Develop a high-performance Go reporting microservice for faster, more scalable reporting workflows.",
    ],
    tools: ["Go", "PHP", "Docker", "GitHub Actions", "PostgreSQL", "MySQL"],
  },
  {
    dates: "2022 — 2024",
    role: "Backend Developer",
    company: "E2logy",
    url: "https://e2logy.com/",
    location: "Ahmedabad, India",
    outcome: "Reduced API response times by 25% on performance-sensitive workflows through query optimization and Redis caching.",
    points: [
      "Delivered PHP and MySQL backend modules for client-facing products, taking features from requirements through delivery.",
      "Optimized database query paths and introduced Redis caching for performance-sensitive workflows.",
      "Designed REST API contracts for frontend teams and external services, then integrated Stripe and PayPal into payment workflows.",
      "Mentored junior developers and used code reviews to strengthen consistency and maintainability.",
    ],
    tools: ["PHP", "MySQL", "Redis", "REST APIs", "Stripe"],
  },
]

export const ExperienceSection = () => (
  <section id="experience" className="border-b border-neutral-200 bg-white py-20">
    <div className="container mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHeading
        eyebrow="01 / Experience"
        title="Where I’ve worked."
        description="My experience spans production APIs and integrations, release automation, database performance work, and a Go reporting service—from implementation through delivery."
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
