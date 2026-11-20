"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowUpRightIcon,
    ArrowUpRightIconHandle,
} from "@animateicons/react/lucide";

export default function StoryPreview() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const iconRef = useRef<ArrowUpRightIconHandle>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [rotation, setRotation] = useState<number>(0);

    // Interactive Desktop Drag-to-Rotate Refs
    const wheelContainerRef = useRef<HTMLDivElement | null>(null);
    const rotationRef = useRef<number>(0);
    const velocityRef = useRef<number>(0);
    const isDraggingRef = useRef<boolean>(false);
    const lastAngleRef = useRef<number>(0);

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

    // Continuous Desktop Rotation Loop (Auto-Spin + Drag Momentum)
    useEffect(() => {
        let rafId: number;
        let lastTime = performance.now();

        const animate = (now: number) => {
            const dt = Math.min((now - lastTime) / 1000, 0.05);
            lastTime = now;

            if (window.innerWidth >= 1024 && !isDraggingRef.current) {
                rotationRef.current =
                    (rotationRef.current + (10 + velocityRef.current) * dt) %
                    360;
                velocityRef.current *= 0.92;
                if (Math.abs(velocityRef.current) < 0.05) {
                    velocityRef.current = 0;
                }
                setRotation(rotationRef.current);
            }

            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId);
    }, []);

    const getPointerAngle = (clientX: number, clientY: number) => {
        const rect = wheelContainerRef.current?.getBoundingClientRect();
        if (!rect) return 0;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        return (
            Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI)
        );
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (window.innerWidth < 1024 || e.button !== 0) return;

        e.currentTarget.setPointerCapture(e.pointerId);
        isDraggingRef.current = true;
        setIsDragging(true);
        velocityRef.current = 0;
        lastAngleRef.current = getPointerAngle(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current) return;

        const currentAngle = getPointerAngle(e.clientX, e.clientY);
        let delta = currentAngle - lastAngleRef.current;

        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        rotationRef.current = (rotationRef.current + delta) % 360;
        velocityRef.current = delta * 35;
        lastAngleRef.current = currentAngle;
        setRotation(rotationRef.current);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current) return;
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
        }
        isDraggingRef.current = false;
        setIsDragging(false);
    };

    return (
        <section
            id="story-preview"
            ref={sectionRef}
            aria-labelledby="story-preview-heading"
            className="relative overflow-hidden bg-[#1D1008] py-20 text-[#f7efe4] sm:py-24 lg:py-32"
        >
            {/* One-Time Scroll Reveal + Mobile/Tablet Linear Rotation */}
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
                @media (min-width: 1024px) {
                    .desktop-manual-spin {
                        animation: none !important;
                    }
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

            {/* Giant Vertical Right-Side Watermark Placeholder (Tablet & Desktop only) */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-10 right-0 z-0 hidden select-none items-center justify-end overflow-hidden md:flex lg:inset-y-14"
            >
                <span className="font-sans origin-center translate-x-[28%] -rotate-90 whitespace-nowrap font-extrabold uppercase leading-none tracking-[-0.04em] text-[#f7efe4]/[0.035] text-[clamp(120px,13vw,200px)]">
                    STORY
                </span>
            </div>

            {/* TABLET ONLY (md to < lg): Flush Left Edge 180° Half-Circle with Half Rotating Image */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-1/2 z-0 hidden h-[480px] w-[240px] -translate-y-1/2 overflow-hidden rounded-r-full border-y border-r border-[#d6a174]/25 bg-[#2A170D]/40 shadow-[0_24px_50px_rgba(0,0,0,0.5)] md:block lg:hidden"
            >
                <div className="pointer-events-none absolute inset-y-6 left-0 w-[480px] -translate-x-1/2 rounded-full bg-[#d6a174]/15 blur-3xl" />
                <div className="pointer-events-none absolute inset-y-4 left-0 w-[448px] -translate-x-1/2 rounded-r-full border-y border-r border-dashed border-[#d6a174]/25" />

                <div className="relative h-[480px] w-[480px] -translate-x-1/2">
                    <div className="animate-table-spin relative h-full w-full scale-[1.15]">
                        <Image
                            src="/images/drinks/coffee-table.png"
                            alt="Overhead view of MŌRA coffee table"
                            fill
                            unoptimized
                            sizes="480px"
                            className="object-contain object-center drop-shadow-[0_28px_42px_rgba(0,0,0,0.65)]"
                        />
                    </div>
                </div>
            </div>

            <div className="section-shell relative z-10 mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-14">
                <div className="grid items-center gap-12 md:grid-cols-[240px_1fr] md:gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
                    {/* Left Column */}
                    <div
                        style={
                            isVisible
                                ? { animationDelay: "0ms" }
                                : { opacity: 0 }
                        }
                        className={`relative mx-auto flex w-full max-w-[480px] flex-col items-center justify-center md:mx-0 md:h-[480px] md:max-w-none lg:h-auto ${
                            isVisible ? "story-reveal" : ""
                        }`}
                    >
                        {/* MOBILE (< md) & DESKTOP (lg+): Interactive Drag-to-Rotate on Desktop */}
                        <div
                            ref={wheelContainerRef}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={handlePointerUp}
                            className={`relative flex aspect-square w-full max-w-[500px] select-none items-center justify-center md:hidden lg:flex lg:max-w-[540px] ${
                                isDragging
                                    ? "lg:cursor-grabbing"
                                    : "lg:cursor-grab"
                            }`}
                        >
                            <div
                                aria-hidden="true"
                                className={`pointer-events-none absolute inset-8 rounded-full blur-3xl transition-colors duration-300 ${
                                    isDragging
                                        ? "bg-[#d6a174]/22"
                                        : "bg-[#d6a174]/12"
                                }`}
                            />
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-3 rounded-full border border-white/[0.07]"
                            />
                            <div
                                aria-hidden="true"
                                className={`pointer-events-none absolute inset-10 rounded-full border border-dashed transition-colors duration-300 ${
                                    isDragging
                                        ? "border-[#d6a174]/45"
                                        : "border-[#d6a174]/20"
                                }`}
                            />

                            {/* Base 1.1x Scale Wrapper */}
                            <div className="pointer-events-none relative h-full w-full scale-110">
                                <div
                                    className="animate-table-spin desktop-manual-spin relative h-full w-full"
                                    style={{
                                        transform: `rotate3d(0, 0, 1, ${rotation}deg)`,
                                        willChange: "transform",
                                    }}
                                >
                                    <Image
                                        src="/images/drinks/coffee-table.png"
                                        alt="Overhead view of MŌRA coffee table — drag to rotate"
                                        fill
                                        draggable={false}
                                        unoptimized
                                        sizes="(max-width: 768px) 92vw, 46vw"
                                        className="object-contain object-center drop-shadow-[0_28px_42px_rgba(0,0,0,0.65)]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* MOBILE (< md) & DESKTOP (lg+): Caption Pill Below Left Visual */}
                        <div className="relative z-10 mt-5 flex items-center gap-3.5 rounded-full border border-white/15 bg-[#1D1008]/85 px-5 py-2.5 backdrop-blur-md md:hidden lg:flex">
                            <span
                                aria-hidden="true"
                                className="text-xs text-[#d6a174]"
                            >
                                ✦
                            </span>
                            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#d6a174]">
                                MŌRA ROASTERY & BAR
                            </span>
                            <span className="hidden text-white/30 sm:inline">
                                ·
                            </span>
                            <span className="hidden font-sans text-xs font-medium text-[#f7efe4]/85 sm:inline">
                                Crafted for quiet mornings
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Editorial Typography, Story CTA & (on Tablet) Caption Pill */}
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

                        {/* Smooth Pill CTA matching Previous Sections */}
                        <div className="mt-9 flex flex-wrap items-center gap-6">
                            <Link
                                href="/our-story"
                                onMouseEnter={() =>
                                    iconRef.current?.startAnimation()
                                }
                                onMouseLeave={() =>
                                    iconRef.current?.stopAnimation()
                                }
                                className="group inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:text-[#211710] active:scale-95"
                            >
                                <span>Read our story</span>
                                <ArrowUpRightIcon
                                    ref={iconRef}
                                    size={22}
                                    duration={1}
                                    color="currentColor"
                                />
                            </Link>

                            <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                                Est. Kandy · Small Batch
                            </span>
                        </div>

                        {/* TABLET ONLY (md to < lg): Caption Pill Placed on Right Side */}
                        <div className="relative z-10 mt-7 hidden items-center gap-3.5 rounded-full border border-white/15 bg-[#1D1008]/85 px-5 py-2.5 backdrop-blur-md md:flex lg:hidden">
                            <span
                                aria-hidden="true"
                                className="text-xs text-[#d6a174]"
                            >
                                ✦
                            </span>
                            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#d6a174]">
                                MŌRA ROASTERY & BAR
                            </span>
                            <span className="text-white/30">·</span>
                            <span className="font-sans text-xs font-medium text-[#f7efe4]/85">
                                Crafted for quiet mornings
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
