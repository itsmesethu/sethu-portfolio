import { Grid } from '@mui/material'
import React from 'react'
import styles from './Skills.module.scss'

const Skills = () => {

    const SkillsList = [
        {
            logo: '/assets/logos/react-2.svg',
            name: 'React JS'
        },
        {
            logo: '/assets/logos/next-js.svg',
            name: 'Next JS'
        },
        {
            logo: '/assets/logos/javascript-1.svg',
            name: 'Javascript'
        },
        {
            logo: '/assets/logos/typescript.svg',
            name: 'Typescript'
        },
        {
            logo: '/assets/logos/html-1.svg',
            name: 'HTML'
        },
        {
            logo: '/assets/logos/css-3.svg',
            name: 'CSS'
        },
        {
            logo: '/assets/logos/sass-1.svg',
            name: 'SASS'
        },
        {
            logo: '/assets/logos/node-js.png',
            name: 'NodeJS'
        },
        {
            logo: '/assets/logos/python-5.svg',
            name: 'Python'
        },
        {
            logo: '/assets/logos/rest-api.png',
            name: 'Rest API'
        },
        {
            logo: '/assets/logos/sql-1.svg',
            name: 'SQL'
        },
        {
            logo: '/assets/logos/github.png',
            name: 'GitHub'
        },
        {
            logo: '/assets/logos/figma-icon.svg',
            name: 'Figma'
        },
        {
            logo: '/assets/logos/visual-studio-code-1.svg',
            name: 'VS Code'
        },
        {
            logo: '/assets/logos/postman.svg',
            name: 'Postman'
        },
    ]

    return (
        <Grid container size={12} className={styles.contentMain}>
            <Grid container size={12} className={styles.mainWrap}>
                <Grid size={12} className={styles.titleMain}>
                    My Skills
                </Grid>
                <Grid size={12} className={styles.content}>
                    My journey in tech has helped me explore and master several tools and languages. Below are the core skills that reflect my experience and versatility:
                </Grid>
                <Grid container size={12} className={styles.cardsDisplay}>
                    {SkillsList.slice(0,11).map((skill, index) =>
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
                    Tools I'm familiar with:
                </Grid>
                <Grid container size={12} className={`${styles.cardsDisplay} ${styles.tools}`}>
                {SkillsList.slice(11,SkillsList.length).map((skill, index) =>
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
