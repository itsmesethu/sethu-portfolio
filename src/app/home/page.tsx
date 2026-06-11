'use client';
import React from 'react';
import styles from './page.module.scss';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Skills from '@/components/Skills/Skills';
import Projects from '@/components/Projects/Projects';
import Experience from '@/components/Experience/Experience';
import ContactForm from '@/components/ContactForm/ContactForm';
import StarField from '@/components/StarField/StarField';
import { ScrollProvider, useScrollContext } from '@/components/ScrollProvider/ScrollProvider';
import ScrollProgress from '@/components/ScrollProgress/ScrollProgress';
import SectionNav from '@/components/SectionNav/SectionNav';
import Panel from '@/components/Panel/Panel';

const HomeInner = () => {
    const { scrollProgress, mouse } = useScrollContext();

    return (
        <div className={styles.homeContainer}>
            <StarField />
            <div className={styles.vignette} />

            <ScrollProgress />
            <SectionNav />

            <div className={styles.content}>
                <Panel index={0} id="home">
                    <Hero />
                </Panel>

                <Panel index={1} id="about">
                    <About />
                </Panel>

                {/* Experience manages its own pinned/horizontal scroll height */}
                <div id="experience" className={styles.experienceMount}>
                    <ExperienceRegister />
                    <Experience />
                </div>

                <Panel index={3} id="skills">
                    <Skills />
                </Panel>

                {/* Projects manages its own pinned stacked-card scroll height */}
                <div id="projects" className={styles.projectsMount}>
                    <ProjectsRegister />
                    <Projects />
                </div>

                <Panel index={5} id="contact">
                    <ContactForm />
                </Panel>

                <footer className={styles.footer}>
                    <div className={styles.footerLine} />
                    <p>Designed &amp; Built by Sethu — crafted among the stars</p>
                </footer>
            </div>
        </div>
    );
};

// Register the custom-height sections (Experience=2, Projects=4) with the nav
const ExperienceRegister = () => {
    const { registerSection } = useScrollContext();
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const el = ref.current?.parentElement as HTMLElement | null;
        registerSection(2, el);
        return () => registerSection(2, null);
    }, [registerSection]);
    return <div ref={ref} style={{ position: 'absolute' }} />;
};

const ProjectsRegister = () => {
    const { registerSection } = useScrollContext();
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const el = ref.current?.parentElement as HTMLElement | null;
        registerSection(4, el);
        return () => registerSection(4, null);
    }, [registerSection]);
    return <div ref={ref} style={{ position: 'absolute' }} />;
};

const HomePage = () => {
    return (
        <ScrollProvider>
            <HomeInner />
        </ScrollProvider>
    );
};

export default HomePage;
