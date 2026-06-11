'use client';
import React, { useRef } from 'react'
import styles from './Projects.module.scss'
import data from '@/data/data.json'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface CardProps {
    name: string;
    company: string;
    description: string;
    index: number;
    total: number;
    progress: MotionValue<number>;
}

const ProjectCard: React.FC<CardProps> = ({ name, company, description, index, total, progress }) => {
    const start = index / total;
    const end = (index + 1) / total;

    // Each card scales down slightly and pushes back as the next stacks on top
    const scale = useTransform(progress, [start, 1], [1, 1 - (total - index) * 0.04]);
    const rotate = useTransform(progress, [start, end], [index % 2 === 0 ? -3 : 3, 0]);

    return (
        <div className={styles.cardSticky} style={{ top: `calc(12vh + ${index * 28}px)` }}>
            <motion.div
                className={styles.card}
                style={{ scale, rotate }}
            >
                <div className={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</div>
                <div className={styles.cardHeader}>
                    <h3 className={styles.name}>{name}</h3>
                    <span className={styles.company}>{company}</span>
                </div>
                <p className={styles.desc}>{description}</p>
                <div className={styles.borderGlow} />
            </motion.div>
        </div>
    );
};

const Projects = () => {
    const { projects } = data;
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end end'],
    });

    const total = projects.list.length;

    return (
        <section ref={ref} className={styles.track}>
            <div className={styles.intro}>
                <div className={styles.sectionLabel}>
                    <span className={styles.num}>04</span>
                    <span className={styles.line} />
                    <span className={styles.labelText}>Projects</span>
                </div>
                <h2 className={styles.title}>{projects.title}</h2>
            </div>
            <div className={styles.cards}>
                {projects.list.map((project, index) => (
                    <ProjectCard
                        key={index}
                        name={project.name}
                        company={project.company}
                        description={project.description}
                        index={index}
                        total={total}
                        progress={scrollYProgress}
                    />
                ))}
            </div>
        </section>
    )
}

export default Projects
