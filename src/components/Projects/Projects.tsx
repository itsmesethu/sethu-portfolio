import { Grid, useMediaQuery } from '@mui/material'
import React from 'react'
import styles from './Projects.module.scss'

const Projects = () => {

    const deskView = useMediaQuery('(min-width: 1024px)');

    return (
        <Grid container size={12} className={styles.contentMain}>
            <Grid container size={12} className={styles.mainWrap}>
                <Grid size={12} className={styles.titleMain}>
                    My Projects
                </Grid>
                <Grid container size={12} className={styles.content}>
                    <Grid container size={12} className={styles.expWrap}>
                        <Grid container size={12} className={styles.top}>
                            <Grid size={12} className={styles.name}>
                                Etailkart - Ecommerce
                            </Grid>
                            <Grid size={12} className={styles.info2}>
                                @ Nova Prime Solutions
                            </Grid>
                        </Grid>
                        <Grid size={12} className={styles.desc}>
                            A modern e-commerce platform designed to help small businesses easily create and manage their online stores with instant deployment, fast payments, and seamless shipping integration. Includes a dedicated partner app for simplified product, order, and storefront management.
                            Built with a responsive, mobile-first UI using React.js, Next.js and SCSS, ensuring performance and accessibility across devices. Integrated Stripe for secure transactions and Google Maps for accurate address handling. The platform offers real-time storefront previews, dynamic onboarding flows, and user-friendly dashboards—streamlining the entire setup process from product listing to order fulfillment.
                            Also developed a React Native mobile app for store owners, enabling easy management of orders, inventory, and notifications on the go, ensuring seamless store operations from any device.
                        </Grid>
                    </Grid>
                    <Grid container size={12} className={styles.expWrap}>
                        <Grid container size={12} className={styles.top}>
                            <Grid size={12} className={styles.name}>
                                XtraChef - Red Flags
                            </Grid>
                            <Grid size={12} className={styles.info2}>
                                @ Toast, Inc.
                            </Grid>
                        </Grid>
                        <Grid size={12} className={styles.desc}>
                            Contributed to the stability and quality of a large-scale enterprise web application by identifying, analyzing, and resolving critical bugs in the development codebase. Utilized C#, .NET, and MVC architecture to debug issues, refactor inefficient logic, and implement scalable, maintainable fixes aligned with coding standards. Worked closely with QA and senior developers to triage issues, reproduce edge cases, and deliver solutions that improved performance, reduced defect recurrence, and supported smooth release cycles. Also participated in reviewing legacy code and documenting resolved issues to support ongoing maintenance.
                        </Grid>
                    </Grid>
                    <Grid container size={12} className={styles.expWrap}>
                        <Grid container size={12} className={styles.top}>
                            <Grid size={12} className={styles.name}>
                                Employee Payroll Management
                            </Grid>
                            <Grid size={12} className={styles.info2}>
                                @ Toast, Inc.
                            </Grid>
                        </Grid>
                        <Grid size={12} className={styles.desc}>
                            A full-stack web application developed during my internship at Toast Inc. to manage employee records, roles, payroll, and access levels. Built with C#, ASP.NET MVC, SQL, and REST APIs for backend services, and used React.js and CSS for building a responsive, user-friendly frontend interface.
                            Key features included employee onboarding, role-based authentication, payroll management, attendance tracking, and full CRUD operations. Emphasized clean architecture, secure data handling, and seamless API integration between the backend and frontend layers for efficient and scalable performance.
                        </Grid>
                    </Grid>
                    <Grid container size={12} className={styles.expWrap}>
                        <Grid container size={12} className={styles.top}>
                            <Grid size={12} className={styles.name}>
                                Virtual Game Controller - PC
                            </Grid>
                            <Grid size={12} className={styles.info2}>
                                with head pose estimation
                            </Grid>
                        </Grid>
                        <Grid size={12} className={styles.desc}>
                            An interactive project that uses machine learning and facial point detection to build a hands-free virtual game controller. Leveraged head pose estimation techniques using ML libraries to track real-time head movements and map them to directional controls. Integrated the input system with a simple kart racing game developed in Unity, enabling players to steer and control the game using only head gestures. Focused on enhancing accessibility in gaming through computer vision, real-time input mapping, and Unity game integration.
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Projects
