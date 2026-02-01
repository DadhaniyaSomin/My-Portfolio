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
                            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl shadow-2xl dark:shadow-black/50">
                                <img
                                    src="/profile.jpg"
                                    alt="Tushar Pankhaniya"
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
                                        I am a Mobile App Developer specializing in React Native and Flutter with experience building scalable, high-performance cross-platform applications. With over 2 years of professional experience, I’ve worked on developing apps with seamless UI/UX, smooth performance, and robust integrations.
                                    </p>
                                    <p>
                                        At WebMobTech Solutions, I design and develop mobile applications with a focus on clean architecture, efficient state management (RxDart, Redux), and smooth deployment on both Android and iOS platforms.
                                    </p>
                                    <p>
                                        I am always exploring the latest in mobile technologies, such as AI-powered mobile apps and cross-platform architecture, to create impactful user experiences.
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
