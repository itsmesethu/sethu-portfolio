'use client';
import React, { useRef, useEffect } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import styles from './ContactForm.module.scss';
import data from '@/data/data.json';
import { motion, useScroll, useTransform } from 'framer-motion';

const ContactForm = () => {
    const { contact, hero } = data;
    const [state, handleSubmit] = useForm(contact.formspreeId);
    const formRef = useRef<HTMLFormElement>(null);
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });
    const panelScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
    const panelOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
    const panelRotateX = useTransform(scrollYProgress, [0, 1], [12, 0]);

    useEffect(() => {
        if (state.succeeded && formRef.current) {
            formRef.current.reset()
        }
    }, [state.succeeded]);

    return (
        <div ref={ref} className={styles.contentMain}>
            <motion.div
                className={styles.mainWrap}
                style={{ scale: panelScale, opacity: panelOpacity, rotateX: panelRotateX }}
            >
                <div className={styles.left}>
                    <div className={styles.sectionLabel}>
                        <span className={styles.num}>05</span>
                        <span className={styles.line} />
                        <span className={styles.labelText}>Contact</span>
                    </div>
                    <h2 className={styles.title}>
                        Let&apos;s build<br /><span className={styles.gradient}>something great</span>
                    </h2>
                    <p className={styles.blurb}>
                        Have a project in mind or just want to say hi? My inbox is always open.
                    </p>
                    <a href={`mailto:${hero.email}`} className={styles.email}>{hero.email}</a>
                </div>

                <div className={styles.right}>
                    <form onSubmit={handleSubmit} className={styles.form} ref={formRef}>
                        <div className={styles.field}>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" name="name" placeholder="Your name" />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" name="email" placeholder="your@email.com" />
                            <ValidationError prefix="Email" field="email" errors={state.errors} className={styles.error} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" placeholder="Tell me about your idea..." />
                            <ValidationError prefix="Message" field="message" errors={state.errors} className={styles.error} />
                        </div>
                        <motion.button
                            type="submit"
                            disabled={state.submitting}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className={styles.submit}
                        >
                            <span>{state.submitting ? 'Sending...' : 'Send Message'}</span>
                            <div className={styles.btnGlow} />
                        </motion.button>
                        {state.succeeded && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={styles.success}
                            >
                                Message sent! I&apos;ll get back to you soon.
                            </motion.div>
                        )}
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default ContactForm
