import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNames, changePage } from '../../actions/actions.js';
import styles from './SearchBar.module.css';
import Loader from '../Loader/Loader.jsx';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    // Get the changes from the input and set the local state.
    function handleChange(e) {
        e.preventDefault();
        setName(e.target.value);
    };

    // Get the local state and dispatch the action.
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNames(name));
        dispatch(changePage(0));
        <Loader />
        setName('');
    };

    return (
        <div className={styles.container}>
            <input 
                className={styles.input}
                type="text" 
                placeholder="Videogame name..."
                onChange={e => handleChange(e)}
            />
            <button className={styles.button} type="submit" onClick={e => handleSubmit(e)}>Search!</button> 
        </div>
    );
};