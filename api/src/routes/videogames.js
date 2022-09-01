const express = require('express');
const { getPrincipalInfo, getByName } = require('../controllers/controllers.js');
const videogamesRoutes = express.Router();

// Routes used at "/videogames".

// Get the videogames that matches the query.
videogamesRoutes.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        // If there isn't a query I'll just return all the videogames.
        if (!name) {
            const allVideogames = await getPrincipalInfo();
            res.status(200).send(allVideogames);
        } else {
            const videogame = await getByName(name);
            if (videogame.length) {
                res.status(200).send(videogame);
            } else {
                res.status(404).send("Videogame not found");
            };
        };
    } catch (error) {
        res.send(error);
    };
});

module.exports = videogamesRoutes;