import React from 'react';
import Link from 'next/link';
import styles from '../styles/navbar.module.css';

const navbar = () => {
    return (
        <ul className={styles.container}>
            <li>
                <Link href='/'>
                    <a><span className={styles.background}></span>ฟีต</a>
                </Link>
            </li>
            <li>
                <Link href='/post'>
                    <a><span className={styles.background}></span>โพสต์กิจกรรม</a>
                </Link>
            </li>
            <li>
                <Link href='/chat'>
                    <a><span className={styles.background}></span>แชท</a>
                </Link>
            </li>
        </ul>
    );
}

export default navbar;
