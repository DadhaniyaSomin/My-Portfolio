"use client";

import {
  SiReact, SiFlutter, SiExpo, SiRedux, SiDart,
  SiTypescript, SiJavascript, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss,
  SiFirebase, SiSupabase, SiGit, SiGithub, SiFigma
} from 'react-icons/si';
import { FaCode, FaRobot, FaGamepad, FaBrain } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';
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
      title: "Mobile Tech Stack",
      technologies: [
        { name: "React Native", icon: SiReact, url: "https://reactnative.dev" },
        { name: "Flutter", icon: SiFlutter, url: "https://flutter.dev" },
        { name: "Expo", icon: SiExpo, url: "https://expo.dev" },
        { name: "Redux Toolkit", icon: SiRedux, url: "https://redux-toolkit.js.org" },
        { name: "Flutter Flame", icon: FaGamepad, url: "https://flame-engine.org" },
        { name: "Reanimated", icon: SiReact, url: "https://docs.swmansion.com/react-native-reanimated" },
        { name: "Unistyles", icon: SiReact, url: "https://reactnativeunistyles.vercel.app" },
        { name: "Flutter Bloc", icon: SiFlutter, url: "https://bloclibrary.dev" },
        { name: "Riverpod", icon: SiFlutter, url: "https://riverpod.dev" },
        { name: "RxDart", icon: SiDart, url: "https://pub.dev/packages/rxdart" },
      ],
      hoverClass: "group-hover:border-[#b087ff]",
    },
    {
      title: "Web Tech Stack",
      technologies: [
        { name: "TypeScript", icon: SiTypescript, url: "https://www.typescriptlang.org" },
        { name: "JavaScript", icon: SiJavascript, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "Next.js", icon: SiNextdotjs, url: "https://nextjs.org" },
        { name: "React", icon: SiReact, url: "https://react.dev" },
        { name: "Node.js", icon: SiNodedotjs, url: "https://nodejs.org" },
        { name: "Express.js", icon: SiExpress, url: "https://expressjs.com" },
        { name: "MongoDB", icon: SiMongodb, url: "https://www.mongodb.com" },
        { name: "Tailwind CSS", icon: SiTailwindcss, url: "https://tailwindcss.com" },
      ],
      hoverClass: "group-hover:border-[#ffd074]",
    },
    {
      title: "Tools & Libraries",
      technologies: [
        { name: "Firebase", icon: SiFirebase, url: "https://firebase.google.com" },
        { name: "Supabase", icon: SiSupabase, url: "https://supabase.com" },
        { name: "VS Code", icon: VscCode, url: "https://code.visualstudio.com" },
        { name: "Antigravity", icon: FaRobot, url: "https://deepmind.google" },
        { name: "Claude", icon: FaBrain, url: "https://claude.ai" },
        { name: "Git", icon: SiGit, url: "https://git-scm.com" },
        { name: "GitHub", icon: SiGithub, url: "https://github.com" },
        { name: "Figma", icon: SiFigma, url: "https://figma.com" },
      ],
      hoverClass: "group-hover:border-[#b087ff]",
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
            Technologies I use to build seamless experiences
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
