import { Grid } from '@mui/material'
import React from 'react'
import styles from './About.module.scss'
import data from '@/data/data.json'

const About = () => {
    const { about } = data;

    return (
        <Grid container size={12} className={styles.contentMain}>
            <Grid container size={12} className={styles.mainWrap}>
                <Grid size={12} className={styles.titleMain}>
                    {about.title}
                </Grid>
                <Grid size={12} className={styles.content}>
                    {about.description}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default About
