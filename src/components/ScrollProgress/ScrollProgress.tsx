'use client';
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import styles from './ScrollProgress.module.scss';

const ScrollProgress: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    return <motion.div className={styles.bar} style={{ scaleX }} />;
};

export default ScrollProgress;
