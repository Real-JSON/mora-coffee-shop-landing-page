"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CoffeeShowcaseItem {
    id: string;
    categoryLabel: string;
    fullWord: string;
    price: number;
    currencySymbol: string;
    originPrefix: string;
    originTitle: string;
    originSubtitle: string;
    ctaLabel: string;
    ctaHref: string;
    pngImage: string;
    imageAlt: string;
    glowColor: string;
}

const SHOWCASE_ITEMS: CoffeeShowcaseItem[] = [
    {
        id: "cappuccino",
        categoryLabel: "CAPPUCHINO",
        fullWord: "COFFEE",
        price: 6,
        currencySymbol: "$",
        originPrefix: "from",
        originTitle: "KANDY",
        originSubtitle: "Central Highlands",
        ctaLabel: "Open menu",
        ctaHref: "/menu",
        pngImage: "/images/drinks/coffee1.png",
        imageAlt: "Specialty cappuccino cup with latte art and milk splash",
        glowColor: "#7A4B2A",
    },
    {
        id: "espresso",
        categoryLabel: "DOUBLE ESPRESSO",
        fullWord: "BREW",
        price: 5,
        currencySymbol: "$",
        originPrefix: "from",
        originTitle: "MŌRA ROAST",
        originSubtitle: "Small Batch Estate",
        ctaLabel: "Open menu",
        ctaHref: "/menu",
        pngImage: "/images/drinks/coffee2.png",
        imageAlt: "Rich espresso cup in specialty roast showcase",
        glowColor: "#5C3319",
    },
    {
        id: "latte",
        categoryLabel: "VELVET LATTE",
        fullWord: "LATTE",
        price: 7,
        currencySymbol: "$",
        originPrefix: "from",
        originTitle: "KNUCKLES",
        originSubtitle: "Highland Harvest",
        ctaLabel: "Open menu",
        ctaHref: "/menu",
        pngImage: "/images/drinks/coffee3.png",
        imageAlt: "Velvet specialty latte cup",
        glowColor: "#D65373",
    },
    {
        id: "mocha",
        categoryLabel: "DARK MOCHA",
        fullWord: "MOCHA",
        price: 8,
        currencySymbol: "$",
        originPrefix: "from",
        originTitle: "MŌRA CLUB",
        originSubtitle: "Signature Ritual",
        ctaLabel: "Open menu",
        ctaHref: "/menu",
        pngImage: "/images/drinks/coffee4.png",
        imageAlt: "Dark chocolate mocha specialty drink",
        glowColor: "#4D2916",
    },
];

const NAV_LINKS = [
    { number: "01", label: "Home", href: "/" },
    { number: "02", label: "Menu", href: "/menu" },
    { number: "03", label: "Rewards", href: "/rewards" },
    { number: "04", label: "About MŌRA", href: "/our-story" },
    { number: "05", label: "Contact", href: "/contact" },
];

export default function Hero() {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [direction, setDirection] = useState<"next" | "prev">("next");
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const touchStartX = useRef<number | null>(null);

    const currentItem = SHOWCASE_ITEMS[activeIndex] ?? SHOWCASE_ITEMS[0];

    const handlePrev = () => {
        setDirection("prev");
        setActiveIndex((prev) =>
            prev === 0 ? SHOWCASE_ITEMS.length - 1 : prev - 1,
        );
    };

    const handleNext = () => {
        setDirection("next");
        setActiveIndex((prev) =>
            prev === SHOWCASE_ITEMS.length - 1 ? 0 : prev + 1,
        );
    };

    const handleSelectIndex = (index: number) => {
        if (index === activeIndex) return;
        setDirection(index > activeIndex ? "next" : "prev");
        setActiveIndex(index);
    };

    // Keyboard navigation (Escape to close menu, Left/Right arrows to switch drinks)
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && menuOpen) {
                setMenuOpen(false);
                return;
            }
            if (!menuOpen) {
                if (e.key === "ArrowRight") handleNext();
                if (e.key === "ArrowLeft") handlePrev();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    });

    // Lock background scroll when 80% overlay menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    // Mobile swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(deltaX) > 45) {
            if (deltaX < 0) handleNext();
            else handlePrev();
        }
        touchStartX.current = null;
    };

    return (
        <section
            aria-label="MŌRA specialty coffee hero"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative min-h-[700px] w-full overflow-hidden bg-[#24140B] text-white sm:min-h-[760px] lg:min-h-[820px]"
        >
            {/* Inline Keyframes for Silky Cup & Text Entrance + Ambient Float */}
            <style jsx>{`
                @keyframes cupFloat {
                    0%,
                    100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-10px) rotate(1.2deg);
                    }
                }
                @keyframes cupEnterNext {
                    0% {
                        opacity: 0;
                        transform: translateX(36px) scale(0.92) rotate(5deg);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0px) scale(1) rotate(0deg);
                    }
                }
                @keyframes cupEnterPrev {
                    0% {
                        opacity: 0;
                        transform: translateX(-36px) scale(0.92) rotate(-5deg);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0px) scale(1) rotate(0deg);
                    }
                }
                @keyframes textReveal {
                    0% {
                        opacity: 0;
                        transform: translateY(14px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0px);
                    }
                }
                .animate-cup-float {
                    animation: cupFloat 5.2s ease-in-out infinite;
                }
                .animate-cup-next {
                    animation: cupEnterNext 0.65s cubic-bezier(0.22, 1, 0.36, 1)
                        forwards;
                }
                .animate-cup-prev {
                    animation: cupEnterPrev 0.65s cubic-bezier(0.22, 1, 0.36, 1)
                        forwards;
                }
                .animate-text-reveal {
                    animation: textReveal 0.55s cubic-bezier(0.22, 1, 0.36, 1)
                        forwards;
                }
            `}</style>

            {/* Dynamic Ambient Radial Backdrop */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 transition-all duration-700 ease-out"
                style={{
                    background: `radial-gradient(circle at 54% 50%, ${currentItem.glowColor} 0%, #361F10 48%, #190D06 100%)`,
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/35"
            />

            {/* Top Bar: Brand Lockup & Menu Toggle on Top-Right */}
            <header className="relative z-30 mx-auto flex max-w-[1440px] items-start justify-between px-5 pt-5 sm:px-9 sm:pt-7 lg:px-12 lg:pt-8">
                <Link
                    href="/"
                    className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-white/80 transition-colors duration-300 hover:text-white"
                >
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                        MŌRA
                    </span>
                    <span className="text-white/40">·</span>
                    <span className="text-[10px] uppercase text-white/65">
                        KANDY
                    </span>
                </Link>

                {/* Right Brand Stack + Circular Menu Button */}
                <div className="flex items-center gap-4 sm:gap-5">
                    <div className="text-right leading-none">
                        <div className="flex items-center justify-end gap-1 text-lg font-extrabold tracking-[0.14em] text-white sm:text-xl">
                            <span>M</span>
                            <span>Ō</span>
                            <span>R</span>
                            <span>A</span>
                        </div>
                        <p className="mt-1 text-[8px] font-medium uppercase tracking-[0.22em] text-white/75 sm:text-[9px]">
                            TRY DELICIOUS
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-expanded={menuOpen}
                        aria-label="Toggle navigation menu"
                        className="group flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#24140B] shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 sm:h-10 sm:w-10"
                    >
                        <span className="flex flex-col items-center justify-center gap-[3.5px]">
                            <span className="block h-[2px] w-4 rounded-full bg-[#24140B] transition-transform duration-300 group-hover:translate-x-0.5" />
                            <span className="block h-[2px] w-4 rounded-full bg-[#24140B] transition-transform duration-300 group-hover:-translate-x-0.5" />
                        </span>
                    </button>
                </div>
            </header>

            {/* =========================================================
          80% WIDTH FULL-SCREEN OVERLAY MENU (Smoothly Animated)
         ========================================================= */}
            <div
                role="dialog"
                aria-modal="true"
                aria-hidden={!menuOpen}
                aria-label="Site navigation"
                onClick={() => setMenuOpen(false)}
                className={`fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md transition-all duration-500 ease-out ${
                    menuOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                }`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`relative flex min-h-[82vh] w-[80vw] flex-col justify-between rounded-3xl border border-white/15 bg-[#1B0F08]/95 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.85)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-10 lg:p-14 ${
                        menuOpen
                            ? "translate-y-0 scale-100 opacity-100"
                            : "translate-y-6 scale-95 opacity-0"
                    }`}
                >
                    {/* Overlay Top Bar */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-5">
                        <div>
                            <span className="text-lg font-extrabold tracking-[0.22em] text-white sm:text-xl">
                                MŌRA
                            </span>
                            <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-[#d8a477]">
                                Specialty Coffee · Kandy
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setMenuOpen(false)}
                            aria-label="Close navigation menu"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#24140B] shadow-md transition-all duration-300 hover:rotate-90 hover:scale-105 active:scale-95"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.4}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M6 18L18 6M6 6l12 12"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Center Links Grid */}
                    <div className="my-auto grid grid-cols-1 gap-10 py-8 md:grid-cols-12 md:items-center">
                        <nav
                            aria-label="Main navigation"
                            className="md:col-span-7"
                        >
                            <ul className="flex flex-col gap-4 sm:gap-5">
                                {NAV_LINKS.map((item, idx) => (
                                    <li
                                        key={item.href}
                                        style={{
                                            transitionDelay: menuOpen
                                                ? `${idx * 65 + 100}ms`
                                                : "0ms",
                                        }}
                                        className={`transition-all duration-500 ease-out ${
                                            menuOpen
                                                ? "translate-x-0 opacity-100"
                                                : "-translate-x-6 opacity-0"
                                        }`}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setMenuOpen(false)}
                                            className="group inline-flex items-baseline gap-4 transition-transform duration-300 hover:translate-x-3"
                                        >
                                            <span className="text-xs font-semibold tracking-[0.2em] text-[#d8a477] transition-transform duration-300 group-hover:scale-110">
                                                {item.number}
                                            </span>
                                            <span className="text-2xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-[#d8a477] sm:text-4xl lg:text-5xl">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Right Column Info (Tablet & Desktop) */}
                        <div
                            style={{
                                transitionDelay: menuOpen ? "240ms" : "0ms",
                            }}
                            className={`hidden border-l border-white/10 pl-8 transition-all duration-500 ease-out md:col-span-5 md:flex md:flex-col md:gap-6 ${
                                menuOpen
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-4 opacity-0"
                            }`}
                        >
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d8a477]">
                                    Coffeehouse
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-white/75">
                                    Thoughtfully crafted, playfully expressed,
                                    and made to be remembered in the heart of
                                    Kandy.
                                </p>
                            </div>

                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d8a477]">
                                    Daily Hours
                                </p>
                                <p className="mt-1.5 text-sm text-white/85">
                                    Mon – Sun · 7:30 AM – 9:30 PM
                                </p>
                            </div>

                            <Link
                                href="/menu"
                                onClick={() => setMenuOpen(false)}
                                className="group mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#24140B]"
                            >
                                <span>Explore Full Menu</span>
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    &rsaquo;
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Overlay Bottom Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 text-[11px] uppercase tracking-[0.18em] text-white/55">
                        <span>A Little Ritual · A Lot Of Feeling</span>
                        <span>Kandy, Sri Lanka</span>
                    </div>
                </div>
            </div>

            {/* Main Centerpiece Stage */}
            <div className="relative z-20 mx-auto flex min-h-[580px] max-w-[1440px] flex-col justify-between px-5 pb-7 pt-6 sm:min-h-[640px] sm:px-9 sm:pb-9 lg:min-h-[700px] lg:px-12 lg:pb-11">
                {/* Center Wordmark + Transparent PNG Drink Cup + Bottom Slide Controls */}
                <div className="relative my-auto flex min-h-[320px] flex-col items-center justify-center py-4 sm:min-h-[400px] lg:min-h-[470px]">
                    <div className="relative flex w-full max-w-6xl items-center justify-center">
                        <div
                            key={`word-${currentItem.id}`}
                            className="animate-text-reveal relative z-0 flex select-none items-center justify-center font-black uppercase leading-none tracking-[-0.04em] text-white text-[64px] sm:text-[118px] md:text-[156px] lg:text-[205px] xl:text-[238px]"
                        >
                            <span className="relative">
                                <span className="absolute -top-4 left-0.5 text-[10px] font-normal tracking-[0.24em] text-white/85 sm:-top-6 sm:text-xs md:-top-7 md:text-sm">
                                    {currentItem.categoryLabel}
                                </span>
                                <span className="tracking-widest">
                                    {currentItem.fullWord}
                                </span>
                            </span>
                        </div>

                        {/* Transparent PNG Cup Centered Over the Wordmark (Uniform Responsive Scale) */}
                        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                            <div
                                key={`cup-${currentItem.id}`}
                                className={
                                    direction === "next"
                                        ? "animate-cup-next"
                                        : "animate-cup-prev"
                                }
                            >
                                <div className="animate-cup-float relative flex h-[clamp(250px,42vw,520px)] w-[clamp(220px,38vw,480px)] items-center justify-center">
                                    <Image
                                        src={currentItem.pngImage}
                                        alt={currentItem.imageAlt}
                                        fill
                                        priority
                                        unoptimized
                                        sizes="(max-width: 640px) 260px, (max-width: 1024px) 420px, 480px"
                                        className="h-full w-full object-contain object-center drop-shadow-[0_28px_36px_rgba(0,0,0,0.55)]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide Controls Right Below the Cup Image */}
                    <div className="relative z-20 top-15 mt-3 flex items-center justify-center gap-3 text-white/85 sm:mt-4">
                        <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="Previous drink"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-white/50 hover:bg-white/20 active:scale-95"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="m15 18-6-6 6-6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <div className="flex items-center gap-2 px-1">
                            {SHOWCASE_ITEMS.map((item, idx) => {
                                const isActive = idx === activeIndex;
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => handleSelectIndex(idx)}
                                        aria-label={`Select ${item.categoryLabel}`}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                            isActive
                                                ? "w-5 bg-white"
                                                : "w-1.5 bg-white/35 hover:bg-white/70"
                                        }`}
                                    />
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Next drink"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-white/50 hover:bg-white/20 active:scale-95"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="m9 18 6-6-6-6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Bottom Row: Price Today (Left), Open Menu Pill (Center), Origin Lockup (Right) */}
                <div className="relative z-20 flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
                    {/* Bottom-Left: Price today */}
                    <div
                        key={`price-${currentItem.id}`}
                        className="animate-text-reveal flex flex-col items-center sm:items-start"
                    >
                        <span className="text-[11px] font-normal tracking-wide text-white/75">
                            Price today
                        </span>
                        <div className="mt-1 flex items-baseline gap-1 font-bold text-white">
                            <span className="text-3xl leading-none tracking-tight sm:text-4xl lg:text-[42px]">
                                {currentItem.price}
                            </span>
                            <span className="text-lg font-semibold text-white/90 sm:text-xl">
                                {currentItem.currencySymbol}
                            </span>
                        </div>
                    </div>

                    {/* Bottom-Center: Open menu pill CTA */}
                    <Link
                        href={currentItem.ctaHref}
                        className="group inline-flex items-center gap-3 rounded-full border border-white/35 bg-white/10 px-6 py-2.5 text-xs font-medium tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white hover:text-[#24140B] active:scale-95"
                    >
                        <span>{currentItem.ctaLabel}</span>
                        <span
                            aria-hidden="true"
                            className="text-sm leading-none transition-transform duration-300 group-hover:translate-x-1"
                        >
                            &rsaquo;
                        </span>
                    </Link>

                    {/* Bottom-Right: from [ORIGIN] + subtitle */}
                    <div
                        key={`origin-${currentItem.id}`}
                        className="animate-text-reveal flex flex-col items-center text-center sm:items-end sm:text-right"
                    >
                        <div className="flex items-baseline gap-2">
                            <span className="font-serif text-sm italic text-white/80 sm:text-base">
                                {currentItem.originPrefix}
                            </span>
                            <span className="text-xl font-bold uppercase tracking-[0.14em] text-white sm:text-2xl lg:text-[26px]">
                                {currentItem.originTitle}
                            </span>
                        </div>
                        <span className="mt-0.5 text-[10px] font-normal tracking-wide text-white/75 sm:text-xs">
                            {currentItem.originSubtitle}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
