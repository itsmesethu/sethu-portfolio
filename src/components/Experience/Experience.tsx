import { Grid, useMediaQuery } from '@mui/material'
import React from 'react'
import styles from './Experience.module.scss'

const Experience = () => {

    const deskView = useMediaQuery('(min-width: 1024px)');

    return (
        <Grid container size={12} className={styles.contentMain}>
            <Grid container size={12} className={styles.mainWrap}>
                <Grid size={12} className={styles.titleMain}>
                    My Experience
                </Grid>
                <Grid container size={12} className={styles.content}>
                    <Grid container size={12} className={styles.expWrap}>
                        <Grid container size={12} className={styles.top}>
                            <Grid size={deskView ? 6 : 12} className={styles.name}>
                                Nova Prime Solutions
                            </Grid>
                            <Grid size={deskView ? 6 : 12} className={styles.info2}>
                                <Grid className={styles.location}>
                                    Hyderabad {deskView? ',':''}
                                </Grid>
                                <Grid className={styles.timeline}>
                                    Nov 2023 - Present
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid size={12} className={styles.role}>
                            IT Analyst (Frontend Dev)
                        </Grid>
                        <Grid size={12} className={styles.desc}>
                            <ul>
                                <li>Designed and developed responsive interfaces using React.js and SCSS.</li>
                                <li>Integrated Google Maps and Stripe payment gateway into the main e-commerce app.</li>
                                <li>Built a partner app with real-time previews and onboarding for storefronts.</li>
                            </ul>
                        </Grid>
                    </Grid>
                    <Grid container size={12} className={styles.expWrap}>
                        <Grid container size={12} className={styles.top}>
                            <Grid size={deskView ? 6 : 12} className={styles.name}>
                                Toast, Inc.
                            </Grid>
                            <Grid size={deskView ? 6 : 12} className={styles.info2}>
                                <Grid className={styles.location}>
                                    Chennai {deskView? ',':''}
                                </Grid>
                                <Grid className={styles.timeline}>
                                    Aug 2022 - Jun 2023
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid size={12} className={styles.role}>
                            Software Engineer Intern
                        </Grid>
                        <Grid size={12} className={styles.desc}>
                            <ul>
                                <li>Worked with C#, .NET, and MVC to develop internal enterprise tools.</li>
                                <li>Built an Employee Management System with role-based access and full CRUD features.</li>
                                <li>Contributed to the Red Flag Team, identifying and fixing bugs in legacy code.</li>
                            </ul>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Experience
