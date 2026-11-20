"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
    ArrowUpRightIcon,
    ArrowUpRightIconHandle,
} from "@animateicons/react/lucide";

const EXPLORE_LINKS = [
    { label: "Menu", href: "/menu", tag: "01" },
    { label: "Our story", href: "/our-story", tag: "02" },
    { label: "Contact", href: "/contact", tag: "03" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const footerRef = useRef<HTMLElement | null>(null);
    const ctaIconRef = useRef<ArrowUpRightIconHandle>(null);

    const [isOpenNow, setIsOpenNow] = useState<boolean>(true);
    const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
    const [brewLikes, setBrewLikes] = useState<number>(0);
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
        x: 50,
        y: 50,
    });
    const [isHoveringFooter, setIsHoveringFooter] = useState<boolean>(false);

    // Check Live Kandy Café Opening Hours (07:30 - 20:00 Asia/Colombo)
    useEffect(() => {
        const checkStatus = () => {
            try {
                const now = new Date();
                const slTime = new Date(
                    now.toLocaleString("en-US", { timeZone: "Asia/Colombo" }),
                );
                const totalMins = slTime.getHours() * 60 + slTime.getMinutes();
                // 07:30 (450) to 20:00 (1200)
                setIsOpenNow(totalMins >= 450 && totalMins < 1200);
            } catch {
                setIsOpenNow(true);
            }
        };

        checkStatus();
        const interval = setInterval(checkStatus, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = footerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    const handleCopyEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigator.clipboard?.writeText("hello@mora.example");
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2200);
    };

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer
            ref={footerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHoveringFooter(true)}
            onMouseLeave={() => setIsHoveringFooter(false)}
            aria-labelledby="footer-heading"
            className="relative overflow-hidden bg-[#160C06] text-[#f7efe4]"
        >
            {/* Lightweight Steam Float Keyframe */}
            <style jsx>{`
                @keyframes steamRise {
                    0% {
                        opacity: 0;
                        transform: translateY(2px);
                    }
                    45% {
                        opacity: 0.9;
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-2.5px);
                    }
                }
                .brew-steam {
                    animation: steamRise 2.6s ease-in-out infinite;
                }
            `}</style>

            {/* Top Hairline Rule */}
            <div
                aria-hidden="true"
                className="h-px w-full bg-gradient-to-r from-transparent via-[#d6a174]/35 to-transparent"
            />

            {/* Base Ambient Espresso Radial Glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_30%,#3E2312_0%,#1D1008_55%,#120904_100%)]"
            />

            {/* Interactive Cursor-Tracking Warm Spotlight (Desktop) */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden transition-opacity duration-500 lg:block"
                style={{
                    opacity: isHoveringFooter ? 1 : 0,
                    background: `radial-gradient(520px circle at ${mousePos.x}% ${mousePos.y}%, rgba(214, 161, 116, 0.08), transparent 70%)`,
                }}
            />

            <div className="section-shell relative z-10 mx-auto max-w-[1320px] px-6 pt-16 pb-10 sm:px-10 sm:pt-20 lg:px-14 lg:pt-24">
                {/* Top Row: Live Brewing Status Pill */}
                <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
                        <span
                            aria-hidden="true"
                            className="relative flex h-4 w-4 items-center justify-center text-[#d6a174]"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="h-4 w-4 overflow-visible"
                            >
                                <path
                                    d="M8.5 6.5C8.5 5.2 9.5 4.6 9.5 3.4M13.5 6.5C13.5 5.2 14.5 4.6 14.5 3.4"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    className={
                                        isOpenNow ? "brew-steam" : "opacity-40"
                                    }
                                />
                                <path
                                    d="M5 10H16.5V14.5C16.5 17.5376 14.0376 20 11 20C7.96243 20 5.5 17.5376 5.5 14.5V10H5Z"
                                    fill="currentColor"
                                    fillOpacity={isOpenNow ? "0.25" : "0.1"}
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M16.5 11.5H18.25C19.4926 11.5 20.5 12.5074 20.5 13.75C20.5 14.9926 19.4926 16 18.25 16H16.5"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>

                        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f7efe4]/90">
                            {isOpenNow
                                ? "Brewing Now · Kandy"
                                : "Resting · Opens 07:30"}
                        </span>
                        <span className="hidden text-white/25 sm:inline">
                            |
                        </span>
                        <span className="hidden font-sans text-[11px] text-white/55 sm:inline">
                            07:30 – 20:00
                        </span>
                    </div>
                </div>

                {/* Main Editorial Split */}
                <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-12">
                    {/* Left: Big Editorial Headline & Equal-Sized Pill CTAs */}
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-8 bg-[#d6a174]" />
                            <p className="eyebrow text-[11px] font-semibold tracking-[0.22em] text-[#d6a174]">
                                A GOOD MOMENT, MADE BETTER
                            </p>
                        </div>

                        <h2
                            id="footer-heading"
                            className="display-font max-w-[640px] font-black uppercase tracking-[-0.04em] text-[#f7efe4] text-[clamp(44px,7.2vw,92px)] leading-[0.89]"
                        >
                            MEET US
                            <br />
                            <span className="text-[#d6a174]">OVER COFFEE.</span>
                        </h2>

                        <div className="mt-9 flex flex-wrap items-center gap-4">
                            <Link
                                href="/contact"
                                onMouseEnter={() =>
                                    ctaIconRef.current?.startAnimation()
                                }
                                onMouseLeave={() =>
                                    ctaIconRef.current?.stopAnimation()
                                }
                                className="group inline-flex h-[48px] min-w-[215px] items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#d6a174] hover:text-[#d6a174] hover:shadow-[0_12px_28px_-6px_rgba(214,161,116,0.25)] active:scale-95"
                            >
                                <span>Plan your visit</span>
                                <ArrowUpRightIcon
                                    ref={ctaIconRef}
                                    size={20}
                                    duration={1}
                                    color="currentColor"
                                />
                            </Link>

                            <Link
                                href="/menu"
                                className="group inline-flex h-[48px] min-w-[215px] items-center justify-center gap-3 rounded-full border border-white/20 bg-transparent px-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#f7efe4]/85 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#d6a174] hover:text-[#d6a174] hover:shadow-[0_12px_28px_-6px_rgba(214,161,116,0.25)] active:scale-95"
                            >
                                <span>Explore menu</span>
                                <span
                                    aria-hidden="true"
                                    className="inline-block text-sm leading-none transition-transform duration-300 ease-out group-hover:translate-x-1"
                                >
                                    →
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Right: 3 Interactive Columns */}
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-t border-white/10 pt-10 text-sm sm:grid-cols-[0.85fr_1.3fr_1fr] lg:border-t-0 lg:pt-0">
                        {/* Column 1: Explore */}
                        <div className="min-w-0">
                            <p className="eyebrow mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d6a174]">
                                Explore
                            </p>
                            <nav
                                aria-label="Footer navigation"
                                className="flex flex-col gap-3"
                            >
                                {EXPLORE_LINKS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="group inline-flex w-fit items-center gap-2 font-sans text-white/75 transition-all duration-300 hover:translate-x-1 hover:text-[#f7efe4]"
                                    >
                                        <span className="font-mono text-[10px] text-[#d6a174]/60 transition-colors group-hover:text-[#d6a174]">
                                            {item.tag}
                                        </span>
                                        <span>{item.label}</span>
                                        <span
                                            aria-hidden="true"
                                            className="text-xs text-[#d6a174] opacity-0 transition-all duration-300 group-hover:opacity-100"
                                        >
                                            ↗
                                        </span>
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Column 2: Say Hello (with One-Click Copy Email) */}
                        <div className="min-w-0">
                            <p className="eyebrow mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d6a174]">
                                Say hello
                            </p>
                            <div className="flex flex-col gap-3 font-sans text-white/75">
                                <button
                                    type="button"
                                    onClick={handleCopyEmail}
                                    title="Click to copy email"
                                    className="group inline-flex w-fit max-w-full cursor-pointer flex-wrap items-center gap-2 text-left transition-colors duration-200 hover:text-[#d6a174]"
                                >
                                    <span className="break-all">
                                        {copiedEmail
                                            ? "Copied!"
                                            : "hello@mora.example"}
                                    </span>
                                    <span className="shrink-0 rounded border border-white/15 bg-white/5 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-white/60 transition-colors group-hover:border-[#d6a174]/40 group-hover:text-[#d6a174]">
                                        {copiedEmail ? "✓" : "Copy"}
                                    </span>
                                </button>

                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group inline-flex w-fit items-center gap-1.5 transition-colors duration-200 hover:text-[#d6a174]"
                                >
                                    <span>Instagram</span>
                                    <span
                                        aria-hidden="true"
                                        className="text-xs opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                                    >
                                        ↗
                                    </span>
                                </a>

                                <span className="text-white/50">
                                    Kandy, Sri Lanka
                                </span>
                            </div>
                        </div>

                        {/* Column 3: The House */}
                        <div className="min-w-0">
                            <p className="eyebrow mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d6a174]">
                                The house
                            </p>
                            <div className="flex flex-col gap-3 font-sans text-white/75">
                                <Link
                                    href="/contact"
                                    className="group inline-flex w-fit items-center gap-1.5 transition-colors duration-200 hover:text-[#d6a174]"
                                >
                                    <span>24, Peradeniya Rd</span>
                                    <span
                                        aria-hidden="true"
                                        className="text-xs opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        ↗
                                    </span>
                                </Link>
                                <span className="text-white/50">
                                    Mon – Sun · 07:30 – 20:00
                                </span>
                                <span className="text-white/50">
                                    Small-batch pours
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Colophon Bar with Interactive "Brewed with ♥" & Right Bottom Reveal Back-to-Top */}
                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-white/50 sm:flex-row">
                    <span>© {currentYear} MŌRA COFFEE HOUSE</span>

                    {/* Interactive "Brewed with ♥" */}
                    <button
                        type="button"
                        onClick={() => setBrewLikes((prev) => prev + 1)}
                        className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[10px] tracking-[0.16em] text-white/65 transition-all duration-300 hover:border-[#d6a174]/40 hover:text-[#f7efe4] active:scale-95"
                        title="Send some coffee love"
                    >
                        <span>Brewed with</span>
                        <span
                            aria-hidden="true"
                            className="inline-block text-xs text-[#d6a174] transition-transform duration-300 group-hover:scale-125 group-active:scale-150"
                        >
                            ♥
                        </span>
                        {brewLikes > 0 && (
                            <span className="ml-1 rounded-full bg-[#d6a174]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#d6a174]">
                                +{brewLikes}
                            </span>
                        )}
                    </button>

                    {/* Right Bottom Corner: Arrow Button that Smoothly Reveals "Back to top" on Hover */}
                    <div className="flex items-center gap-4">
                        <span className="hidden md:inline">
                            THE ART OF EVERY POUR.
                        </span>

                        <button
                            type="button"
                            onClick={handleScrollTop}
                            aria-label="Back to top"
                            className="group inline-flex h-10 cursor-pointer items-center rounded-full border border-white/20 bg-white/[0.05] px-3 text-[#f7efe4]/85 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#d6a174] hover:bg-[#d6a174] hover:text-[#1D1008] hover:shadow-[0_10px_24px_-6px_rgba(214,161,116,0.35)] active:scale-95"
                        >
                            <span className="max-w-0 overflow-hidden whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.18em] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:mr-2 group-hover:max-w-[110px] group-hover:opacity-100">
                                Back to top
                            </span>
                            <span
                                aria-hidden="true"
                                className="inline-flex h-4 w-4 items-center justify-center text-xs leading-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5"
                            >
                                ↑
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
