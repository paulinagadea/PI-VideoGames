import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames, changePage, setOrder } from '../../actions/actions.js';
import Cards from "../Cards/Cards.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import Loader from "../Loader/Loader.jsx";
import styles from "./Home.module.css";

export default function Home() {
    const dispatch = useDispatch();
    const { videogames, page } = useSelector((state) => state);

    const itemsPerPage = 15;
    const offset = page * itemsPerPage;
    const limit = offset + itemsPerPage;
    const currentGames = videogames.slice(offset, limit);

    useEffect(() => {
            dispatch(getGenres());
            dispatch(getVideogames());
            dispatch(setOrder());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
        dispatch(changePage(0));
    };

    // return currentGames.length ? (
        // <Loader />
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.bar}>
                    <div className={styles.title}>
                        <Link to='/'>
                            <p className={styles.glitch}>         
                                <span aria-hidden='true'>THE LAST GAME</span>THE LAST GAME<span aria-hidden='true'>THE LAST GAME</span>       
                            </p>
                        </Link>
                    </div>

                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={e => {handleClick(e)}}><span></span><span></span><span></span><span></span>Reload!</button>
                        
                        <Link to='/create'>
                            <button className={styles.button}><span></span><span></span><span></span><span></span>Create!</button>
                        </Link>

                        <SearchBar />
                    </div>
                </div>

                <div className={styles.filters}>
                    <NavBar />
                </div>

                <div className={styles.cards}>
                    { currentGames?.map(e => {
                        return (
                            <Link to={`/videogame/${e.id}`} key={e.id}>
                                <Cards key={e.id} 
                                    image={e.image === "" ? "https://i.pinimg.com/originals/b3/15/42/b315423aa792b2a609dac123e6b2e371.jpg"
                                    : e.image} 
                                    name={e.name} 
                                    rating={e.rating} 
                                    genres={ e.genres.join(', ') } />
                            </Link>
                        );
                    }) }
                </div>

                <div className={styles.pags}>
                    <Pagination page={page} videogames={videogames.length} itemsPerPage={itemsPerPage} />
                </div>
            </div>
        </div>
    // ) : (
    //     <Loader />
     );
};
