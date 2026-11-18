"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ExperiencePoint {
    number: string;
    title: string;
    description: string;
    side: "left" | "right";
}

const EXPERIENCE_POINTS: ExperiencePoint[] = [
    {
        number: "01",
        title: "Good things take craft",
        description:
            "Thoughtful sourcing, careful preparation and respect for every ingredient.",
        side: "left",
    },
    {
        number: "02",
        title: "Curiosity is always welcome",
        description:
            "Unexpected combinations and familiar favourites, side by side.",
        side: "left",
    },
    {
        number: "03",
        title: "A place to pause",
        description:
            "An easy-going space for a quick coffee or a slower afternoon.",
        side: "right",
    },
    {
        number: "04",
        title: "Warmth in every detail",
        description:
            "We bring together quality, creativity and a little sense of wonder so the everyday feels special.",
        side: "right",
    },
];

export default function Experience() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [activeNum, setActiveNum] = useState<string | null>(null);

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
            { threshold: 0.14 },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const leftPoints = EXPERIENCE_POINTS.filter((p) => p.side === "left");
    const rightPoints = EXPERIENCE_POINTS.filter((p) => p.side === "right");

    return (
        <section
            id="experience"
            ref={sectionRef}
            aria-labelledby="experience-heading"
            className="relative overflow-hidden bg-[#1D1008] py-20 text-[#f7efe4] sm:py-24 lg:py-32"
        >
            {/* Smooth One-Time Reveal + Gentle Center Float Keyframes */}
            <style jsx>{`
                @keyframes experienceReveal {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 22px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
                @keyframes centerCupFloat {
                    0%,
                    100% {
                        transform: translate3d(0, 0, 0) rotate(0deg);
                    }
                    50% {
                        transform: translate3d(0, -8px, 0) rotate(1deg);
                    }
                }
                .exp-reveal {
                    animation: experienceReveal 0.7s
                        cubic-bezier(0.22, 1, 0.36, 1) both;
                }
                .exp-cup-float {
                    animation: centerCupFloat 5.2s ease-in-out infinite;
                }
            `}</style>

            {/* Warm Espresso Radial Glow matching Hero & Collection */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,#4E2E19_0%,#26150B_55%,#180D06_100%)]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
            />

            <div className="section-shell relative z-10 mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-14">
                {/* Top Centered Eyebrow, Heading & Intro */}
                <div
                    style={
                        isVisible ? { animationDelay: "0ms" } : { opacity: 0 }
                    }
                    className={`mx-auto max-w-2xl text-center ${
                        isVisible ? "exp-reveal" : ""
                    }`}
                >
                    <div className="mb-3 inline-flex items-center gap-3">
                        <span className="h-px w-6 bg-[#d6a174]" />
                        <p className="eyebrow text-[11px] font-bold uppercase tracking-[0.22em] text-[#d6a174]">
                            THE MŌRA WAY
                        </p>
                        <span className="h-px w-6 bg-[#d6a174]" />
                    </div>

                    <h2
                        id="experience-heading"
                        className="display-font font-black uppercase tracking-[-0.04em] text-[#f7efe4] text-[clamp(34px,5.2vw,68px)] leading-[0.95]"
                    >
                        A DIFFERENT KIND OF{" "}
                        <span className="text-[#d6a174]">COFFEE MOMENT.</span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-white/70 sm:text-sm sm:leading-7">
                        We bring together quality, creativity and a little sense
                        of wonder. Not to make coffee complicated — to make the
                        everyday feel special.
                    </p>
                </div>

                {/* Main Reference Layout: Left Points | Center Cup | Right Points */}
                <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:mt-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-8 xl:gap-12">
                    {/* Left Column Points (01, 02) */}
                    <div className="flex flex-col gap-10 lg:gap-14">
                        {leftPoints.map((point, idx) => {
                            const isSelected = activeNum === point.number;
                            return (
                                <div
                                    key={point.number}
                                    onMouseEnter={() =>
                                        setActiveNum(point.number)
                                    }
                                    onMouseLeave={() => setActiveNum(null)}
                                    onClick={() =>
                                        setActiveNum((prev) =>
                                            prev === point.number
                                                ? null
                                                : point.number,
                                        )
                                    }
                                    style={
                                        isVisible
                                            ? {
                                                  animationDelay: `${(idx + 1) * 90}ms`,
                                              }
                                            : { opacity: 0 }
                                    }
                                    className={`group relative cursor-default rounded-2xl p-3 transition-transform duration-300 ease-out hover:-translate-y-1 ${
                                        isVisible ? "exp-reveal" : ""
                                    }`}
                                >
                                    {/* Large Background Number behind Point */}
                                    <span
                                        aria-hidden="true"
                                        className={`pointer-events-none absolute -left-1 -top-4 select-none font-black leading-none tracking-[-0.05em] transition-colors duration-300 text-[68px] sm:text-[84px] ${
                                            isSelected
                                                ? "text-[#d6a174]/20"
                                                : "text-white/[0.06] group-hover:text-[#d6a174]/15"
                                        }`}
                                    >
                                        {point.number}
                                    </span>

                                    <div className="relative z-10 pl-7 sm:pl-9">
                                        <h3 className="font-serif text-xl font-semibold text-[#f7efe4] transition-colors duration-200 group-hover:text-[#d6a174] sm:text-2xl">
                                            {point.title}
                                        </h3>
                                        <p className="mt-2 max-w-[300px] text-xs leading-6 text-white/65 sm:text-[13px]">
                                            {point.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Centerpiece Floating Cup Visual (Reference Center Focus) */}
                    <div
                        style={
                            isVisible
                                ? { animationDelay: "180ms" }
                                : { opacity: 0 }
                        }
                        className={`relative mx-auto flex flex-col items-center justify-center ${
                            isVisible ? "exp-reveal" : ""
                        }`}
                    >
                        {/* Subtle Warm Halo Behind Cup */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute h-56 w-56 rounded-full bg-[#d6a174]/10 blur-3xl sm:h-72 sm:w-72"
                        />

                        <div className="exp-cup-float relative h-[clamp(230px,34vw,370px)] w-[clamp(190px,28vw,310px)] transition-transform duration-300 ease-out hover:scale-105">
                            <Image
                                src="/images/drinks/cappuccino-splash.png"
                                alt="Signature MŌRA coffee cup centerpiece"
                                fill
                                unoptimized
                                sizes="(max-width: 1140px) 220px, 310px"
                                className="object-contain object-center drop-shadow-[0_28px_40px_rgba(0,0,0,0.65)]"
                            />
                        </div>
                    </div>

                    {/* Right Column Points (03, 04) */}
                    <div className="flex flex-col gap-10 lg:gap-14">
                        {rightPoints.map((point, idx) => {
                            const isSelected = activeNum === point.number;
                            return (
                                <div
                                    key={point.number}
                                    onMouseEnter={() =>
                                        setActiveNum(point.number)
                                    }
                                    onMouseLeave={() => setActiveNum(null)}
                                    onClick={() =>
                                        setActiveNum((prev) =>
                                            prev === point.number
                                                ? null
                                                : point.number,
                                        )
                                    }
                                    style={
                                        isVisible
                                            ? {
                                                  animationDelay: `${(idx + 3) * 90}ms`,
                                              }
                                            : { opacity: 0 }
                                    }
                                    className={`group relative cursor-default rounded-2xl p-3 transition-transform duration-300 ease-out hover:-translate-y-1 ${
                                        isVisible ? "exp-reveal" : ""
                                    }`}
                                >
                                    {/* Large Background Number behind Point */}
                                    <span
                                        aria-hidden="true"
                                        className={`pointer-events-none absolute -left-1 -top-4 select-none font-black leading-none tracking-[-0.05em] transition-colors duration-300 text-[68px] sm:text-[84px] ${
                                            isSelected
                                                ? "text-[#d6a174]/20"
                                                : "text-white/[0.06] group-hover:text-[#d6a174]/15"
                                        }`}
                                    >
                                        {point.number}
                                    </span>

                                    <div className="relative z-10 pl-7 sm:pl-9">
                                        <h3 className="font-serif text-xl font-semibold text-[#f7efe4] transition-colors duration-200 group-hover:text-[#d6a174] sm:text-2xl">
                                            {point.title}
                                        </h3>
                                        <p className="mt-2 max-w-[300px] text-xs leading-6 text-white/65 sm:text-[13px]">
                                            {point.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Centered Pill CTA (matching reference bottom button & MŌRA UI) */}
                <div
                    style={
                        isVisible ? { animationDelay: "360ms" } : { opacity: 0 }
                    }
                    className={`mt-12 flex justify-center lg:mt-14 ${
                        isVisible ? "exp-reveal" : ""
                    }`}
                >
                    <Link
                        href="/menu"
                        className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-[#f7efe4] backdrop-blur-sm transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:border-[#d6a174] hover:bg-[#d6a174] hover:text-[#1D1008] active:scale-95"
                    >
                        <span>Explore the experience</span>
                        <span
                            aria-hidden="true"
                            className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                        >
                            →
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
