'use client';
import React from 'react'
import styles from './Experience.module.scss'
import data from '@/data/data.json'

const Experience = () => {
    const { experience } = data;

    return (
        <section className={styles.container}>
            <div className={styles.contentWrapper}>
                <div className={styles.header}>
                    <div className={styles.sectionLabel}>
                        <span className={styles.num}>02</span>
                        <span className={styles.line} />
                        <span className={styles.labelText}>Experience</span>
                    </div>
                    <h2 className={styles.title}>{experience.title}</h2>
                </div>

                <div className={styles.grid}>
                    {experience.jobs.map((job, index) => (
                        <div 
                            className={styles.card} 
                            key={index}
                        >
                            <div className={styles.cardIndex}>{String(index + 1).padStart(2, '0')}</div>
                            <div className={styles.cardTop}>
                                <h3 className={styles.company}>{job.company}</h3>
                                <div className={styles.meta}>
                                    <span className={styles.location}>{job.location}</span>
                                    <span className={styles.dot}>•</span>
                                    <span className={styles.timeline}>{job.timeline}</span>
                                </div>
                            </div>
                            <div className={styles.role}>{job.role}</div>
                            <ul className={styles.desc}>
                                {job.responsibilities.map((r, idx) => (
                                    <li key={idx}>{r}</li>
                                ))}
                            </ul>
                            <div className={styles.cardGlow} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Experience
