import { Grid } from '@mui/material'
import React from 'react'
import styles from './Skills.module.scss'
import data from '@/data/data.json'

const Skills = () => {
    const { skills } = data;

    return (
        <Grid container size={12} className={styles.contentMain}>
            <Grid container size={12} className={styles.mainWrap}>
                <Grid size={12} className={styles.titleMain}>
                    {skills.title}
                </Grid>
                <Grid size={12} className={styles.content}>
                    {skills.description}
                </Grid>
                <Grid container size={12} className={styles.cardsDisplay}>
                    {skills.list.slice(0,11).map((skill, index) =>
                    (<Grid container className={styles.cardMain} key={index}>
                        <div className={styles.glassReflection}></div>
                        <Grid size={12} className={styles.logo}>
                            <img src={skill.logo} />
                        </Grid>
                        <Grid size={12} className={styles.text}>
                            {skill.name}
                        </Grid>
                    </Grid>
                    ))}
                </Grid>
                <Grid size={12} className={styles.content}>
                    {skills.toolsDescription}
                </Grid>
                <Grid container size={12} className={`${styles.cardsDisplay} ${styles.tools}`}>
                {skills.list.slice(11,skills.list.length).map((skill, index) =>
                (<Grid container className={styles.cardMain} key={index}>
                    <div className={styles.glassReflection}></div>
                    <Grid size={12} className={styles.logo}>
                        <img src={skill.logo} />
                    </Grid>
                    <Grid size={12} className={styles.text}>
                        {skill.name}
                    </Grid>
                </Grid>
                ))}
            </Grid>
            </Grid>
        </Grid>
    )
}

export default Skills
