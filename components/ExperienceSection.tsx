"use client";

import { Timeline } from "@/components/ui/timeline";

export const ExperienceSection = () => {
    const data = [
        {
            title: "June 2024 - Present",
            content: (
                <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Mobile App Developer</h3>
                    <a href="https://webmobtech.com/" target="_blank" rel="noopener noreferrer">
                        <h4 className="text-xl font-semibold text-[#b087ff] mb-2 hover:underline cursor-pointer inline-block">WebMobTech Solutions Pvt. Ltd.</h4>
                    </a>
                    <p className="text-sm text-gray-500 mb-4">📍 Ahmedabad</p>
                    <p className="text-foreground/80 text-base leading-relaxed mb-6">
                        Developing and delivering high-quality mobile applications using Flutter and React Native, including Smart City, Medical TV, and Fintech solutions. Currently working on a product-based Cloth Changer / AI Style Changer application, implementing core monetization and growth features such as In-App Purchases, Deep Linking, and Google AdMob Ads integration. Focused on clean architecture, scalable performance, and advanced state management using Redux, Riverpod, and RxDart, ensuring maintainable and production-ready apps.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["Flutter", "Dart", "React Native", "TypeScript", "Redux", "Riverpod", "RxDart", "REST APIs", "Firebase", "Deep Linking", "In-App Purchases", "Google AdMob", "Push Notifications", "Git", "Play Store & App Store Deployment"].map((tech, i) => (
                            <span key={i} className="text-xs font-medium text-foreground/60 bg-muted px-2 py-1 rounded border border-border">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: "Dec 2023 - May 2024",
            content: (
                <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Mobile App Development Intern</h3>
                    <a href="https://webmobtech.com/" target="_blank" rel="noopener noreferrer">
                        <h4 className="text-xl font-semibold text-[#b087ff] mb-2 hover:underline cursor-pointer inline-block">WebMobTech Solutions Pvt. Ltd.</h4>
                    </a>
                    <p className="text-sm text-gray-500 mb-4">📍 Ahmedabad</p>
                    <p className="text-foreground/80 text-base leading-relaxed mb-6">
                        Completed structured React Native training and developed 3+ training projects, focusing on real-world app development patterns. Gained hands-on experience with scalable state management using Redux and built type-safe applications using TypeScript.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["React Native", "JavaScript", "TypeScript", "Redux", "API Integration", "Git"].map((tech, i) => (
                            <span key={i} className="text-xs font-medium text-foreground/60 bg-muted px-2 py-1 rounded border border-border">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: "May 2023 - June 2023",
            content: (
                <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Front End Developer Intern</h3>
                    <a href="https://tatvasoft.com/" target="_blank" rel="noopener noreferrer">
                        <h4 className="text-xl font-semibold text-[#b087ff] mb-2 hover:underline cursor-pointer inline-block">Tatvasoft</h4>
                    </a>
                    <p className="text-sm text-gray-500 mb-4">📍 Ahmedabad</p>
                    <p className="text-foreground/80 text-base leading-relaxed mb-6">
                        Built an Online Book Store system with user cart features and an admin panel for managing orders and quality control. Worked across frontend + backend integration, delivering a complete functional web solution.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {["React.js", "Tailwind CSS", "Material UI", "Node.js", "Express.js", "MongoDB"].map((tech, i) => (
                            <span key={i} className="text-xs font-medium text-foreground/60 bg-muted px-2 py-1 rounded border border-border">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            ),
        }
    ];

    return (
        <section id="experience" className="bg-background transition-colors duration-300">
            <Timeline data={data} />
        </section>
    );
};
