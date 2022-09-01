const express = require('express');
const { getById, createVideogame } = require('../controllers/controllers.js');
const videogameRoutes = express.Router();

// Routes used at "/videogame".

// Get the videogame that matches the id.
videogameRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let game = await getById(id);
        if (game) {
            res.status(200).send(game);
        } else {
            res.status(404).send('Videogame not found');
        };
    } catch (error) {
        res.send(error);
    };
});

// Get the results from the form and create a new videogame.
videogameRoutes.post('/', async (req, res) => {
    const { name, image, rating, genres, platforms, description, released } = req.body;
    try {
        const newGame = await createVideogame(name, image, rating, genres, platforms, description, released);
        if (newGame) {
            res.status(200).send(newGame);
        } else {
            res.status(404).send('Could not create a new videogame');
        };
    } catch (error) {
        res.send(error);
    };
});

module.exports = videogameRoutes;