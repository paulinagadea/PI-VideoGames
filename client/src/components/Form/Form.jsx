import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postGame, getGenres, getVideogames, changePage } from "../../actions/actions.js";
import styles from "./Form.module.css";

function validate(input) {
    let errors = {};

    if (!input.name) {
        errors.name = "Name is required!";
    } else if (input.name.length < 3 || /[0-9.+]/.test(input.name)) {
        errors.name = "Invalid name";
    };

    if (!input.rating) {
        errors.rating = "Rating is required!";
    } else if (input.rating <= 0) {
        errors.rating = "Rating must be higher than 0!";
    } else if (input.rating > 5) {
        errors.rating = "Rating must be lower than 5!";
    };

    if (!input.description) {
        errors.description = "Description is required!";
    } else if (input.description.length < 3 || /[0-9.+]/.test(input.description)) {
        errors.description = "Invalid description";
    };

    if (input.genres.length === 0) {
        errors.genres = "Pick at least one genre!";
    };

    if (input.platforms.length === 0) {
        errors.platforms = "Pick at least one platform!";
    };

    return errors;
};

export default function Form() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { genres, allVideogames } = useSelector((state) => state);

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        image: '',
        rating: '',
        released: '',
        description: '',
        genres: [],
        platforms: [],
    });
    
    useEffect(() => {dispatch(getVideogames())}, [dispatch]);
    useEffect(() => {dispatch(getGenres())}, [dispatch]);
    
    function handleChange(e) {
        e.preventDefault();
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
        setErrors(
          validate({
            ...input,
            [e.target.name]: e.target.value,
          })
        );
    };

    function handleSelectForGenres(e) {
        e.preventDefault();
        if (!input.genres.includes(e.target.value)) {
            setInput({
                ...input,
                genres: [...input.genres, e.target.value],
            });
        };
        
        setErrors(
          validate({
            ...input,
            genres: [...input.genres, e.target.value],
          })
        );
    };

    function handleSelectForPlatforms(e) {
        e.preventDefault();
        if (!input.platforms.includes(e.target.value)) {
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value],
            });
        };
        
        setErrors(
          validate({
            ...input,
            platforms: [...input.platforms, e.target.value],
          })
          );
        };

    function handleDeleteForGenres(e) {
        setInput({
            ...input,
            genres: input.genres.filter((g) => g !== e),
        });
    };
    
    function handleDeleteForPlatforms(e) {
        setInput({
            ...input,
            platforms: input.platforms.filter((p) => p !== e),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(errors).length > 0) {
          alert("Please, check the required information!");
        } else {
          dispatch(postGame(input));
          alert("Videogame created successfully!");
          setInput({
            name: '',
            rating: '',
            released: '',
            description: '',
            genres: [],
            platforms: [],
          });
          history.push("/home");
          dispatch(changePage(0));
        }
      };

    const plat = [];
    allVideogames.map(e => e.platforms?.map(e => plat.push(e)));
    let newSet = [...new Set(plat)]

    return (
        // <div className={styles.div}>
            <div className={styles.background}>
            <form className={styles.container} onSubmit={(e) => {handleSubmit(e)}}>
                <h1>Create breed!</h1>

                <div className={styles.details}>      
                    <div className={styles.label}>
                        <label className={styles.text}>Name: </label>
                        <input    
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={(e) => {handleChange(e)}}
                        />
                        {errors.name && <p>{errors.name}</p>}
                    </div>

                    <div className={styles.label}>
                        <label className={styles.text}>Released date: </label>
                        <input
                            type="date"
                            value={input.released}
                            name="released"
                            onChange={(e) => {handleChange(e)}}
                        />
                        {errors.released && <p>{errors.released}</p>}
                    </div>

                    <div className={styles.label}>
                        <label className={styles.text}>Platforms: </label>
                            { <select
                                className={styles.option}
                                name="platforms"
                                onChange={(e) => {handleSelectForPlatforms(e)}}
                            >
                            {newSet.map((e) => (
                                <option name="platforms" value={e} key={e}>{e}</option>
                            ))} 
                            </select> }

                        {errors.platforms && (<p>{errors.platforms}</p>)}
                    </div>

                    <div className={styles.label}>
                        <label className={styles.text}>Description: </label>
                        <input
                            type="text"
                            value={input.description}
                            name="description"
                            onChange={(e) => {handleChange(e)}}
                        />
                        {errors.description && <p>{errors.description}</p>}
                    </div>

                    <div className={styles.label}>
                        <label className={styles.text}>Genres: </label>
                            { <select
                                className={styles.option}
                                name="genres"
                                onChange={(e) => {handleSelectForGenres(e)}}
                            >
                            {genres?.map((e) => (
                                <option name="genres" value={e.name} key={e.id}>{e.name}</option>
                            ))} 
                            </select> }

                        {errors.genres && (<p>{errors.genres}</p>)}
                    </div>

                    <div className={styles.label}>
                        <label className={styles.text}>Rating: </label>
                        <input
                            type="number"
                            value={input.rating}
                            name="rating"
                            onChange={(e) => {handleChange(e)}}
                        />
                        {errors.rating && <p>{errors.rating}</p>}
                    </div>

                    <div className={styles.label}>
                        <label className={styles.text}>Image: </label>
                        <input
                            type="text"
                            value={input.image}
                            name="image"
                            onChange={(e) => {handleChange(e)}}
                        />
                    </div>

                </div>

                <div>
                    <button type="submit">Create</button>
                    <Link to="/home">
                        <button>Home</button>
                    </Link>
                </div>
            </form>

        <div className={styles.selected}>
          <div className={styles.details}>
            { input.genres.map((e) => (
              <div className={styles.button} key={e}>
                <p>{e}</p>
                <button key={e} onClick={() => {handleDeleteForGenres(e)}}>x</button>
              </div>
            ))  }
            </div>
        </div>

        <div className={styles.selected}>
          <div className={styles.details}>
            { input.platforms.map((e) => (
              <div className={styles.button} key={e}>
                <p>{e}</p>
                <button key={e} onClick={() => {handleDeleteForPlatforms(e)}}>x</button>
              </div>
            ))  }
            </div>
        </div>

        </div>
    // </div>
    );
};