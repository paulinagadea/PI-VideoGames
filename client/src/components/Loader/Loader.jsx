import React from 'react';
import styles from './Loader.module.css';

export default function Loader() {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <img src={"https://i.pinimg.com/originals/a7/b6/81/a7b681d443e7bbfeb91411c25ce0559f.gif"} alt='img not found' />
                <h1 className={styles.title}>Loading...</h1>
            </div>
        </div>
    );
};
