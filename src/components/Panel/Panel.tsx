'use client';
import React, { ReactNode, useRef, useEffect } from 'react';
import { useScrollContext } from '../ScrollProvider/ScrollProvider';
import styles from './Panel.module.scss';

interface PanelProps {
    children: ReactNode;
    index: number;
    id?: string;
    className?: string;
}

const Panel: React.FC<PanelProps> = ({ children, index, id, className }) => {
    const ref = useRef<HTMLElement>(null);
    const { registerSection } = useScrollContext();

    useEffect(() => {
        registerSection(index, ref.current);
        return () => registerSection(index, null);
    }, [index, registerSection]);

    return (
        <section
            ref={ref}
            id={id}
            className={`${styles.panel} ${className || ''}`}
        >
            {children}
        </section>
    );
};

export default Panel;
