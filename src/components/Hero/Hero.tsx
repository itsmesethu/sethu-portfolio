import styles from "./Hero.module.scss";
import Image from "next/image";
import mainPic from "../../../public/assets/sethu-profile.jpg";
import { Grid, useMediaQuery } from '@mui/material';
import { AiFillLinkedin, AiFillInstagram, AiFillFilePdf } from "react-icons/ai";
import Link from "next/link";

export default function Hero() {

    const lapView = useMediaQuery('(min-width:1024px)');

    function downloadResume() {
        const link = document.createElement('a');
        link.href = '/sethu_resume.pdf'; 
        link.download = 'Sethu_Resume.pdf'; 
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
                            <Link href="" className={`${styles.navItem} ${styles.top}`}>
                                <button>
                                    SR
                                </button>
                            </Link>
                            <Link href="#about" className={styles.navItem}>
                                <button>
                                    About
                                </button>
                            </Link>
                            <Link href="#projects" className={styles.navItem}>
                                <button>
                                    Projects
                                </button>
                            </Link>
                            <Link href="#skills" className={styles.navItem}>
                                <button>
                                    Skills
                                </button>
                            </Link>
                            <Link href="#contact" className={styles.navItem}>
                                <button>
                                    Contact
                                </button>
                            </Link>
                            <Link href="#more" className={styles.navItem}>
                                <button>
                                    More
                                </button>
                            </Link>
                        </Grid>
                    </Grid>
                )}
                <Grid container size={6} className={styles.heroContent}>
                    <Grid size={12} className={styles.textMain}>
                        Hey, <br /> I'm Sethu
                        <br />Frontend&nbsp;Developer
                    </Grid>
                    <Grid container size={12}>
                    <Grid size={12} className={styles.buttonMain}>
                        <button className={styles.cButton} onClick={() => window.location.href = "mailto:sethuraman0709@gmail.com?subject=Let's Connect&body=Hi Sethu,"}>
                            Connect
                        </button>
                    </Grid>
                    <Grid container size={12} className={styles.socialIcons}>
                        <Link href="https://www.linkedin.com/in/sethuraman-m" target="_blank"><AiFillLinkedin /></Link>
                        <Link href="https://www.instagram.com/saturn.79?igsh=dGprM3UzMTdnN2w1" target="_blank"><AiFillInstagram /></Link>
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
