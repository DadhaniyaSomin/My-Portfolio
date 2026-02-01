"use client";

import React, { useEffect, useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectCardSkeleton } from './ProjectCardSkeleton';
import { ExternalLink, Loader2 } from 'lucide-react';
import { AnimatedDotBackground } from './ui/animated-dot-background';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

interface Project {
  id: string;
  title: string;
  url: string;
  logoUrl: string;
  description?: string;
  language?: string;
  stars?: number;
  forks?: number;
}

const ProjectSection = ({ initialProjects }: { initialProjects?: Project[] }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [loading, setLoading] = useState(!initialProjects);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProjects) return;

    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/github');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const repos: GitHubRepo[] = await response.json();

        const formattedProjects: Project[] = repos.map((repo: GitHubRepo) => ({
          id: repo.id.toString(),
          title: repo.name
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          url: repo.html_url.replace('https://', ''),
          logoUrl: `/placeholder.png`,
          description: repo.description || undefined,
          language: repo.language || undefined,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
        }));

        setProjects(formattedProjects);
      } catch (err) {
        console.error('Error fetching GitHub repos:', err);
        setError('Failed to load projects');
        // Fallback to static projects
        setProjects([
          { id: "1", title: "BlueBird Movies", url: "github.com/tushar-2223/BlueBird-Movies", logoUrl: "/placeholder.svg", stars: 0, forks: 0 },
          { id: "2", title: "Hotel Management System", url: "github.com/tushar-2223/Hotel-Management-System", logoUrl: "/placeholder.svg", stars: 0, forks: 0 },
          { id: "3", title: "AI Pal", url: "github.com/tushar-2223/AI-Pal", logoUrl: "/placeholder.svg", stars: 0, forks: 0 },
          { id: "4", title: "Offline Translator", url: "github.com/tushar-2223/offline_translator", logoUrl: "/placeholder.svg", stars: 0, forks: 0 },
          { id: "5", title: "Flash Note", url: "github.com/tushar-2223/Flash-Note", logoUrl: "/placeholder.svg", stars: 0, forks: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [initialProjects]);

  return (
    <section id="projects" className="py-20 bg-background relative overflow-hidden transition-colors duration-300">
      <AnimatedDotBackground />
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground uppercase tracking-tight">
            ACADEMIC PROJECTS
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of tools and applications I've built to solve real-world problems
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="w-8 h-8 text-foreground animate-spin" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 md:gap-10 lg:gap-10 xl:gap-16 justify-center w-full">
            {projects.map((project) => (
              <div key={project.id} className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-27px)] xl:w-[calc(33.33%-43px)]">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-16">
          <a
            href="https://github.com/tushar-2223"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 justify-center items-center text-muted-foreground hover:text-foreground transition-all ease-linear group"
            aria-label="Visit GitHub to see more projects"
          >
            <span className="text-lg font-medium">Visit GitHub to see More</span>
            <ExternalLink
              className="w-5 h-5 stroke-1.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
