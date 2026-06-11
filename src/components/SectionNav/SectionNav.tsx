'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollContext } from '../ScrollProvider/ScrollProvider';
import styles from './SectionNav.module.scss';

const LABELS = ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'];

const SectionNav: React.FC = () => {
    const { activeSection, scrollToSection } = useScrollContext();

    return (
        <motion.nav
            className={styles.nav}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
        >
            {LABELS.map((label, i) => (
                <button
                    key={label}
                    className={`${styles.dot} ${activeSection === i ? styles.active : ''}`}
                    onClick={() => scrollToSection(i)}
                    aria-label={label}
                >
                    <span className={styles.label}>{label}</span>
                    <span className={styles.indicator} />
                </button>
            ))}
        </motion.nav>
    );
};

export default SectionNav;
