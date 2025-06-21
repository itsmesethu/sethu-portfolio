import { Grid } from '@mui/material'
import React from 'react'
import styles from './About.module.scss'

const About = () => {

    return (
        <Grid container size={12} className={styles.contentMain}>
            <Grid container size={12} className={styles.mainWrap}>
                <Grid size={12} className={styles.titleMain}>
                    About me
                </Grid>
                <Grid size={12} className={styles.content}>
                    I'm a passionate Frontend Developer with a strong eye for design and detail, committed to building fast, accessible, and responsive user interfaces. With experience in React, Next.js, and modern CSS frameworks, I bridge the gap between design and development to deliver smooth, intuitive web experiences. Whether it's crafting clean code or collaborating with teams to solve real-world problems, I focus on creating products that are not only functional but also visually compelling. Every line of code I write is driven by a desire to turn ideas into impact.
                </Grid>
            </Grid>
        </Grid>
    )
}

export default About
