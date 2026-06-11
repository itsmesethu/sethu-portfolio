'use client';
import styles from "./Hero.module.scss";
import { AiFillLinkedin, AiFillInstagram, AiFillFilePdf } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";
import Link from "next/link";
import data from "@/data/data.json";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import MagneticButton from "../MagneticButton/MagneticButton";

export default function Hero() {
    const { hero } = data;
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const contentY = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const contentBlur = useTransform(scrollYProgress, [0, 0.6], [0, 8]);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const filter = useTransform(contentBlur, (b) => `blur(${b}px)`);

    const [typedText, setTypedText] = useState("");
    const fullTitle = hero.title;
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTypedText(fullTitle.slice(0, i + 1));
            i++;
            if (i >= fullTitle.length) clearInterval(interval);
        }, 90);
        return () => clearInterval(interval);
    }, [fullTitle]);

    function downloadResume() {
        const link = document.createElement('a');
        link.href = hero.resumePath;
        link.download = hero.resumeDownloadName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const letterContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.03, delayChildren: 0.4 } },
    };
    const letter = {
        hidden: { scale: 8, opacity: 0, z: -1000 },
        visible: {
            scale: 1, opacity: 1, z: 0,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        },
    };

    const name = `I'm ${hero.name}`;

    return (
        <div ref={sectionRef} className={styles.heroRoot}>
            <motion.div className={styles.heroContent} style={{ y: contentY, scale: contentScale, opacity, filter }}>
                <motion.div
                    className={styles.tag}
                    initial={{ opacity: 0, y: 20, letterSpacing: "20px" }}
                    animate={{ opacity: 1, y: 0, letterSpacing: "6px" }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    {hero.greeting}
                </motion.div>

                <motion.h1
                    className={styles.name}
                    variants={letterContainer}
                    initial="hidden"
                    animate="visible"
                    aria-label={name}
                >
                    {name.split("").map((char, i) => (
                        <motion.span key={i} variants={letter} className={styles.char}>
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.div
                    className={styles.titleLine}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                >
                    <span className={styles.bracket}>&lt;</span>
                    {typedText}
                    <motion.span
                        className={styles.cursor}
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.7 }}
                    >
                        _
                    </motion.span>
                    <span className={styles.bracket}>/&gt;</span>
                </motion.div>

                <motion.div
                    className={styles.actions}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                >
                    <MagneticButton strength={0.3}>
                        <Link href="#contact">
                            <button className={styles.cButton}>
                                <span>Let&apos;s Connect</span>
                                <div className={styles.btnGlow}></div>
                            </button>
                        </Link>
                    </MagneticButton>
                    <div className={styles.socialIcons}>
                        {[
                            { icon: <AiFillLinkedin />, href: hero.socialLinks.linkedin, external: true },
                            { icon: <AiFillInstagram />, href: hero.socialLinks.instagram, external: true },
                            { icon: <IoMdMail />, href: "#", onClick: () => window.location.href = `mailto:${hero.email}?subject=${hero.emailSubject}&body=${hero.emailBody}` },
                            { icon: <AiFillFilePdf />, href: "#", onClick: () => downloadResume() },
                        ].map((item, i) => (
                            <MagneticButton key={i} strength={0.5}>
                                <motion.div
                                    whileHover={{ scale: 1.2, y: -4 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={styles.socialIcon}
                                >
                                    <Link href={item.href} target={item.external ? "_blank" : undefined} onClick={item.onClick}>
                                        {item.icon}
                                    </Link>
                                </motion.div>
                            </MagneticButton>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className={styles.scrollHint}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
                style={{ opacity }}
            >
                <span>Scroll to explore</span>
                <motion.div
                    className={styles.scrollMouse}
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                >
                    <div className={styles.scrollWheel} />
                </motion.div>
            </motion.div>
        </div>
    );
}
