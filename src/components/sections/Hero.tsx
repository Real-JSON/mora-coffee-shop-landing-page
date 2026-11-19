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

export default function Hero() {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [direction, setDirection] = useState<"next" | "prev">("next");
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

    // Keyboard navigation (Left/Right arrows to switch drinks)
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    });

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
            className="relative min-h-225 w-full overflow-hidden bg-[#24140B] pt-20.5 text-white sm:min-h-212.5 lg:min-h-dvh"
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
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/35"
            />

            {/* Main Centerpiece Stage */}
            <div className="relative z-20 mx-auto flex min-h-155 max-w-360 flex-col justify-between px-5 pb-7 pt-6 sm:min-h-170 sm:px-9 sm:pb-9 lg:min-h-[calc(100dvh-82px)] lg:px-12 lg:pb-11">
                {/* Center Wordmark + Transparent PNG Drink Cup + Bottom Slide Controls */}
                <div className="relative my-auto flex min-h-80 flex-col items-center justify-center py-4 sm:min-h-100 lg:min-h-117.5">
                    <div className="relative flex w-full max-w-6xl items-center justify-center">
                        {/* Background Text (z-0) */}
                        <div
                            key={`word-${currentItem.id}`}
                            className="animate-text-reveal relative z-0 flex select-none items-center justify-center font-black uppercase leading-none tracking-[-0.04em] text-white text-[64px] sm:text-[118px] md:text-[156px] lg:text-[205px] xl:text-[238px]"
                        >
                            <span className="relative">
                                <span className="absolute -top-4 left-0.5 text-[9px] font-normal tracking-[0.24em] text-white/85 sm:-top-6 sm:text-xs md:-top-7 md:text-sm">
                                    {currentItem.categoryLabel}
                                </span>
                                <span className="tracking-widest">
                                    {currentItem.fullWord}
                                </span>
                            </span>
                        </div>

                        {/* Soft Shadow Layer Between Text and Cup (z-[5]) */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 z-5 flex items-center justify-center"
                        >
                            <div className="h-55 w-55 rounded-full bg-black/35 blur-3xl sm:h-80 sm:w-80 lg:h-95 lg:w-95" />
                        </div>

                        {/* Transparent PNG Cup Centered Over the Wordmark (z-10) */}
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
                                        className="h-full w-full object-contain object-center drop-shadow-[0_32px_45px_rgba(0,0,0,0.85)]"
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
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-white/50 hover:bg-white/20 active:scale-95"
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
                                                : "w-1.5 cursor-pointer bg-white/35 hover:bg-white/70"
                                        }`}
                                    />
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Next drink"
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-white/50 hover:bg-white/20 active:scale-95"
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
                <div className="relative z-20 grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-end sm:gap-4">
                    {/* Bottom-Left: Price today */}
                    <div
                        key={`price-${currentItem.id}`}
                        className="animate-text-reveal flex flex-col items-center sm:items-start"
                    >
                        <span className="text-[11px] font-normal tracking-wide text-white/75">
                            Price today
                        </span>
                        <div className="mt-1 flex items-end gap-1 font-bold text-white">
                            <span className="text-3xl leading-none tracking-tight sm:text-4xl lg:text-[42px]">
                                {currentItem.price}
                            </span>
                            <span className="text-lg font-semibold text-white/90 sm:text-xl">
                                {currentItem.currencySymbol}
                            </span>
                        </div>
                    </div>

                    {/* Bottom-Center: Open menu pill CTA (Always Centered) */}
                    <div className="flex justify-center">
                        <Link
                            href={currentItem.ctaHref}
                            className="group inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border border-white/35 bg-white/10 px-6 py-2.5 text-xs font-medium tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-[#d8a477] hover:text-[#24140B] active:scale-95"
                        >
                            <span>{currentItem.ctaLabel}</span>
                            <span
                                aria-hidden="true"
                                className="text-sm leading-none transition-transform duration-300 group-hover:translate-x-1"
                            >
                                &rsaquo;
                            </span>
                        </Link>
                    </div>

                    {/* Bottom-Right: from [ORIGIN] + subtitle */}
                    <div
                        key={`origin-${currentItem.id}`}
                        className="animate-text-reveal flex flex-col items-center text-center sm:items-end sm:text-right"
                    >
                        <div className="flex items-baseline gap-2 whitespace-nowrap">
                            <span className="font-serif text-sm italic text-white/80 sm:text-base">
                                {currentItem.originPrefix}
                            </span>
                            <span className="text-xl font-bold uppercase tracking-[0.14em] text-white sm:text-2xl lg:text-[26px]">
                                {currentItem.originTitle}
                            </span>
                        </div>
                        <span className="mt-0.5 whitespace-nowrap text-[10px] font-normal tracking-wide text-white/75 sm:text-xs">
                            {currentItem.originSubtitle}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
