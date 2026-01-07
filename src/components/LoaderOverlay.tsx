"use client";

import { useEffect, useRef, useState } from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { cn } from "@/lib/utils";

const MIN_VISIBLE_DURATION_MS = 1200;
const FADE_OUT_DURATION_MS = 400;

const LoaderOverlay = () => {
    const [isActive, setIsActive] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);
    const hideTimerRef = useRef<number | undefined>(undefined);
    const unmountTimerRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const startTime = Date.now();

        const clearTimers = () => {
            if (hideTimerRef.current != null) {
                window.clearTimeout(hideTimerRef.current);
            }
            if (unmountTimerRef.current != null) {
                window.clearTimeout(unmountTimerRef.current);
            }
        };

        const scheduleHide = () => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(MIN_VISIBLE_DURATION_MS - elapsed, 0);

            hideTimerRef.current = window.setTimeout(() => {
                setIsActive(false);

                unmountTimerRef.current = window.setTimeout(() => {
                    setShouldRender(false);
                }, FADE_OUT_DURATION_MS);
            }, remaining);
        };

        if (document.readyState === "complete") {
            scheduleHide();
            return clearTimers;
        }

        const handleLoad = () => {
            scheduleHide();
        };

        window.addEventListener("load", handleLoad, { once: true });

        return () => {
            window.removeEventListener("load", handleLoad);
            clearTimers();
        };
    }, []);

    if (!shouldRender) {
        return null;
    }

    return (
        <div
            className={cn(
                "fixed inset-0 z-60 grid place-items-center overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,#111111_0%,#050505_60%,#000000_100%)] transition-opacity duration-500",
                isActive ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
            )}
        >
            <div className="pointer-events-none absolute inset-0">
                <BackgroundRippleEffect rows={20} cols={35} cellSize={52} />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 text-center">
                <div className="relative h-24 w-24">
                    <div className="absolute inset-0 rounded-full border-2 border-(--text-color) opacity-20" />
                    <div className="absolute inset-[10%] rounded-full border border-(--text-color) opacity-40" />
                    <div className="absolute inset-0 animate-[spin_1.4s_linear_infinite] rounded-full border-2 border-(--text-color) border-t-transparent" />
                    <div className="absolute inset-[18%] animate-[spin_2.2s_linear_infinite_reverse] rounded-full border border-(--text-color) border-b-transparent opacity-80" />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-center gap-3 text-lg font-semibold uppercase tracking-[0.4em] text-(--text-color)">
                        <span className="block h-2 w-2 animate-[pulse_1.6s_ease_in_out_infinite] rounded-full bg-(--text-color)" />
                        <span>OmniTools</span>
                        <span className="block h-2 w-2 animate-[pulse_1.4s_ease_in_out_infinite] rounded-full bg-(--text-color)" />
                    </div>
                    <p className="text-sm text-zinc-400">Calibrating your experience...</p>
                </div>
            </div>
        </div>
    );
};

export default LoaderOverlay;
