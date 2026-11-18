"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);

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
            { threshold: 0.15 },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const scrollToCard = (index: number) => {
        const track = trackRef.current;
        if (!track) return;

        const clamped = Math.max(0, Math.min(index, testimonials.length - 1));
        const card = track.children[clamped] as HTMLElement | undefined;

        if (card) {
            card.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start",
            });
            setActiveIndex(clamped);
        }
    };

    const handleScroll = () => {
        const track = trackRef.current;
        if (!track) return;

        const cards = Array.from(track.children) as HTMLElement[];
        if (cards.length === 0) return;

        const trackLeft = track.scrollLeft;
        let closestIdx = 0;
        let minDiff = Infinity;

        cards.forEach((card, idx) => {
            const diff = Math.abs(card.offsetLeft - trackLeft);
            if (diff < minDiff) {
                minDiff = diff;
                closestIdx = idx;
            }
        });

        setActiveIndex(closestIdx);
    };

    return (
        <section
            id="testimonials"
            ref={sectionRef}
            aria-labelledby="testimonials-heading"
            className="relative overflow-hidden bg-[#1D1008] py-20 text-[#f7efe4] sm:py-24 lg:py-32"
        >
            {/* One-Time Scroll Reveal Keyframes */}
            <style jsx>{`
                @keyframes testimonialReveal {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 24px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
                .testimonial-reveal {
                    animation: testimonialReveal 0.7s
                        cubic-bezier(0.22, 1, 0.36, 1) both;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* Warm Espresso Radial Glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,#4E2E19_0%,#26150B_54%,#180D06_100%)]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
            />

            <div className="section-shell relative z-10 mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-14">
                {/* Section Header + Scroll Arrows */}
                <div
                    style={
                        isVisible ? { animationDelay: "0ms" } : { opacity: 0 }
                    }
                    className={`flex flex-col justify-between gap-6 md:flex-row md:items-end ${
                        isVisible ? "testimonial-reveal" : ""
                    }`}
                >
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-8 bg-[#d6a174]" />
                            <p className="eyebrow text-[11px] font-semibold tracking-[0.22em] text-[#d6a174]">
                                KIND WORDS, GOOD COMPANY
                            </p>
                        </div>
                        <h2
                            id="testimonials-heading"
                            className="display-font font-black uppercase tracking-[-0.04em] text-[#f7efe4] text-[clamp(40px,5.8vw,82px)] leading-[0.92]"
                        >
                            THE BEST PART IS
                            <br />
                            <span className="text-[#d6a174]">SHARING IT.</span>
                        </h2>
                    </div>

                    <div className="flex flex-col items-start gap-5 md:items-end">
                        <p className="max-w-[290px] text-sm leading-7 text-white/75 md:text-right">
                            Notes from guests who make MŌRA part of their
                            everyday rhythm.
                        </p>

                        {/* Horizontal Scroll Controls */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => scrollToCard(activeIndex - 1)}
                                disabled={activeIndex === 0}
                                aria-label="Previous testimonial"
                                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 text-sm text-[#f7efe4] transition-transform duration-200 ease-out hover:scale-105 hover:border-[#d6a174] hover:text-[#d6a174] active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100"
                            >
                                ←
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollToCard(activeIndex + 1)}
                                disabled={
                                    activeIndex >= testimonials.length - 1
                                }
                                aria-label="Next testimonial"
                                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 text-sm text-[#f7efe4] transition-transform duration-200 ease-out hover:scale-105 hover:border-[#d6a174] hover:text-[#d6a174] active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Smooth Horizontal Scrollable Client Cards Track */}
                <div
                    ref={trackRef}
                    onScroll={handleScroll}
                    role="region"
                    aria-label="Client testimonials carousel"
                    tabIndex={0}
                    className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pt-2 focus:outline-none md:mt-14 lg:gap-7"
                >
                    {testimonials.map((item, idx) => {
                        const indexLabel =
                            item.id || String(idx + 1).padStart(2, "0");

                        return (
                            <figure
                                key={item.id ?? `${item.name}-${idx}`}
                                style={
                                    isVisible
                                        ? {
                                              animationDelay: `${Math.min(idx, 3) * 90}ms`,
                                          }
                                        : { opacity: 0 }
                                }
                                className={`group relative flex w-[88%] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-[#2A170D]/90 p-7 shadow-[20px_0_20px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out hover:-translate-y-1.5 sm:w-[62%] sm:p-9 lg:w-[calc(50%-0.875rem)] lg:p-11 ${
                                    isVisible ? "testimonial-reveal" : ""
                                }`}
                            >
                                {/* Oversized Quote Mark & Index */}
                                <div
                                    aria-hidden="true"
                                    className="mb-5 flex items-center justify-between"
                                >
                                    <span className="font-serif text-5xl leading-none text-[#d6a174]/40 transition-colors duration-300 group-hover:text-[#d6a174]/70 sm:text-6xl">
                                        “
                                    </span>
                                    <span className="font-black tracking-[0.18em] text-white/[0.08] text-xl">
                                        {indexLabel}
                                    </span>
                                </div>

                                {/* Client Quote */}
                                <blockquote className="relative z-10 font-serif text-[clamp(20px,2.3vw,30px)] leading-[1.32] text-[#f7efe4]">
                                    {item.quote}
                                </blockquote>

                                {/* Sri Lankan Client Attribution */}
                                <figcaption className="mt-9 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                                    <div className="flex items-center gap-3">
                                        <span className="h-2 w-2 rounded-full bg-[#d6a174]" />
                                        <span className="eyebrow text-xs font-bold tracking-[0.18em] text-[#f7efe4] transition-colors duration-200 group-hover:text-[#d6a174]">
                                            {item.name}
                                        </span>
                                    </div>
                                    <span className="rounded-full border border-[#d6a174]/25 bg-[#1D1008]/75 px-3.5 py-1 text-[11px] font-medium tracking-wide text-[#d8a477]">
                                        {item.detail}
                                    </span>
                                </figcaption>
                            </figure>
                        );
                    })}
                </div>

                {/* Scroll Progress Dots */}
                <div className="mt-6 flex items-center justify-center gap-2.5">
                    {testimonials.map((item, idx) => {
                        const isCurrent = idx === activeIndex;
                        return (
                            <button
                                key={item.id ?? idx}
                                type="button"
                                onClick={() => scrollToCard(idx)}
                                aria-label={`Go to testimonial from ${item.name}`}
                                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                                    isCurrent
                                        ? "w-7 bg-[#d6a174]"
                                        : "w-2 bg-white/25 hover:bg-white/50"
                                }`}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
