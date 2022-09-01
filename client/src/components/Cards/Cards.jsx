import React from 'react';
import styles from './Cards.module.css';

export default function Cards({name, image, rating, genres}) {
    return (
        <div className={styles.container}>
                <span></span>
                <div className={styles.content}>
                    <img className={styles.img} src={image} alt='img not found' />
                    <h2 className={styles.name}>{name}</h2>
                    <h3 className={styles.genres}>{genres}.</h3>
                    <h4 className={styles.rating}>Rating: {rating}</h4>
                </div>
        </div>
    );
};