"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, type Product } from "@/data/products";

export default function SignatureCollection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const items: Product[] = products.slice(0, 3);

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

    return (
        <section
            id="collection"
            ref={sectionRef}
            aria-labelledby="signature-collection-heading"
            className="relative overflow-hidden bg-[#1D1008] py-20 text-[#f7efe4] sm:py-24 lg:py-32"
        >
            {/* Smooth One-Time Entrance Keyframes (Keeps Hover Transform Clean) */}
            <style jsx>{`
                @keyframes cardReveal {
                    from {
                        opacity: 0;
                        transform: translate3d(0, 24px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
                .card-reveal {
                    animation: cardReveal 0.65s cubic-bezier(0.22, 1, 0.36, 1)
                        both;
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

            {/* Subtle Giant Background Brand Watermark */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-[210px] z-0 flex select-none justify-center overflow-hidden sm:top-[225px] lg:top-[220px]"
            >
                <span className="whitespace-nowrap font-black uppercase leading-none tracking-[-0.04em] text-white/[0.035] text-[104px] sm:text-[170px] md:text-[220px] lg:text-[280px]">
                    MŌRA
                </span>
            </div>

            <div className="section-shell relative z-10 mx-auto max-w-[1320px] px-6 sm:px-10 lg:px-14">
                {/* Section Header */}
                <div
                    className={`mb-20 flex flex-col justify-between gap-6 transition-all duration-700 ease-out md:mb-24 md:flex-row md:items-end ${
                        isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                    }`}
                >
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-8 bg-[#d6a174]" />
                            <p className="eyebrow text-[11px] font-semibold tracking-[0.22em] text-[#d6a174]">
                                A STUDY IN FLAVOUR
                            </p>
                        </div>
                        <h2
                            id="signature-collection-heading"
                            className="display-font font-black uppercase tracking-[-0.04em] text-[#f7efe4] text-[clamp(42px,6.5vw,86px)] leading-[0.9]"
                        >
                            THE SIGNATURE
                            <br />
                            <span className="text-[#d6a174]">COLLECTION.</span>
                        </h2>
                    </div>

                    <div className="max-w-[340px]">
                        <p className="text-sm leading-7 text-white/75">
                            A few favourites, made with intention. Explore
                            expressive blends and little twists on the classics.
                        </p>
                        <Link
                            href="/menu"
                            className="group eyebrow mt-5 inline-flex items-center gap-3 border-b border-white/40 pb-2.5 text-xs font-bold tracking-[0.16em] text-[#f7efe4] transition-colors duration-200 hover:border-[#d6a174] hover:text-[#d6a174]"
                        >
                            <span>View the full menu</span>
                            <span className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5">
                                ↗
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Equal-Sized 3-Column Grid with Smooth Upward Card Hover */}
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-y-24 pt-12 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-28 lg:grid-cols-3 lg:gap-8 lg:pt-14">
                    {items.map((item, idx) => (
                        <article
                            key={item.id}
                            style={
                                isVisible
                                    ? { animationDelay: `${idx * 80}ms` }
                                    : { opacity: 0 }
                            }
                            className={`group relative flex h-full flex-col rounded-[28px] border border-white/10 bg-[#2A170D]/90 px-6 pb-7 pt-24 text-center text-[#f7efe4] shadow-[0_14px_34px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out hover:-translate-y-2.5 ${
                                isVisible ? "card-reveal" : ""
                            }`}
                        >
                            {/* Floating Product Image Breaking Top Edge */}
                            <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-36 -translate-x-1/2 sm:h-44 sm:w-40">
                                <div className="relative h-full w-full transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-105">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        unoptimized
                                        sizes="(max-width: 640px) 180px, 200px"
                                        className="object-contain object-bottom drop-shadow-[0_20px_26px_rgba(0,0,0,0.55)]"
                                    />
                                </div>
                            </div>

                            {/* Category + Title + Price */}
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d8a477]/85">
                                {item.category}
                            </span>
                            <h3 className="mt-1 text-lg font-bold tracking-tight text-[#f7efe4] transition-colors duration-200 group-hover:text-[#d6a174] sm:text-xl">
                                {item.name}
                            </h3>
                            <p className="mt-1 text-xs font-bold tracking-wide text-[#d8a477]">
                                {item.price}
                            </p>

                            {/* Tasting Note + Description */}
                            <div className="mt-4 flex flex-1 flex-col text-left">
                                <span className="text-[11px] font-semibold tracking-wide text-white/80">
                                    {item.note}
                                </span>
                                <p className="mt-2.5 text-xs leading-relaxed text-white/70">
                                    {item.description}
                                </p>

                                <Link
                                    href="/menu"
                                    className="mt-auto inline-flex items-center gap-2 pt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#d6a174] transition-colors duration-200 hover:text-white"
                                >
                                    <span>Explore drink</span>
                                    <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
