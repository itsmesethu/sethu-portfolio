import { Grid } from '@mui/material'
import React from 'react'
import styles from './UnderDev.module.scss';

const UnderDev = () => {
    return (
        <Grid container size={12} className={styles.gap}>
            ⚠️ Site under Development. ⚠️
        </Grid>
    )
}

export default UnderDev
