'use client';
import React, { useRef } from 'react'
import styles from './About.module.scss'
import data from '@/data/data.json'
import { motion, useScroll, useTransform } from 'framer-motion'

const About = () => {
    const { about } = data;
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const words = about.description.split(' ');

    const titleScale = useTransform(scrollYProgress, [0, 0.4], [0.6, 1]);
    const titleOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);
    const labelX = useTransform(scrollYProgress, [0, 0.5], [-80, 0]);

    return (
        <div ref={ref} className={styles.contentMain}>
            <div className={styles.mainWrap}>
                <motion.div className={styles.sectionLabel} style={{ x: labelX, opacity: titleOpacity }}>
                    <span className={styles.num}>01</span>
                    <span className={styles.line} />
                    <span className={styles.labelText}>About</span>
                </motion.div>

                <motion.h2 className={styles.title} style={{ scale: titleScale, opacity: titleOpacity }}>
                    Crafting digital<br />
                    <span className={styles.gradient}>experiences</span>
                </motion.h2>

                <p className={styles.paragraph}>
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + 1 / words.length;
                        return <Word key={i} range={[start * 0.5 + 0.15, end * 0.5 + 0.15]} progress={scrollYProgress}>{word}</Word>;
                    })}
                </p>
            </div>
        </div>
    )
}

interface WordProps {
    children: string;
    range: [number, number];
    progress: ReturnType<typeof useScroll>['scrollYProgress'];
}

const Word: React.FC<WordProps> = ({ children, range, progress }) => {
    const opacity = useTransform(progress, range, [0.12, 1]);
    const y = useTransform(progress, range, [14, 0]);
    return (
        <span className={styles.word}>
            <motion.span style={{ opacity, y, display: 'inline-block' }}>{children}</motion.span>
            {'\u00A0'}
        </span>
    );
};

export default About
