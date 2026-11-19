"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        let hideTimer: ReturnType<typeof setTimeout>;
        let safetyTimer: ReturnType<typeof setTimeout>;

        const completeLoader = () => {
            if (!isMounted) return;
            setProgress(100);
            setIsFading(true);
            // Match this delay with the CSS fade-out duration
            hideTimer = setTimeout(() => {
                if (isMounted) {
                    setIsVisible(false);
                }
            }, 500);
        };

        // Calculate progress based on fonts, document state, and loaded media elements
        const calculateActualProgress = () => {
            if (!isMounted) return;

            const images = Array.from(document.images);
            const loadedImages = images.filter((img) => img.complete).length;
            const imageRatio =
                images.length > 0 ? loadedImages / images.length : 1;

            const stateWeight =
                document.readyState === "complete"
                    ? 1
                    : document.readyState === "interactive"
                      ? 0.55
                      : 0.2;

            // Weighted score between 0 and 92 until window load finishes
            const weighted = Math.min(
                92,
                Math.round((stateWeight * 0.45 + imageRatio * 0.55) * 100),
            );

            setProgress((prev) => (weighted > prev ? weighted : prev));
        };

        // Smoothly ease toward the target progress so numbers feel fluid
        const ticker = setInterval(() => {
            if (!isMounted) return;
            calculateActualProgress();
            setProgress((prev) => {
                if (document.readyState === "complete") return 100;
                const target = 88;
                if (prev >= target) return prev;
                const step = Math.max(1, Math.ceil((target - prev) * 0.12));
                return Math.min(target, prev + step);
            });
        }, 80);

        // Track individual image loads as they finish
        const onMediaLoad = () => calculateActualProgress();
        window.addEventListener("load", onMediaLoad, { capture: true });

        // Wait for web fonts to finish loading
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => calculateActualProgress());
        }

        const handleWindowLoad = () => {
            clearInterval(ticker);
            completeLoader();
        };

        if (document.readyState === "complete") {
            clearInterval(ticker);
            completeLoader();
        } else {
            window.addEventListener("load", handleWindowLoad, { once: true });
        }

        // Fallback so users are never stuck on slow connections
        safetyTimer = setTimeout(() => {
            clearInterval(ticker);
            completeLoader();
        }, 6500);

        return () => {
            isMounted = false;
            clearInterval(ticker);
            clearTimeout(hideTimer);
            clearTimeout(safetyTimer);
            window.removeEventListener("load", onMediaLoad, { capture: true });
            window.removeEventListener("load", handleWindowLoad);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            aria-label="Loading MŌRA"
            aria-busy={!isFading}
            role="status"
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#190D06] px-6 text-white transition-opacity duration-500 ease-out ${
                isFading ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
        >
            <div className="flex w-full max-w-xs flex-col items-center gap-5">
                <span className="text-2xl font-black uppercase tracking-[0.28em] text-white sm:text-3xl">
                    MŌRA
                </span>

                {/* Interactive progress bar driven by real asset/state milestones */}
                <div className="w-full space-y-2">
                    <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/15">
                        <div
                            className="h-full rounded-full bg-[#d8a477] transition-[width] duration-150 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/70">
                        <span>
                            {progress < 40
                                ? "Preparing roastery..."
                                : progress < 80
                                  ? "Steaming milk & shots..."
                                  : "Finishing the pour..."}
                        </span>
                        <span className="font-semibold tabular-nums text-[#d8a477]">
                            {progress}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
