import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from '../../actions/actions.js';
import styles from "./Pagination.module.css";

export default function Pagination(props) {
    const dispatch = useDispatch();
    const { videogames, itemsPerPage } = props;
    const { page } = useSelector((state) => state);

    const pagesAmount = Math.ceil(videogames / itemsPerPage) - 1;

    const pageNumbers = [];

    function handleChangePage(page) {
        dispatch(changePage(page));
    };

    for (let i = 0; i <= pagesAmount; i++) {
        pageNumbers.push(i);
    };

    return (
        <div className={styles.container}>
               
            { pageNumbers?.map((number) => {
                    return (
                        <button
                            style={ page === number ? {
                                backgroundColor: '#990099',
                                color: '#ff6600',
                            } 
                            : null } 
                            key={number}
                            onClick={() => handleChangePage(number)}>{number + 1}</button>
                    );
              }) }
            
        </div>
    );
};