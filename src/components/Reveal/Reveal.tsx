'use client';
import React, { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

type RevealVariant = 'zoom' | 'parallax' | 'clip' | 'rise' | 'rotate' | 'blur';

interface RevealProps {
    children: ReactNode;
    variant?: RevealVariant;
    className?: string;
    strength?: number;
    id?: string;
    style?: React.CSSProperties;
}

/**
 * Scroll-linked reveal primitive. Animations are driven directly by scroll
 * position (not just on-enter), giving an app-like, cinematic feel.
 */
const Reveal: React.FC<RevealProps> = ({
    children,
    variant = 'rise',
    className,
    strength = 1,
    id,
    style,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // Enter (0 -> 0.5) ... settle (0.5) ... exit (0.5 -> 1)
    const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.7, 1, 1, 0.92]);
    const zoomScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [1.6, 1, 1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
    const yRise = useTransform(scrollYProgress, [0, 0.4], [120 * strength, 0]);
    const parallaxY = useTransform(scrollYProgress, [0, 1], [80 * strength, -80 * strength]);
    const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [8 * strength, 0, -6 * strength]);
    const blur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [16, 0, 0, 12]);
    const clip = useTransform(
        scrollYProgress,
        [0, 0.45],
        ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)']
    );
    const filterBlur: MotionValue<string> = useTransform(blur, (b) => `blur(${b}px)`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let motionStyle: any = { ...style };

    switch (variant) {
        case 'zoom':
            motionStyle = { ...motionStyle, scale: zoomScale, opacity };
            break;
        case 'parallax':
            motionStyle = { ...motionStyle, y: parallaxY };
            break;
        case 'clip':
            motionStyle = { ...motionStyle, clipPath: clip, opacity };
            break;
        case 'rotate':
            motionStyle = { ...motionStyle, rotate, scale, opacity };
            break;
        case 'blur':
            motionStyle = { ...motionStyle, filter: filterBlur, opacity, scale };
            break;
        case 'rise':
        default:
            motionStyle = { ...motionStyle, y: yRise, opacity, scale };
            break;
    }

    return (
        <motion.div ref={ref} id={id} className={className} style={motionStyle}>
            {children}
        </motion.div>
    );
};

export default Reveal;
