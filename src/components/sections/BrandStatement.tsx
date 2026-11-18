"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BrandStatement() {
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
            { threshold: 0.18 },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-labelledby="brand-statement-heading"
            className="relative overflow-hidden bg-[#1D1008] py-20 text-[#f7efe4] sm:py-24 lg:py-32"
        >
            {/* Subtle Ambient Espresso Glow matching Hero Transition */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_50%,#4E2E19_0%,#26150B_52%,#180D06_100%)]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
            />

            <div className="section-shell relative z-10 mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-14">
                <div className="grid items-center gap-12 md:grid-cols-[0.92fr_1.08fr] md:gap-14 lg:gap-24">
                    {/* Left Column: Circular Framed Coffee Hands + Subtle Watermark */}
                    <div
                        className={`relative mx-auto flex w-full max-w-[440px] items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] md:mx-0 md:max-w-none ${
                            isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                        }`}
                    >
                        {/* Soft Warm Backlight Behind Circle */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(214,161,116,0.24)_0%,rgba(214,161,116,0.05)_60%,transparent_75%)] blur-2xl sm:h-[350px] sm:w-[350px] lg:h-[450px] lg:w-[450px]"
                        />

                        {/* Outer Decorative Ring + Round Circle Image Container */}
                        <div className="group relative flex h-[280px] w-[280px] items-center justify-center rounded-full border border-[#d6a174]/30 p-2.5 shadow-[0_28px_60px_rgba(0,0,0,0.65)] transition-all duration-500 hover:border-[#d6a174]/60 sm:h-[350px] sm:w-[350px] lg:h-[440px] lg:w-[440px]">
                            <div className="relative h-full w-full overflow-hidden rounded-full border border-white/15 bg-[#583f32]">
                                <Image
                                    src="/images/coffee-hands.png"
                                    alt="Hands coming together with specialty coffee and iced drinks"
                                    fill
                                    unoptimized
                                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 350px, 440px"
                                    className="scale-125 object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.32]"
                                />

                                {/* Subtle Inner Vignette for Depth */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_36px_rgba(0,0,0,0.55)]"
                                />
                            </div>

                            {/* Floating Pill Tag Anchored on Circle Edge */}
                            <span className="eyebrow absolute -bottom-3 -left-4 whitespace-nowrap rounded-full border border-white/20 bg-[#f7efe4] px-4 py-2 text-[9px] font-bold tracking-[0.2em] text-[#211710] shadow-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1 sm:bottom-2 sm:-left-6">
                                EST. FOR THE CURIOUS
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Brand Philosophy & Story Link */}
                    <div
                        className={`flex flex-col items-start transition-all delay-150 duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-10 opacity-0"
                        }`}
                    >
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-8 bg-[#d6a174]" />
                            <p className="eyebrow text-[11px] font-semibold tracking-[0.22em] text-[#d6a174]">
                                MORE THAN A CUP
                            </p>
                        </div>

                        <h2
                            id="brand-statement-heading"
                            className="display-font text-balance font-black uppercase tracking-[-0.04em] text-[#f7efe4] text-[clamp(40px,5.6vw,82px)] leading-[0.94]"
                        >
                            COFFEE IS A
                            <br />
                            DAILY RITUAL.
                            <br />
                            <span className="text-[#d6a174]">MAKE IT</span>
                            <br />
                            YOURS.
                        </h2>

                        <p className="mt-7 max-w-[490px] text-sm leading-7 text-white/75 sm:text-[15px] sm:leading-8">
                            We believe the best moments are often the simplest.
                            A familiar place, an unexpected flavour, a
                            conversation that runs a little longer. MŌRA is our
                            invitation to slow down and savour it.
                        </p>

                        {/* Interactive Pill CTA matching Hero's UI */}
                        <div className="mt-9 flex flex-wrap items-center gap-6">
                            <Link
                                href="/our-story"
                                className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:text-[#211710] active:scale-95"
                            >
                                <span>A little about us</span>
                                <span
                                    aria-hidden="true"
                                    className="text-sm leading-none transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                                >
                                    ↗
                                </span>
                            </Link>

                            <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                                Kandy · Specialty Coffee
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
