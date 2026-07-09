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
                                        My passion lies at the intersection of logic and creativity — engineering robust, scalable systems and crafting intuitive digital experiences. With a Bachelor of Technology in Computer Science and 3 years of full-lifecycle development experience, I bring a unique perspective to software engineering.
                                    </p>
                                    <p>
                                        I don&apos;t just write code — I engineer solutions that balance technical excellence with user-centric design principles, ensuring the applications I build are both powerful and delightful to use.
                                    </p>
                                    <p>
                                        I am actively expanding my expertise into high-performance systems with Golang, complemented by robust DevOps practices including Docker, Kubernetes, and CI/CD pipelines.
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
