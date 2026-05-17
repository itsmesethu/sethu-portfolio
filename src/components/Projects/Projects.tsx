import { Grid, useMediaQuery } from '@mui/material'
import React from 'react'
import styles from './Projects.module.scss'
import data from '@/data/data.json'

const Projects = () => {
    const { projects } = data;
    const deskView = useMediaQuery('(min-width: 1024px)');

    return (
        <Grid container size={12} className={styles.contentMain}>
            <Grid container size={12} className={styles.mainWrap}>
                <Grid size={12} className={styles.titleMain}>
                    {projects.title}
                </Grid>
                <Grid container size={12} className={styles.content}>
                    {projects.list.map((project, index) => (
                        <Grid container size={12} className={styles.expWrap} key={index}>
                            <Grid container size={12} className={styles.top}>
                                <Grid size={12} className={styles.name}>
                                    {project.name}
                                </Grid>
                                <Grid size={12} className={styles.info2}>
                                    {project.company}
                                </Grid>
                            </Grid>
                            <Grid size={12} className={styles.desc}>
                                {project.description}
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Projects
