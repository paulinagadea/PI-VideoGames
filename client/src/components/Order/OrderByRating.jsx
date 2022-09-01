import React from 'react';
import { useDispatch } from 'react-redux';
import { orderByRating, changePage, setOrder } from '../../actions/actions.js';
import styles from '../NavBar/NavBar.module.css';

export default function OrderByRating() {
    const dispatch = useDispatch();

    function handleOrderByRating(e) {
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        dispatch(setOrder(e.target.value));
        dispatch(changePage(0));
    };
    
    return (
        <div className={styles.container}>
            <select className={styles.select} onChange={e => handleOrderByRating(e)}>
                <option>Sort by rating:</option>
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
            </select>
        </div>
    );
};