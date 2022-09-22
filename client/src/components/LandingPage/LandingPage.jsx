import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage() {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <p className={styles.glitch}>         
                    <span aria-hidden='true'>THE ULTIMATE GAME</span>THE ULTIMATE GAME<span aria-hidden='true'>THE ULTIMATE GAME</span>       
                </p>
                <Link to='/home'>
                    <button className={styles.button}><span></span><span></span><span></span><span></span>Home!</button>
                </Link>
            </div>
           
        </div>
    );
};