const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

const getPrincipalInfo = async () => {
    // Get all the info from the external API and my database.
    try {
        let apiInfo = [];
        for (let i = 1; i < 6; i++) {
            let api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${[i]}`);
            apiInfo = apiInfo.concat(api.data.results);
        };
        
        let info = [];
        for (const game of apiInfo) {
            info.push({
                name: game.name,
                id: game.id,
                image: game.background_image,
                rating: game.rating,
                genres: game.genres?.map(e => e.name),
                platforms: game.platforms.map(e => e.platform.name),
            });
        };

        // Get the videogames from my database including their genres.
        let dbVideogames = await Videogame.findAll({
            include: Genre
        });

        dbVideogames = dbVideogames.map((v) => {
            return {
                name: v.name,
                id: v.id,
                image: v.image,
                rating: v.rating,
                genres: v.genres.map(e => e.name),
                platforms: v.platforms,
                created_in_db: v.created_in_db,
            }
        })

        // Return the created videogames in the database.
        // If there's nothing created in the database, return the videogames from the external API.
        if (dbVideogames) {
            let allVideogames = dbVideogames.concat(info);
            return allVideogames;
        } else {
            return info;
        };
    } catch (error) {
        console.error(error);
    };
};

// Get a videogame by it's name from the database or the external API.
const getByName = async (name) => {
    try {
        // Get the videogames, filter by their names.
        const allVideogames = await getPrincipalInfo();
        if (name) {
            const gameName = allVideogames.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            return gameName;
        };
    } catch (error) {
        console.error(error);
    };
};

// Get a videogame by it's id from the database or the external API.
const getById = async (id) => {
    try {
        if (id.length > 10) {
            // Get the videogame from my database including their genres.
            const dbVideogame = await Videogame.findByPk(id, {
                include: Genre,
            });
            return dbVideogame;
        } else {
            let array = [];
            const videogame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            array = array.concat(videogame.data);

            let result = [];
            for (const game of array) {
                result.push({
                    name: game.name,
                    id: game.id,
                    image: game.background_image,
                    rating: game.rating,
                    genres: game.genres?.map(e => e.name),
                    description: game.description_raw,
                    released: game.released,
                    platforms: game.platforms.map(e => e.platform.name),
                });
            };
            return result;
        };
    } catch (error) {
        console.error(error);
    };
};

// Get the results from the form and create a new videogame.
const createVideogame = async (name, image, rating, genres, platforms, description, released) => {
    try {
        // Create and save the new videogame.
        const gameCreated = await Videogame.create({
            name,
            id: uuidv4(),
            rating,
            platforms,
            image,
            description,
            released,
        });

        // Search the genres in the database and add them to the new videogame.
       
        await getGenres();

        let genresDb = await Genre.findAll({
            where: {
                name: genres,
            }
        });
       
        gameCreated.addGenres(genresDb);
        return gameCreated;
    } catch (error) {
        console.error(error);
    };
};

// Get all the genres from the external API and save them in the database.
const getGenres = async () => {
    try {
        const api = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const genres = api.data.results;
        genres.map(e => Genre.findOrCreate({
            where: {
                name: e.name,
            }
        }));
        
        // Return the genres.
        const genresDb = await Genre.findAll();
        return genresDb;
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    getPrincipalInfo,
    getByName,
    getById,
    createVideogame,
    getGenres,
};