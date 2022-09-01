import React from 'react';
import { useDispatch } from 'react-redux';
import { orderAlph, changePage, setOrder } from '../../actions/actions.js';
import styles from '../NavBar/NavBar.module.css';

export default function OrderAlph() {
    const dispatch = useDispatch();
 
    function handleOrderAlph(e) {
        e.preventDefault();
        dispatch(orderAlph(e.target.value));
        dispatch(setOrder(e.target.value));
        dispatch(changePage(0));
    };

    return (
        <div className={styles.container}>
            <select className={styles.select} onChange={e => {handleOrderAlph(e)}}>
                <option>Sort by alphabet:</option>
                <option value='az'>A to Z</option>
                <option value='za'>Z to A</option>
            </select>
        </div>
    );
};