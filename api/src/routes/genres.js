const express = require('express');
const { getGenres } = require('../controllers/controllers.js');
const genresRoutes = express.Router();

// Routes used at "/genres".

// Get all the genres from my database.
genresRoutes.get('/', async (req, res) => {
    try {
        const genres = await getGenres();
        if (genres) {
            res.status(200).send(genres);
        } else {
            res.status(404).send('Genres not found');
        };
    } catch (error) {
        res.send(error);
    };
});

module.exports = genresRoutes;