"use client";

import { motion } from "framer-motion";
import { CardWithCorners } from "@/components/ui/card-with-corners";

export const AboutSection = () => {
    return (
        <section id="about" className="py-20 md:px-6 bg-background relative overflow-hidden transition-colors duration-300">
            <div className="container mx-auto max-w-6xl relative z-10">
                <CardWithCorners className="p-5 md:p-12">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">

                        {/* Left Column - Image */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
                                <img
                                    src="/profession.jpg"
                                    alt="Somin Dadhaniya — Backend Software Engineer specializing in scalable systems and APIs"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Right Column - Content */}
                        <div className="w-full md:w-1/2 h-full flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-2xl md:text-5xl font-bold mb-6 text-foreground uppercase tracking-tight">
                                    About Me
                                </h2>

                                <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
                                    <p>
                                        I'm Somin Dadhaniya. I have a B.Tech in CS and three years of full-lifecycle experience, which mostly means I’ve learned that the fastest way to break a system is to let someone say, "Well, it worked on my machine." I build backend infrastructure that handles real-world chaos without requiring a weekend of emergency patching.
                                    </p>
                                    <p>
                                        Right now, I’m deep in the trenches with Golang, Docker, and Kubernetes. I picked this stack not because I love writing endless lines of YAML, but because I’m genuinely fascinated by distributed systems and I apparently enjoy a good challenge. I don’t just ship code to meet a deadline; I write it with the distinct awareness that a teammate (or future me) has to read it later without losing their sanity.
                                    </p>
                                    <p>
                                        I’m a big believer that software is a team sport. I don’t hide behind my monitor; I prefer to collaborate, survive code reviews together, and iterate until things are actually stable. If your team is looking for a developer who values clean architecture, despises ego-driven coding, and won't vanish the moment a feature goes live—we should connect.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </CardWithCorners>
            </div>
        </section>
    );
};
