import React from 'react';
import clsx from 'clsx'
import styles from './CommonUI.module.css';

export default function IconButton({ size, children, className, ...props }) {
    return (
        <button className={clsx(styles.iconButton, className)} {...props}>
            {children}
        </button>
    )
}