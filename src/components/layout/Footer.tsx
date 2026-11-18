import Link from "next/link";

const EXPLORE_LINKS = [
    { label: "Menu", href: "/menu" },
    { label: "Our story", href: "/our-story" },
    { label: "Contact", href: "/contact" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            aria-labelledby="footer-heading"
            className="relative bg-[#1D1008] text-[#f7efe4]"
        >
            {/* Top Hairline Rule Separating from Testimonials */}
            <div
                aria-hidden="true"
                className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"
            />

            <div className="section-shell mx-auto max-w-[1320px] px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
                {/* Main Editorial Split */}
                <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-12">
                    {/* Left: Headline & Primary Action */}
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-8 bg-[#d6a174]" />
                            <p className="eyebrow text-[11px] font-semibold tracking-[0.22em] text-[#d6a174]">
                                A good moment, made better.
                            </p>
                        </div>

                        <h2
                            id="footer-heading"
                            className="display-font max-w-[640px] font-black uppercase tracking-[-0.04em] text-[#f7efe4] text-[clamp(46px,7.6vw,96px)] leading-[0.89]"
                        >
                            MEET US
                            <br />
                            <span className="text-[#d6a174]">OVER COFFEE.</span>
                        </h2>

                        <div className="mt-9 flex flex-wrap items-center gap-6">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/[0.06] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#f7efe4] transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:border-[#d6a174] hover:bg-[#d6a174] hover:text-[#1D1008] active:scale-95"
                            >
                                <span>Plan your visit</span>
                                <span
                                    aria-hidden="true"
                                    className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5"
                                >
                                    ↗
                                </span>
                            </Link>

                            <span className="text-xs text-white/55">
                                Daily{" "}
                                <strong className="font-semibold text-white/75">
                                    07:30 – 20:00
                                </strong>
                            </span>
                        </div>
                    </div>

                    {/* Right: 3 Matching Editorial Columns */}
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-t border-white/15 pt-10 text-sm sm:grid-cols-3 lg:border-t-0 lg:pt-0">
                        <div>
                            <p className="eyebrow mb-4 text-[10px] font-bold tracking-[0.2em] text-[#d6a174]">
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
                                        className="group inline-flex w-fit items-center gap-1.5 text-white/75 transition-colors duration-200 hover:text-[#f7efe4]"
                                    >
                                        <span>{item.label}</span>
                                        <span
                                            aria-hidden="true"
                                            className="text-xs text-[#d6a174] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                                        >
                                            →
                                        </span>
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div>
                            <p className="eyebrow mb-4 text-[10px] font-bold tracking-[0.2em] text-[#d6a174]">
                                Say hello
                            </p>
                            <div className="flex flex-col gap-3 text-white/75">
                                <a
                                    href="mailto:hello@mora.example"
                                    className="w-fit transition-colors duration-200 hover:text-[#d6a174]"
                                >
                                    hello@mora.example
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-fit transition-colors duration-200 hover:text-[#d6a174]"
                                >
                                    Instagram
                                </a>
                                <span className="text-white/55">
                                    Kandy, Sri Lanka
                                </span>
                            </div>
                        </div>

                        <div>
                            <p className="eyebrow mb-4 text-[10px] font-bold tracking-[0.2em] text-[#d6a174]">
                                The house
                            </p>
                            <div className="flex flex-col gap-3 text-white/75">
                                <Link
                                    href="/contact"
                                    className="w-fit transition-colors duration-200 hover:text-[#d6a174]"
                                >
                                    24, Peradeniya Rd
                                </Link>
                                <span className="text-white/55">
                                    Mon – Sun · 07:30 – 20:00
                                </span>
                                <span className="text-white/55">
                                    Small-batch pours
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Colophon Bar */}
                <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-[10px] font-medium uppercase tracking-[0.16em] text-white/50 sm:flex-row sm:items-center">
                    <span>© {currentYear} MŌRA COFFEE HOUSE</span>
                    <span>THE ART OF EVERY POUR.</span>
                </div>
            </div>
        </footer>
    );
}
