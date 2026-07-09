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
                        Introduced and implemented a CI/CD pipeline using GitHub Actions, automating testing and deployment. Built and consumed sophisticated RESTful APIs for integration with mobile applications and partner services. Pioneered the adoption of Docker for local development, standardizing the environment and onboarding new developers 50% faster. Currently leading a project to introduce Golang for a high-performance reporting microservice.
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
                        Developed new features and modules for client projects using Laravel and MySQL. Built and integrated RESTful API endpoints for front-end consumption. Collaborated with front-end developers to integrate back-end logic. Optimized database queries and implemented caching with Redis, improving application response time by 25%. Integrated multiple third-party payment APIs (Stripe, PayPal). Mentored junior developers on Laravel best practices and conducted code reviews.
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
