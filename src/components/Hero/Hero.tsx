import styles from "./Hero.module.scss";
import Image from "next/image";
import mainPic from "../../../public/assets/sethu-profile.jpg";
import { Grid, useMediaQuery } from '@mui/material';
import { AiFillLinkedin, AiFillInstagram, AiFillFilePdf } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";
import Link from "next/link";
import data from "@/data/data.json";

export default function Hero() {

    const lapView = useMediaQuery('(min-width:1024px)');
    const { hero } = data;

    function downloadResume() {
        const link = document.createElement('a');
        link.href = hero.resumePath;
        link.download = hero.resumeDownloadName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <Grid container size={12} className={styles.heroMain}>
            <Grid container size={12} className={styles.mainWrap}>
                {lapView && (
                    <Grid container size={2} className={styles.navWrap}>
                        <Grid container size={12} className={styles.navContainer}>
                            {hero.navigation.map((nav, index) => (
                                <Link 
                                    key={index}
                                    href={nav.href} 
                                    className={nav.isTop ? `${styles.navItem} ${styles.top}` : styles.navItem}
                                >
                                    <button>
                                        {nav.label}
                                    </button>
                                </Link>
                            ))}
                        </Grid>
                    </Grid>
                )}
                <Grid container size={6} className={styles.heroContent}>
                    <Grid size={12} className={styles.textMain}>
                        {hero.greeting} <br /> I'm {hero.name}
                        <br />{hero.title}
                    </Grid>
                    <Grid container size={12}>
                        <Grid size={12} className={styles.buttonMain}>
                            <Link href="#contact">
                                <button className={styles.cButton}>
                                    Connect
                                    <div className={styles.glassReflection}></div>
                                </button>
                            </Link>
                        </Grid>
                        <Grid container size={12} className={styles.socialIcons}>
                            <Link href={hero.socialLinks.linkedin} target="_blank"><AiFillLinkedin /></Link>
                            <Link href={hero.socialLinks.instagram} target="_blank"><AiFillInstagram /></Link>
                            <Link href=""><IoMdMail onClick={() => window.location.href = `mailto:${hero.email}?subject=${hero.emailSubject}&body=${hero.emailBody}`} /></Link>
                            <Link href=""><AiFillFilePdf onClick={() => downloadResume()} /></Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container size={lapView ? 4 : 6} className={styles.imageWrap}>
                    <Image src={mainPic} alt={"my image"} />
                </Grid>
            </Grid>
        </Grid >
    );
}
