'use client';
import React from 'react';
import { motion, easeInOut } from 'framer-motion';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

const TextReveal: React.FC<TextRevealProps> = ({
    text,
    className,
    delay = 0,
    staggerDelay = 0.03,
    tag = 'div',
}) => {
    const words = text.split(' ');

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    const wordVariant = {
        hidden: {
            y: 40,
            opacity: 0,
            filter: 'blur(8px)',
        },
        visible: {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
                duration: 0.6,
                ease: easeInOut,
            },
        },
    };

    const MotionTag = motion.create(tag as keyof HTMLElementTagNameMap);

    return (
        <MotionTag
            className={className}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em', justifyContent: 'inherit' }}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    variants={wordVariant}
                    style={{ display: 'inline-block' }}
                >
                    {word}
                </motion.span>
            ))}
        </MotionTag>
    );
};

export default TextReveal;
