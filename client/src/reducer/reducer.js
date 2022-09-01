const initalState = {
    // Fixed state.
    allVideogames: [],

    // Used for changes of the state allVideogames.
    videogames: [],
    genres: [],
    details: [],
    order: [],
    page: 0,
};

function rootReducer(state = initalState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            };
            
        case 'GET_NAMES':
            return {
                ...state,
                videogames: action.payload
            };

        case 'GET_DETAILS':
            return {
                ...state,
                details: action.payload
            };

        case 'POST_GAME':
            return {
                ...state,
            };

        case 'DETAIL_EMPTY': 
            return {
                ...state,
                details: []
            };

        case 'CLEAR_FILTERS':
            return {
                ...state,
                videogames: state.allVideogames
            };
        
        case 'CHANGE_PAGE': 
            return {
                ...state,
                page: action.payload
            };

        case 'SET_ORDER': 
            return {
                ...state,
                order: action.payload
            };

        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            };

        case 'EXISTENT_OR_CREATED':
            const videogames = state.allVideogames;
            const filteredGames = action.payload === 'all' ? videogames
            : action.payload === 'api'? videogames.filter(e => !e.created_in_db) : videogames.filter(e => e.created_in_db);
    
            return {
                ...state,
                videogames: filteredGames
            };

        case 'FILTER_BY_GENRES':
            const allGames = state.allVideogames;
            const filtered = action.payload === 'all' ? allGames 
            : allGames.filter(e => { 
                if (e.genres) {
                    return e.genres.includes(action.payload);
                };
                return true;
            });
            
            return {
                ...state,
                videogames: filtered
            };

        case 'ORDER_ALPH':
            const allNames = state.allVideogames;
            const orderedNames = 
            action.payload === 'az'? allNames.sort(function(a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                } else {
                    return 0;
                };
            })
            : action.payload === 'za'? allNames.sort(function(a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1;
                } else {
                    return 0;
                };
            })
            : allNames
            
            return {
                ...state,
                videogames: orderedNames
            };

        case 'ORDER_BY_RATING':
            const allRatings = state.allVideogames;
            const orderedRatings = 
            action.payload === 'asc' ? allRatings.sort(function(a, b) {
                    if (a.rating > b.rating) return 1;
                    if (a.rating < b.rating) return -1;
                    return 0;
                })
            : action.payload === 'desc' ? allRatings.sort(function(a, b) {
                    if (a.rating > b.rating) return -1;
                    if (a.rating < b.rating) return 1;
                    return 0;
                })
            : allRatings
    
            return {
                ...state,
                videogames: orderedRatings
            };

        default:
            return state;
    };
};

export default rootReducer;
