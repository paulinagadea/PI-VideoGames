import React from 'react';
import { useDispatch } from 'react-redux';
import { existentOrCreated, changePage } from '../../actions/actions.js';
import styles from '../NavBar/NavBar.module.css';

export default function ExistentOrCreated() {
    const dispatch = useDispatch();

    function handleExistentOrCreated(e) {
        dispatch(existentOrCreated(e.target.value));
        dispatch(changePage(0));
    };

    return (
        <div className={styles.container}>
            <select className={styles.select} onChange={(e) => {handleExistentOrCreated(e)}}>
                <option>Filter by origin:</option>
                <option value='all'>All videogames</option>
                <option value='api'>Existent</option>
                <option value='created'>Created</option>
            </select>
        </div>
    );
};