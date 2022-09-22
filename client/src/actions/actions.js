import axios from 'axios';

export function getVideogames() {
    return function(dispatch) {
        return axios.get('https://the-last-game.herokuapp.com/videogames')
        .then(res => {
            dispatch({
                type: 'GET_VIDEOGAMES',
                payload: res.data
            });
        });
    };
};

export function getGenres() {
    return function(dispatch) {
        return axios.get('https://the-last-game.herokuapp.com/genres')
        .then(res => {
            dispatch({
                type: 'GET_GENRES',
                payload: res.data
            });
        });
    };
};

export function getNames(payload) {
    return function(dispatch) {
        return axios.get('https://the-last-game.herokuapp.com/videogames?genre=' + payload)
        .then(res => {
            dispatch({
                type: 'GET_NAMES',
                payload: res.data
            });
        }).catch(() => {
            alert('Videogame not found');
        });
    };
};

export function getDetails(id) {
    return function (dispatch) {
        return axios.get('https://the-last-game.herokuapp.com/videogame/' + id)
        .then(res => {
            return dispatch({
                type: 'GET_DETAILS',
                payload: res.data,
            });
        }).catch(() => {
            alert('Videogame not found');
        });
    };
};

export function postGame(payload) {
    return function () {
      return axios.post('https://the-last-game.herokuapp.com/videogame', payload);
    };
};

export function changePage(payload) {
    return function (dispatch) {
        dispatch({ 
            type: 'CHANGE_PAGE', 
            payload: payload 
        });
    };
};

export function setOrder(payload) {
    return function (dispatch) {
        dispatch({ 
            type: 'SET_ORDER', 
            payload: payload 
        });
    };
};

export function existentOrCreated(payload) {
    return {
      type: "EXISTENT_OR_CREATED",
      payload,
    };
};

export function filterByGenres(payload) {
    return {
      type: "FILTER_BY_GENRES",
      payload,
    };
};

export function orderByRating(payload) {
    return {
      type: "ORDER_BY_RATING",
      payload,
    };
};
  
export function orderAlph(payload) {
    return {
      type: "ORDER_ALPH",
      payload,
    };
};

export function detailEmpty() {
    return {
        type: 'DETAIL_EMPTY'
    };
};

export function clearFilters() {
    return {
        type: 'CLEAR_FILTERS'
    };
};
