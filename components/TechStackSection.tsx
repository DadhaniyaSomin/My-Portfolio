"use client";

import {
  SiGo, SiPhp, SiLaravel, SiPostgresql, SiMysql, SiRedis,
  SiDocker, SiKubernetes, SiGithubactions, SiGit, SiGithub,
  SiNginx, SiRabbitmq, SiApachekafka, SiGrafana, SiElasticsearch,
  SiTypescript, SiJavascript
} from 'react-icons/si';
import { FaServer, FaCode, FaNetworkWired, FaAws } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { SectionHeading } from './SectionHeading';

interface Technology {
  name: string;
  icon: IconType;
  url: string;
}

interface Category {
  title: string;
  description: string;
  technologies: Technology[];
}

export const TechStackSection = () => {
  const categories: Category[] = [
    {
      title: "Backend & Languages",
      description: "Service and API development, relational data, and caching for dependable product backends.",
      technologies: [
        { name: "Golang", icon: SiGo, url: "https://go.dev" },
        { name: "PHP", icon: SiPhp, url: "https://www.php.net" },
        { name: "Laravel", icon: SiLaravel, url: "https://laravel.com" },
        { name: "PostgreSQL", icon: SiPostgresql, url: "https://www.postgresql.org" },
        { name: "MySQL", icon: SiMysql, url: "https://www.mysql.com" },
        { name: "Redis", icon: SiRedis, url: "https://redis.io" },
        { name: "gRPC", icon: FaNetworkWired, url: "https://grpc.io" },
        { name: "REST APIs", icon: FaServer, url: "https://restfulapi.net" },
        { name: "TypeScript", icon: SiTypescript, url: "https://www.typescriptlang.org" },
        { name: "JavaScript", icon: SiJavascript, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      ],
    },
    {
      title: "DevOps & Infrastructure",
      description: "Containers, cloud infrastructure, and automation that make development and releases repeatable.",
      technologies: [
        { name: "Docker", icon: SiDocker, url: "https://www.docker.com" },
        { name: "Kubernetes", icon: SiKubernetes, url: "https://kubernetes.io" },
        { name: "AWS", icon: FaAws, url: "https://aws.amazon.com" },
        { name: "GitHub Actions", icon: SiGithubactions, url: "https://github.com/features/actions" },
        { name: "Nginx", icon: SiNginx, url: "https://nginx.org" },
        { name: "Grafana", icon: SiGrafana, url: "https://grafana.com" },
        { name: "Elasticsearch", icon: SiElasticsearch, url: "https://www.elastic.co" },
      ],
    },
    {
      title: "Architecture & Tools",
      description: "Patterns and messaging tools for connecting services and keeping systems maintainable as they grow.",
      technologies: [
        { name: "Microservices", icon: FaCode, url: "https://microservices.io" },
        { name: "RabbitMQ", icon: SiRabbitmq, url: "https://www.rabbitmq.com" },
        { name: "Kafka", icon: SiApachekafka, url: "https://kafka.apache.org" },
        { name: "Git", icon: SiGit, url: "https://git-scm.com" },
        { name: "GitHub", icon: SiGithub, url: "https://github.com" },
      ],
    }
  ];

  return (
    <section id="tech" className="border-b border-neutral-200 bg-white py-20 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="04 / Toolkit"
          title="Tech Stack"
          description="A practical toolkit for the full backend lifecycle: shaping service boundaries, building APIs, working with data, and supporting systems in production."
        />

        <div className="space-y-12">
          {categories.map((category, catIndex) => (
            <div key={catIndex} className="flex flex-col items-start border-t border-neutral-200 pt-7">
              <h3 className="mb-6 font-mono text-sm font-semibold uppercase tracking-wide text-neutral-700">
                {category.title}
              </h3>
              <p className="-mt-4 mb-6 max-w-2xl font-mono text-xs leading-6 text-neutral-600 md:text-sm">
                {category.description}
              </p>

              <div className="flex flex-wrap justify-start gap-3 md:gap-4 px-0">
                {category.technologies.map((tech, index) => {
                  const IconComponent = tech.icon;
                  return (
                    <a
                      key={index}
                      href={tech.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-block text-center cursor-pointer"
                    >
                      <div className="h-16 w-16 border border-neutral-300 bg-white p-2 transition-all group-hover:-translate-y-1 group-hover:border-black group-hover:shadow-[3px_3px_0_#00b8d4] md:h-[72px] md:w-[72px]">
                        <div className="grid h-full place-items-center">
                          <IconComponent className="h-8 w-8 text-neutral-700 transition-colors group-hover:text-cyan-800" />
                        </div>
                      </div>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-neutral-500 group-hover:text-black transition-colors">
                        {tech.name}
                      </p>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
