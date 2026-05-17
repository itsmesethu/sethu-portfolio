import { Grid, useMediaQuery } from '@mui/material'
import React from 'react'
import styles from './Experience.module.scss'
import data from '@/data/data.json'

const Experience = () => {
    const { experience } = data;
    const deskView = useMediaQuery('(min-width: 1024px)');

    return (
        <Grid container size={12} className={styles.contentMain}>
            <Grid container size={12} className={styles.mainWrap}>
                <Grid size={12} className={styles.titleMain}>
                    {experience.title}
                </Grid>
                <Grid container size={12} className={styles.content}>
                    {experience.jobs.map((job, index) => (
                        <Grid container size={12} className={styles.expWrap} key={index}>
                            <Grid container size={12} className={styles.top}>
                                <Grid size={deskView ? 6 : 12} className={styles.name}>
                                    {job.company}
                                </Grid>
                                <Grid size={deskView ? 6 : 12} className={styles.info2}>
                                    <Grid className={styles.location}>
                                        {job.location} {deskView? ',':''}
                                    </Grid>
                                    <Grid className={styles.timeline}>
                                        {job.timeline}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid size={12} className={styles.role}>
                                {job.role}
                            </Grid>
                            <Grid size={12} className={styles.desc}>
                                <ul>
                                    {job.responsibilities.map((responsibility, idx) => (
                                        <li key={idx}>{responsibility}</li>
                                    ))}
                                </ul>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Experience
