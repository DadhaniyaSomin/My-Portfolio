"use client";

import { motion } from "framer-motion";
import { CardWithCorners } from "@/components/ui/card-with-corners";

export const AboutSection = () => {
    return (
        <section id="about" className="border-b border-neutral-200 bg-white py-20 md:px-6">
            <div className="container mx-auto max-w-6xl relative z-10">
                <CardWithCorners className="border-2 border-black bg-white p-5 shadow-[5px_5px_0_#00b8d4] md:p-10">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">

                        {/* Left Column - Image */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="relative min-h-[320px] w-full flex items-center justify-center overflow-hidden border-2 border-black md:min-h-[440px]">
                                <img
                                    src="/profession.jpg"
                                    alt="Somin Dadhaniya — Backend Software Engineer specializing in scalable systems and APIs"
                                    className="absolute inset-0 h-full w-full object-cover grayscale"
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
                                <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[.16em] text-cyan-700">02 / About</p>
                                <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-black uppercase tracking-[-.06em]">
                                    About Me
                                </h2>

                                <div className="space-y-5 font-mono text-sm leading-7 text-neutral-700">
                                    <p>I’m a backend software engineer with a Computer Science degree and 4+ years of experience building APIs, backend services, and integrations for mobile apps and partner systems.</p>
                                    <p>My work spans Go reporting services and Laravel products, with PostgreSQL, MySQL, Redis, Docker, and cloud infrastructure. I’m drawn to the engineering details that make systems dependable: clear API contracts, efficient data paths, and releases a team can repeat.</p>
                                    <p>I see software as a team effort. I try to make technical decisions understandable, write code with its next maintainer in mind, and collaborate from early design through delivery.</p>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </CardWithCorners>
            </div>
        </section>
    );
};
