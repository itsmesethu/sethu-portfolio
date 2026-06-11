'use client';
import React, { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface SectionWrapperProps {
    children: ReactNode;
    id?: string;
    className?: string;
    parallaxStrength?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
    children,
    id,
    className,
    parallaxStrength = 50,
    direction = 'up',
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [parallaxStrength, -parallaxStrength]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const getInitial = () => {
        switch (direction) {
            case 'up': return { y: 80, opacity: 0 };
            case 'down': return { y: -80, opacity: 0 };
            case 'left': return { x: 80, opacity: 0 };
            case 'right': return { x: -80, opacity: 0 };
        }
    };

    const getAnimate = () => {
        switch (direction) {
            case 'up': return { y: 0, opacity: 1 };
            case 'down': return { y: 0, opacity: 1 };
            case 'left': return { x: 0, opacity: 1 };
            case 'right': return { x: 0, opacity: 1 };
        }
    };

    return (
        <motion.div
            ref={ref}
            id={id}
            className={className}
            style={{ position: 'relative', width: '100%' }}
        >
            <motion.div style={{ y, opacity }}>
                <motion.div
                    initial={getInitial()}
                    whileInView={getAnimate()}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                        duration: 0.9,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default SectionWrapper;
