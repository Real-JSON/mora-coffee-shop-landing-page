"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function StoryPreview() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.16 },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="story-preview"
            ref={sectionRef}
            aria-labelledby="story-preview-heading"
            className="relative overflow-hidden bg-[#1D1008] py-20 text-[#f7efe4] sm:py-24 lg:py-32"
        >
            {/* One-Time Scroll Reveal + Smooth Infinite Linear Rotation */}
            <style jsx>{`
                @keyframes storyReveal {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 24px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
                @keyframes slowTableSpin {
                    from {
                        transform: rotate3d(0, 0, 1, 0deg);
                    }
                    to {
                        transform: rotate3d(0, 0, 1, 360deg);
                    }
                }
                .story-reveal {
                    animation: storyReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1)
                        both;
                }
                .animate-table-spin {
                    animation: slowTableSpin 38s linear infinite;
                    will-change: transform;
                }
            `}</style>

            {/* Warm Espresso Radial Glow matching Previous Sections */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#4E2E19_0%,#26150B_54%,#180D06_100%)]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
            />

            {/* Subtle Giant Background Brand Watermark */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 right-4 z-0 hidden select-none font-black uppercase leading-none tracking-[-0.04em] text-white/[0.03] text-[150px] lg:block xl:text-[200px]"
            >
                STORY
            </div>

            <div className="section-shell relative z-10 mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-14">
                <div className="grid items-center gap-12 md:grid-cols-[0.95fr_1.05fr] md:gap-14 lg:gap-20">
                    {/* Left Column: Infinite Rotating Transparent Coffee Table */}
                    <div
                        style={
                            isVisible
                                ? { animationDelay: "0ms" }
                                : { opacity: 0 }
                        }
                        className={`relative mx-auto flex w-full max-w-[440px] flex-col items-center justify-center md:mx-0 md:max-w-none ${
                            isVisible ? "story-reveal" : ""
                        }`}
                    >
                        {/* Ambient Glow & Subtle Orbital Rings behind Rotating Table */}
                        <div className="group relative flex aspect-square w-full max-w-[460px] items-center justify-center">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-8 rounded-full bg-[#d6a174]/12 blur-3xl"
                            />
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-3 rounded-full border border-white/[0.07]"
                            />
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-10 rounded-full border border-dashed border-[#d6a174]/20"
                            />

                            {/* Smooth Scale Wrapper on Hover */}
                            <div className="relative h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
                                {/* Infinite 360° Rotating Table PNG */}
                                <div className="animate-table-spin relative h-full w-full">
                                    <Image
                                        src="/images/drinks/coffee-table.png"
                                        alt="Overhead view of MŌRA coffee table"
                                        fill
                                        unoptimized
                                        sizes="(max-width: 768px) 85vw, 42vw"
                                        className="object-contain object-center drop-shadow-[0_28px_42px_rgba(0,0,0,0.65)]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Clean Editorial Caption Pill Below Table */}
                        <div className="mt-4 flex items-center gap-3.5 rounded-full border border-white/15 bg-[#1D1008]/85 px-5 py-2.5 backdrop-blur-md">
                            <span
                                aria-hidden="true"
                                className="text-xs text-[#d6a174]"
                            >
                                ✦
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d6a174]">
                                MŌRA ROASTERY & BAR
                            </span>
                            <span className="hidden text-white/30 sm:inline">
                                ·
                            </span>
                            <span className="hidden font-serif text-xs text-[#f7efe4]/85 sm:inline">
                                Crafted for quiet mornings
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Editorial Typography & Story CTA */}
                    <div
                        style={
                            isVisible
                                ? { animationDelay: "120ms" }
                                : { opacity: 0 }
                        }
                        className={`flex flex-col items-start ${
                            isVisible ? "story-reveal" : ""
                        }`}
                    >
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-8 bg-[#d6a174]" />
                            <p className="eyebrow text-[11px] font-semibold tracking-[0.22em] text-[#d6a174]">
                                A NOTE FROM MŌRA
                            </p>
                        </div>

                        <h2
                            id="story-preview-heading"
                            className="display-font text-balance font-black uppercase tracking-[-0.04em] text-[#f7efe4] text-[clamp(40px,5.6vw,80px)] leading-[0.92]"
                        >
                            ROOTED IN
                            <br />
                            THE EVERYDAY.
                            <br />
                            <span className="text-[#d6a174]">OPEN TO</span>
                            <br />
                            THE UNEXPECTED.
                        </h2>

                        <p className="mt-7 max-w-[460px] text-sm leading-7 text-white/75 sm:text-[15px] sm:leading-8">
                            MŌRA began with a simple thought: coffee can be both
                            a comforting ritual and a space for discovery. That
                            idea shapes everything we pour.
                        </p>

                        {/* Pill CTA matching Previous Sections */}
                        <div className="mt-9 flex flex-wrap items-center gap-6">
                            <Link
                                href="/our-story"
                                className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#f7efe4] backdrop-blur-sm transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:border-[#d6a174] hover:bg-[#d6a174] hover:text-[#1D1008] active:scale-95"
                            >
                                <span>Read our story</span>
                                <span
                                    aria-hidden="true"
                                    className="inline-block text-sm leading-none transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5"
                                >
                                    ↗
                                </span>
                            </Link>

                            <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                                Est. Kandy · Small Batch
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
