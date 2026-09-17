"use client";

import { Timeline } from "@/components/ui/timeline";

export const ExperienceSection = () => {
    const data = [
        {
            title: "2024 — Present",
            content: (
                <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Software Engineer</h3>
                    <a href="https://webmobtech.com/" target="_blank" rel="noopener noreferrer">
                        <h4 className="text-xl font-semibold text-[#CCFF00] mb-2 hover:underline cursor-pointer inline-block">Webmobtech</h4>
                    </a>
                    <p className="text-sm text-gray-500 mb-4">Ahmedabad, India</p>
                    <p className="text-foreground/80 text-base leading-relaxed mb-6">
                        I set up a CI/CD pipeline with GitHub Actions that actually made our deployments smoother - no more manual testing headaches. I built RESTful APIs that mobile apps and partner services could actually use without constant debugging. I also pushed for Docker in our local development environment, which standardized everything and got new developers up to speed 50% faster. Right now I'm leading a project to bring in Golang for a high-performance reporting microservice - excited to see how it performs.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["Golang", "Laravel", "PHP", "Docker", "GitHub Actions", "CI/CD", "RESTful APIs", "PostgreSQL", "MySQL", "Microservices"].map((tech, i) => (
                            <span key={i} className="text-xs font-medium text-foreground/60 bg-muted px-2 py-1 rounded border border-border">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: "2022 — 2024",
            content: (
                <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Backend Developer</h3>
                    <a href="https://e2logy.com/" target="_blank" rel="noopener noreferrer">
                        <h4 className="text-xl font-semibold text-[#CCFF00] mb-2 hover:underline cursor-pointer inline-block">E2logy</h4>
                    </a>
                    <p className="text-sm text-gray-500 mb-4">Ahmedabad, India</p>
                    <p className="text-foreground/80 text-base leading-relaxed mb-6">
                        I built new features and modules for client projects using Laravel and MySQL - mostly making sure things actually worked as expected. I created RESTful API endpoints that the front-end team could use without constantly asking me questions. I spent time optimizing database queries and added Redis caching, which boosted response times by 25% (that felt pretty good). I also integrated payment APIs like Stripe and PayPal - always fun when money is involved. I got to mentor junior developers on Laravel best practices and review their code, which I actually enjoyed.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["Laravel", "PHP", "MySQL", "Redis", "RESTful APIs", "Stripe", "PayPal", "Git", "PHPUnit", "MVC"].map((tech, i) => (
                            <span key={i} className="text-xs font-medium text-foreground/60 bg-muted px-2 py-1 rounded border border-border">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            ),
        },
    ];

    return (
        <section id="experience" className="bg-background transition-colors duration-300">
            <Timeline data={data} />
        </section>
    );
};
