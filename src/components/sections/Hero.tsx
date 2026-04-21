"use client";

import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";

const LOAD = 1.7;

const currently = [
    "taking calls from people with interesting problems.",
    "building, hiring, breaking, fixing.",
    "reachable. always. especially for hard problems.",
    "scaling a team that ships on friday.",
    "open to founding roles, leadership, or just a good chat."
];

export default function Hero() {
    const [time, setTime] = useState("");
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const fmt = () => {
            const d = new Date();
            const h = String(d.getHours()).padStart(2, "0");
            const m = String(d.getMinutes()).padStart(2, "0");
            return `${h}:${m}`;
        };
        setTime(fmt());
        const i = setInterval(() => setTime(fmt()), 15000);
        return () => clearInterval(i);
    }, []);

    useEffect(() => {
        const i = setInterval(
            () => setIdx((x) => (x + 1) % currently.length),
            4200
        );
        return () => clearInterval(i);
    }, []);

    return (
        <section
            id="hero"
            className="relative min-h-screen w-full overflow-hidden flex flex-col justify-end pt-24 pb-10"
        >
            {/* Live status strip */}
            <motion.div
                initial={{opacity: 0, y: -6}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: LOAD - 0.2, duration: 0.7}}
                className="absolute top-24 md:top-28 left-6 md:left-10 lg:left-16 z-10 flex items-center gap-2.5 pointer-events-auto"
            >
                <span className="relative flex h-2 w-2">
                    <span className="status-pulse absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="font-display italic text-[13px] md:text-[14px] text-ink/75 leading-none">
                    shipping at macro rides.
                </span>
                <span className="hidden sm:inline text-ink/25">/</span>
                <span className="hidden sm:inline font-display italic text-[13px] md:text-[14px] text-ink/55 leading-none tabular-nums">
                    {time || "··:··"}
                </span>
            </motion.div>

            {/* Main hero */}
            <div className="relative z-10 px-6 md:px-10 lg:px-16 pointer-events-none">
                <motion.h1
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{
                        delay: LOAD + 0.1,
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="font-display leading-[0.9] tracking-[-0.03em] text-ink max-w-[10ch] mix-blend-multiply"
                >
                    <span className="block text-[clamp(64px,13vw,200px)] distort">
                        Pooja
                    </span>
                    <span className="block text-[clamp(64px,13vw,200px)] italic text-accent mt-[-0.1em] distort">
                        Kushwah.
                    </span>
                </motion.h1>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: LOAD + 0.6, duration: 0.8}}
                    className="mt-8 md:mt-10 max-w-xl pointer-events-auto"
                >
                    <p className="font-display text-[clamp(20px,2.4vw,32px)] leading-[1.15] tracking-[-0.02em] text-ink">
                        Give me a problem no one wants to touch.{" "}
                        <em className="text-accent">I&apos;ll ship it.</em>
                    </p>
                    <p className="mt-3 font-sans text-[14px] md:text-[15px] leading-relaxed text-ink/65 max-w-md">
                        7 years. 4 companies. 1 startup I co-founded. Strap in.
                    </p>
                </motion.div>

                {/* Currently rotator */}
                <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: LOAD + 0.75, duration: 0.7}}
                    className="mt-7 md:mt-8 flex items-center gap-3 md:gap-4 max-w-full pointer-events-auto"
                >
                    <span className="block w-10 md:w-12 h-[1.5px] bg-accent/70" />
                    <span className="font-display italic text-[15px] md:text-[16px] text-ink/60 leading-none shrink-0">
                        currently,
                    </span>
                    <span className="relative flex-1 h-[32px] overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={idx}
                                initial={{y: 32, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                exit={{y: -32, opacity: 0}}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="absolute inset-0 font-display italic font-bold text-[19px] md:text-[24px] text-[#A8722A] leading-[32px] whitespace-nowrap"
                            >
                                {currently[idx]}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                </motion.div>

                <motion.div
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: LOAD + 0.95, duration: 0.6}}
                    className="mt-7 flex flex-wrap items-center gap-3 pointer-events-auto"
                >
                    <a
                        href="#work"
                        className="group inline-flex items-center gap-2 bg-ink text-cream font-sans font-medium text-[13px] px-6 py-3 rounded-full hover:bg-accent transition-colors duration-300"
                        data-hover
                    >
                        Start the ride
                        <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">
                            →
                        </span>
                    </a>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 border border-ink/30 hover:border-ink text-ink font-sans font-medium text-[13px] px-6 py-3 rounded-full transition-all"
                        data-hover
                    >
                        Say hi
                    </a>
                </motion.div>
            </div>

            {/* Bottom scroll cue */}
            <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: LOAD + 1.2, duration: 0.6}}
                className="relative z-10 px-6 md:px-10 lg:px-16 mt-10 flex items-end"
            >
                <motion.div
                    animate={{y: [0, 6, 0]}}
                    transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="flex items-center gap-2 text-ink/45"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
}
