"use client"

import {
  SiGo, SiPhp, SiPostgresql, SiMysql, SiRedis, SiDocker, SiKubernetes,
  SiApachekafka, SiGithubactions, SiNginx, SiGrafana, SiElasticsearch,
  SiTypescript, SiJavascript, SiRabbitmq, SiGit, SiGithub,
} from "react-icons/si"
import { FaAws, FaNetworkWired, FaServer, FaCode } from "react-icons/fa"
import { SectionHeading } from "./SectionHeading"
import { GsapReveal } from "@/components/gsap/GsapReveal"
import { LogoLoop, type LogoLoopItem } from "@/components/react-bits/LogoLoop"

const coreTechnologies: LogoLoopItem[] = [
  { name: "Go", icon: SiGo, href: "https://go.dev" },
  { name: "PHP", icon: SiPhp, href: "https://www.php.net" },
  { name: "PostgreSQL", icon: SiPostgresql, href: "https://www.postgresql.org" },
  { name: "MySQL", icon: SiMysql, href: "https://www.mysql.com" },
  { name: "Redis", icon: SiRedis, href: "https://redis.io" },
  { name: "Docker", icon: SiDocker, href: "https://www.docker.com" },
  { name: "Kubernetes", icon: SiKubernetes, href: "https://kubernetes.io" },
  { name: "AWS", icon: FaAws, href: "https://aws.amazon.com" },
  { name: "Kafka", icon: SiApachekafka, href: "https://kafka.apache.org" },
]

const supportingTools = [
  {
    title: "APIs & application",
    description: "Service contracts and the tools used to connect backend work to product interfaces.",
    technologies: [
      { name: "gRPC", icon: FaNetworkWired, href: "https://grpc.io" },
      { name: "REST APIs", icon: FaServer, href: "https://restfulapi.net" },
      { name: "TypeScript", icon: SiTypescript, href: "https://www.typescriptlang.org" },
      { name: "JavaScript", icon: SiJavascript, href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    ],
  },
  {
    title: "Cloud & delivery",
    description: "Automation, observability, and web infrastructure for reliable releases.",
    technologies: [
      { name: "GitHub Actions", icon: SiGithubactions, href: "https://github.com/features/actions" },
      { name: "Nginx", icon: SiNginx, href: "https://nginx.org" },
      { name: "Grafana", icon: SiGrafana, href: "https://grafana.com" },
      { name: "Elasticsearch", icon: SiElasticsearch, href: "https://www.elastic.co" },
    ],
  },
  {
    title: "Architecture & collaboration",
    description: "Patterns and shared tools that keep systems maintainable as teams and traffic grow.",
    technologies: [
      { name: "Microservices", icon: FaCode, href: "https://microservices.io" },
      { name: "RabbitMQ", icon: SiRabbitmq, href: "https://www.rabbitmq.com" },
      { name: "Git", icon: SiGit, href: "https://git-scm.com" },
      { name: "GitHub", icon: SiGithub, href: "https://github.com" },
    ],
  },
]

export const TechStackSection = () => (
  <section id="tech" className="border-b border-neutral-200 bg-white py-20 md:px-6">
    <div className="container mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="03 / Toolkit"
        title="Tech Stack"
        description="A practical toolkit for the full backend lifecycle: shaping service boundaries, building APIs, working with data, and supporting systems in production."
      />

      <div className="mb-12 border-y border-neutral-300 py-5">
        <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-neutral-500">
          Core stack <span className="text-primary">/</span> technologies I use most
        </p>
        <LogoLoop items={coreTechnologies} />
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {supportingTools.map((group, index) => (
          <GsapReveal key={group.title} delay={index * 0.07} className="h-full">
            <div className="h-full border-t-2 border-black pt-5">
              <h3 className="font-mono text-xs font-bold uppercase tracking-[.1em] text-neutral-800">
                0{index + 1} / {group.title}
              </h3>
              <p className="mt-3 min-h-[72px] font-mono text-xs leading-6 text-neutral-600">
                {group.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.technologies.map(({ name, href, icon: Icon }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-9 items-center gap-2 border border-neutral-300 bg-white px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wide text-neutral-700 transition-colors hover:border-black hover:text-black focus-visible:outline-offset-2 dark:bg-card dark:text-white dark:hover:border-neutral-400 dark:hover:text-white"
                    >
                      <Icon aria-hidden="true" className="h-3.5 w-3.5 text-cyan-800 dark:text-[#75dce7]" />
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </GsapReveal>
        ))}
      </div>
    </div>
  </section>
)
