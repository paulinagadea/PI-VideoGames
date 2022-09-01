import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, detailEmpty } from '../../actions/actions.js';
import Loader from '../Loader/Loader.jsx';
import styles from './Details.module.css';

export default function Details() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const game = useSelector((state) => state.details);

    useEffect(() => {
        dispatch(getDetails(id));
        return () => {
            dispatch(detailEmpty());
        };
    }, [dispatch, id]);

    return game.length > 0 || game.name ? (
        <div className={styles.background}>

            <div className={styles.container}>
            { game.name ? 
                <div className={styles.card}>
                    { game.image ? <img src={game.image} alt='img not found' />
                      : <img  
                            src={"https://i.pinimg.com/originals/b3/15/42/b315423aa792b2a609dac123e6b2e371.jpg"} 
                            alt='img not found' /> }

                    <h1>{game.name}</h1>
                    <h2>Genres: {game.genres?.map(g => g.name).join(', ')}.</h2>
                    <h4>{game.description}</h4>
                    <h3>Release date: {game.released}</h3>
                    <h4>Platforms: {game.platforms?.join(', ')}.</h4>
                    <h4>Rating: {game.rating}</h4>
                </div>

              : game.length > 0 ?
                <div className={styles.card}>
                    { game[0].image ? <img src={game[0].image} alt='img not found' />
                      : <img  
                            src={"https://i.pinimg.com/originals/b3/15/42/b315423aa792b2a609dac123e6b2e371.jpg"} 
                            alt='img not found' /> }

                    <h1>{game[0].name}</h1>
                    <h2>Genres: {game[0].genres?.join(', ')}.</h2>
                    <h4>{game[0].description}</h4>
                    <h3>Release date: {game[0].released}</h3>
                    <h4>Platforms: {game[0].platforms?.join(', ')}.</h4>
                    <h4>Rating: {game[0].rating}</h4>
                </div>
              : <Loader />
            }
            </div>

            <div>
                <Link to='/home'>
                    <button>Go back!</button>
                </Link>
            </div>

        </div>
    ) : (
        <Loader />
    );
};