import React from 'react';
import FilterByGenres from '../Filters/FilterByGenres.jsx';
import ExistentOrCreated from '../Filters/ExistentOrCreated.jsx';
import OrderAlph from '../Order/OrderAlph.jsx';
import OrderByRating from '../Order/OrderByRating.jsx';
import { useDispatch } from "react-redux";
import { clearFilters } from '../../actions/actions.js';
import styles from './NavBar.module.css';

export default function NavBar() {
    const dispatch = useDispatch();

    function handleClearFilters() {
        dispatch(clearFilters());
    };

    return (
        <nav className={styles.bar}>
            <button className={styles.button} onClick={e => handleClearFilters(e)}>Clear!</button>
            <FilterByGenres />
            <ExistentOrCreated />
            <OrderAlph />
            <OrderByRating />
        </nav>
    );
};