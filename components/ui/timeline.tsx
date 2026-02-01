"use client";
import {
    useMotionValueEvent,
    useScroll,
    useTransform,
    motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className="w-full bg-background font-sans md:px-10 transition-colors duration-300"
            ref={containerRef}
        >
            <div className="max-w-6xl mx-auto py-0 px-4 md:px-8 lg:px-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground uppercase tracking-tight">
                        Experience
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        My professional journey so far
                    </p>
                </div>
            </div>

            <div ref={ref} className="relative max-w-6xl mx-auto pb-20">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-start pt-10 md:pt-40 md:gap-10"
                    >
                        <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            <div className="h-8 w-8 md:h-10 absolute left-4 md:left-3 md:w-10 rounded-full bg-background flex items-center justify-center">
                                <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-muted border border-border" />
                            </div>
                            <h3 className="hidden md:block text-lg md:pl-20 md:text-3xl font-bold text-muted-foreground ">
                                {item.title}
                            </h3>
                        </div>

                        <div className="relative pl-12 pr-4 md:pl-4 w-full">
                            <h3 className="md:hidden block text-xl mb-4 text-left font-bold text-muted-foreground">
                                {item.title}
                            </h3>
                            {item.content}{" "}
                        </div>
                    </div>
                ))}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[4px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0  w-[4px] bg-gradient-to-b from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};
