'use client';
import React, { createContext, useContext, useRef, useEffect, useState, ReactNode } from 'react';
import Lenis from 'lenis';

interface ScrollContextValue {
    scrollProgress: React.MutableRefObject<number>;
    mouse: React.MutableRefObject<{ x: number; y: number }>;
    lenis: React.MutableRefObject<Lenis | null>;
    activeSection: number;
    registerSection: (index: number, el: HTMLElement | null) => void;
    scrollToSection: (index: number) => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export const useScrollContext = () => {
    const ctx = useContext(ScrollContext);
    if (!ctx) throw new Error('useScrollContext must be used within ScrollProvider');
    return ctx;
};

export const ScrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const scrollProgress = useRef(0);
    const mouse = useRef({ x: 0, y: 0 });
    const lenis = useRef<Lenis | null>(null);
    const sectionsRef = useRef<(HTMLElement | null)[]>([]);
    const [activeSection, setActiveSection] = useState(0);

    const registerSection = (index: number, el: HTMLElement | null) => {
        sectionsRef.current[index] = el;
    };

    const scrollToSection = (index: number) => {
        const el = sectionsRef.current[index];
        if (el && lenis.current) {
            lenis.current.scrollTo(el, { duration: 1.6 });
        }
    };

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.3,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
        });
        lenis.current = lenisInstance;

        let rafId: number;
        const raf = (time: number) => {
            lenisInstance.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        const onScroll = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            scrollProgress.current = scrollable > 0 ? window.scrollY / scrollable : 0;

            // Determine active section by closest to viewport center
            const center = window.scrollY + window.innerHeight / 2;
            let closest = 0;
            let closestDist = Infinity;
            sectionsRef.current.forEach((el, i) => {
                if (!el) return;
                const elCenter = el.offsetTop + el.offsetHeight / 2;
                const dist = Math.abs(center - elCenter);
                if (dist < closestDist) {
                    closestDist = dist;
                    closest = i;
                }
            });
            setActiveSection((prev) => (prev !== closest ? closest : prev));
        };

        lenisInstance.on('scroll', onScroll);
        onScroll();

        const onMouse = (e: MouseEvent) => {
            mouse.current = {
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: -(e.clientY / window.innerHeight - 0.5) * 2,
            };
        };
        window.addEventListener('mousemove', onMouse, { passive: true });

        return () => {
            cancelAnimationFrame(rafId);
            lenisInstance.destroy();
            window.removeEventListener('mousemove', onMouse);
        };
    }, []);

    return (
        <ScrollContext.Provider
            value={{ scrollProgress, mouse, lenis, activeSection, registerSection, scrollToSection }}
        >
            {children}
        </ScrollContext.Provider>
    );
};
