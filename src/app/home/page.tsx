'use client';
import React from 'react';
import styles from './page.module.scss';
import { Grid } from '@mui/material';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Skills from '@/components/Skills/Skills';
import UnderDev from '@/components/UnderDev/UnderDev';
import Projects from '@/components/Projects/Projects';
import Experience from '@/components/Experience/Experience';
import { GrProjects } from 'react-icons/gr';

const HomePage = () => {
    return (
        <Grid container size={12} className={styles.homeContainer}>
            <Grid container size={12} className={styles.heroContainer}>
                <Hero />
            </Grid>
            <Grid container size={12} className={styles.gap}></Grid>
            <Grid container size={12} id="about" className={styles.divContainer}>
                <About />
            </Grid>
            <Grid container size={12} className={styles.gap}></Grid>
            <Grid container size={12} id="experience" className={styles.divContainer}>
                <Experience />
            </Grid>
            <Grid container size={12} className={styles.gap}></Grid>
            <Grid container size={12} id="skills" className={styles.divContainer}>
                <Skills />
            </Grid>
            <Grid container size={12} className={styles.gap}></Grid>
            <Grid container size={12} id="projects" className={styles.divContainer}>
                <Projects />
            </Grid>
            <Grid container size={12} className={styles.gap}></Grid>
            <UnderDev />
            <Grid container size={12} className={styles.gap}></Grid>
            {/* <div className={styles.stars}></div>
            <div className={styles.stars}></div> */}
            {/* <div className={styles.stars2}></div>
            <div className={styles.stars2}></div> */}
        </Grid>
    )
}

export default HomePage
