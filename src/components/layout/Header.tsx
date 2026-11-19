"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
    { number: "01", label: "Home", href: "/" },
    { number: "02", label: "Menu", href: "/menu" },
    { number: "03", label: "Rewards", href: "/rewards" },
    { number: "04", label: "About MŌRA", href: "/our-story" },
    { number: "05", label: "Contact", href: "/contact" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && menuOpen) {
                setMenuOpen(false);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [menuOpen]);

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

    return (
        <>
            <header className="absolute inset-x-0 top-0 z-30 mx-auto flex max-w-[1440px] items-center justify-between px-5 pt-5 text-white sm:px-9 sm:pt-7 lg:px-12 lg:pt-8">
                <Link
                    href="/"
                    className="group inline-flex items-center gap-2 text-sm font-semibold tracking-[0.22em] text-white/80 transition-colors duration-300 hover:text-white"
                >
                    <span className="transition-transform duration-300">
                        MŌRA
                    </span>
                </Link>

                <div className="flex items-center gap-4 sm:gap-5">
                    <div className="hidden text-right leading-none sm:block">
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
                        className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#24140B] shadow-md transition-all duration-300 hover:shadow-lg active:scale-95 sm:h-10 sm:w-10"
                    >
                        <span className="flex flex-col items-center justify-center gap-[3.5px]">
                            <span className="block h-[2px] w-4 rounded-full bg-[#24140B] transition-transform duration-300 group-hover:translate-x-0.5" />
                            <span className="block h-[2px] w-4 rounded-full bg-[#24140B] transition-transform duration-300 group-hover:-translate-x-0.5" />
                        </span>
                    </button>
                </div>
            </header>

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
                    className={`relative flex min-h-[82vh] w-[80vw] flex-col justify-between rounded-3xl border border-white/15 bg-[#1B0F08]/95 p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.85)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-10 lg:p-14 ${
                        menuOpen
                            ? "translate-y-0 scale-100 opacity-100"
                            : "translate-y-6 scale-95 opacity-0"
                    }`}
                >
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
                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-[#24140B] shadow-md transition-all duration-300 hover:rotate-90 hover:scale-105 active:scale-95"
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
                                className="group mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-white hover:bg-[#d8a477] hover:text-[#24140B]"
                            >
                                <span>Explore Full Menu</span>
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    &rsaquo;
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 text-[11px] uppercase tracking-[0.18em] text-white/55">
                        <span>A Little Ritual · A Lot Of Feeling</span>
                        <span>Kandy, Sri Lanka</span>
                    </div>
                </div>
            </div>
        </>
    );
}
