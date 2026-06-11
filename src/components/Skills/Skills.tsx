'use client';
import React, { useRef, useState } from 'react'
import styles from './Skills.module.scss'
import data from '@/data/data.json'
import { motion, useScroll, useTransform } from 'framer-motion'

interface TiltCardProps {
    logo: string;
    name: string;
    index: number;
}

const TiltCard: React.FC<TiltCardProps> = ({ logo, name, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('');

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (py - 0.5) * -22;
        const ry = (px - 0.5) * 22;
        setTransform(`perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.08)`);
    };

    const handleLeave = () => {
        setTransform('perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.7 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className={styles.cardWrap}
        >
            <div
                ref={cardRef}
                className={styles.cardMain}
                style={{ transform }}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
            >
                <div className={styles.glassReflection} />
                <div className={styles.logo}>
                    <img src={logo} alt={name} />
                </div>
                <div className={styles.text}>{name}</div>
                <div className={styles.hoverGlow} />
            </div>
        </motion.div>
    );
};

const Skills = () => {
    const { skills } = data;
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const titleScale = useTransform(scrollYProgress, [0, 0.4], [0.7, 1]);
    const titleOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);

    return (
        <div ref={ref} className={styles.contentMain}>
            <div className={styles.mainWrap}>
                <motion.div className={styles.header} style={{ scale: titleScale, opacity: titleOpacity }}>
                    <div className={styles.sectionLabel}>
                        <span className={styles.num}>03</span>
                        <span className={styles.line} />
                        <span className={styles.labelText}>Skills</span>
                    </div>
                    <h2 className={styles.title}>{skills.title}</h2>
                    <p className={styles.subtitle}>{skills.description}</p>
                </motion.div>

                <div className={styles.cardsDisplay}>
                    {skills.list.slice(0, 11).map((skill, index) => (
                        <TiltCard key={index} logo={skill.logo} name={skill.name} index={index} />
                    ))}
                </div>

                <motion.p
                    className={styles.toolsLabel}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {skills.toolsDescription}
                </motion.p>

                <div className={`${styles.cardsDisplay} ${styles.tools}`}>
                    {skills.list.slice(11).map((skill, index) => (
                        <TiltCard key={index} logo={skill.logo} name={skill.name} index={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Skills
