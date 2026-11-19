"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        let hideTimer: ReturnType<typeof setTimeout>;
        let safetyTimer: ReturnType<typeof setTimeout>;

        const finishLoading = () => {
            setIsFading(true);
            // Match this delay with the CSS fade-out transition duration
            hideTimer = setTimeout(() => {
                setIsVisible(false);
            }, 500);
        };

        // Dismiss immediately if all page resources have already finished loading
        if (document.readyState === "complete") {
            finishLoading();
        } else {
            window.addEventListener("load", finishLoading, { once: true });
        }

        // Fallback timer to prevent getting stuck on slow connections
        safetyTimer = setTimeout(() => {
            finishLoading();
        }, 6000);

        return () => {
            window.removeEventListener("load", finishLoading);
            clearTimeout(hideTimer);
            clearTimeout(safetyTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            aria-label="Loading MŌRA"
            role="status"
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#190D06] text-white transition-opacity duration-500 ease-out ${
                isFading ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
        >
            <div className="flex flex-col items-center gap-4">
                <span className="text-2xl font-black uppercase tracking-[0.28em] text-white sm:text-3xl">
                    MŌRA
                </span>

                {/* Subtle espresso and caramel loading indicator */}
                <div className="h-[2px] w-36 overflow-hidden rounded-full bg-white/15">
                    <div className="h-full w-1/2 animate-[pulse_1.2s_ease-in-out_infinite] rounded-full bg-[#d8a477]" />
                </div>

                <span className="text-[11px] uppercase tracking-[0.22em] text-white/65">
                    Brewing experience...
                </span>
            </div>
        </div>
    );
}
