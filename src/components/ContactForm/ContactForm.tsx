import React, { useRef, useEffect } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { Grid } from '@mui/material';
import styles from './ContactForm.module.scss';

const ContactForm = () => {
    const [state, handleSubmit] = useForm("myzjnjog");
    const formRef = useRef(null);

    useEffect(() => {
        if (state.succeeded && formRef.current) {
            formRef.current.reset()
        }
    }, [state.succeeded]);
    return (

        <Grid container size={12} className={styles.contentMain}>
            <Grid container size={12} className={styles.mainWrap}>
                <Grid size={12} className={styles.titleMain}>
                    Contact me
                </Grid>
                <Grid size={12} className={styles.content}>
                    <form onSubmit={handleSubmit} className={styles.form} ref={formRef}>
                        <Grid size={12} className={styles.fieldName}>
                            <label>
                                Name
                            </label>
                        </Grid>
                        <Grid size={12} className={styles.fieldValue}>
                            <input
                                id="name"
                                type="text"
                                name="name"
                            />
                        </Grid>
                        <Grid size={12} className={styles.fieldName}>
                            <label>
                                Email Address
                            </label>
                        </Grid>
                        <Grid size={12} className={styles.fieldValue}>
                            <input
                                id="email"
                                type="email"
                                name="email"
                            />
                        </Grid>
                        <Grid size={12} className={styles.fieldError}>
                            <ValidationError
                                prefix="Email"
                                field="email"
                                errors={state.errors}
                            />
                        </Grid>
                        <Grid size={12} className={styles.fieldName}>
                            <label htmlFor="email">
                                Message
                            </label>
                        </Grid>
                        <Grid size={12} className={styles.fieldValue}>
                            <textarea
                                id="message"
                                name="message"
                            />
                        </Grid>
                        <Grid size={12} className={styles.fieldError}>
                            <ValidationError
                                prefix="Message"
                                field="message"
                                errors={state.errors}
                            />
                        </Grid>
                        <Grid size={12} className={styles.fieldButton}>
                            <button type="submit" disabled={state.submitting}>
                                Submit
                            </button>
                        </Grid>

                        {state.succeeded && (
                            <Grid size={12} className={styles.fieldMessage}>
                                Message Sent!
                            </Grid>
                        )}
                    </form>
                </Grid>
            </Grid >
        </Grid >


    )
}

export default ContactForm