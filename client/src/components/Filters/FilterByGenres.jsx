import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByGenres, changePage } from '../../actions/actions.js';
import styles from '../NavBar/NavBar.module.css';

export default function FilterByGenres() {
    const dispatch = useDispatch();
    const allGenres = useSelector((state) => state.genres);

    function handleFilterByGenres(e) {
        dispatch(filterByGenres(e.target.value));
        dispatch(changePage(0));
    };

    return (
        <div className={styles.container}>
            <select className={styles.select} onChange={(e) => {handleFilterByGenres(e)}}>
                <option>Filter by genres:</option>
                <option value='all'>All</option>
                    { allGenres?.map((e) => (
                            <option value={e.name} key={e.id}>{e.name}</option>
                      )) } 
            </select>
        </div>
    );
};