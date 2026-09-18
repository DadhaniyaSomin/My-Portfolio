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
                    <ul className="mb-6 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/80">
                        <li>Designed and delivered backend services and RESTful APIs used by mobile applications and partner systems, improving integration reliability across teams.</li>
                        <li>Automated testing and deployment workflows with GitHub Actions, making releases more repeatable and reducing manual verification work.</li>
                        <li>Standardized local development with Docker, helping new developers become productive 50% faster and reducing environment-related issues.</li>
                        <li>Leading the development of a high-performance Golang reporting microservice to support faster, more scalable reporting workflows.</li>
                        <li>Worked across Laravel, PHP, PostgreSQL, MySQL, and microservice-based systems to deliver features from backend design through production delivery.</li>
                    </ul>
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
                    <ul className="mb-6 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/80">
                        <li>Built backend modules and full-stack product features with Laravel and MySQL for client applications, taking work from requirements through delivery.</li>
                        <li>Designed RESTful API contracts that gave frontend teams and external services reliable access to product capabilities.</li>
                        <li>Optimized database queries and introduced Redis caching, reducing API response times by 25% on performance-sensitive workflows.</li>
                        <li>Integrated Stripe and PayPal payment APIs, supporting dependable payment flows and third-party service coordination.</li>
                        <li>Improved engineering consistency by mentoring junior developers on Laravel practices and reviewing code for maintainability.</li>
                    </ul>
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
