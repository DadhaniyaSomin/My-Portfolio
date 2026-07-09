"use client";

import {
  SiGo, SiPhp, SiLaravel, SiPostgresql, SiMysql, SiRedis,
  SiDocker, SiKubernetes, SiGithubactions, SiGit, SiGithub,
  SiNginx, SiRabbitmq, SiApachekafka, SiGrafana, SiElasticsearch,
  SiTypescript, SiJavascript
} from 'react-icons/si';
import { FaServer, FaCode, FaNetworkWired, FaAws } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface Technology {
  name: string;
  icon: IconType;
  url: string;
}

interface Category {
  title: string;
  technologies: Technology[];
  hoverClass: string;
}

export const TechStackSection = () => {
  const categories: Category[] = [
    {
      title: "Backend & Languages",
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
      hoverClass: "group-hover:border-[#CCFF00]",
    },
    {
      title: "DevOps & Infrastructure",
      technologies: [
        { name: "Docker", icon: SiDocker, url: "https://www.docker.com" },
        { name: "Kubernetes", icon: SiKubernetes, url: "https://kubernetes.io" },
        { name: "AWS", icon: FaAws, url: "https://aws.amazon.com" },
        { name: "GitHub Actions", icon: SiGithubactions, url: "https://github.com/features/actions" },
        { name: "Nginx", icon: SiNginx, url: "https://nginx.org" },
        { name: "Grafana", icon: SiGrafana, url: "https://grafana.com" },
        { name: "Elasticsearch", icon: SiElasticsearch, url: "https://www.elastic.co" },
      ],
      hoverClass: "group-hover:border-[#CCFF00]",
    },
    {
      title: "Architecture & Tools",
      technologies: [
        { name: "Microservices", icon: FaCode, url: "https://microservices.io" },
        { name: "RabbitMQ", icon: SiRabbitmq, url: "https://www.rabbitmq.com" },
        { name: "Kafka", icon: SiApachekafka, url: "https://kafka.apache.org" },
        { name: "Git", icon: SiGit, url: "https://git-scm.com" },
        { name: "GitHub", icon: SiGithub, url: "https://github.com" },
      ],
      hoverClass: "group-hover:border-[#CCFF00]",
    }
  ];

  return (
    <section id="tech" className="py-20 md:px-6 bg-background transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground uppercase tracking-tight">
            Tech Stack
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies I use to engineer scalable backend systems
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category, catIndex) => (
            <div key={catIndex} className="flex flex-col items-center">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground/90 mb-8 tracking-wide">
                {category.title}
              </h3>

              <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-2">
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
                      <div className={`h-20 w-20 md:h-24 md:w-24 rounded-[20px] border border-border bg-muted/50 p-2 transition-all duration-500 group-hover:-translate-y-3 ${category.hoverClass}`}>
                        <div className="grid h-full place-items-center rounded-xl border border-border bg-muted shadow-inner">
                          <IconComponent className="w-10 h-10 text-foreground/70 group-hover:text-foreground transition-colors duration-300 group-hover:scale-110" />
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 font-medium">
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
