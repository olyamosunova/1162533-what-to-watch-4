import {MoviesList} from "./mock/movies";
import {extend} from "./utils.js";
import {GenreNames} from "./const";

const initialState = {
  activeGenre: GenreNames.ALL,
  films: MoviesList,
};

const ActionTypes = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  FILTERED_FILMS: `FILTERED_FILMS`,
};

const ActionCreator = {
  changeGenre: (genre)=>({
    type: ActionTypes.CHANGE_GENRE,
    payload: genre,
  }),
  filteredFilms: (genre)=>({
    type: ActionTypes.FILTERED_FILMS,
    payload: getFilteredFilms(genre),
  })
};

const getFilteredFilms = (genre) => {
  const allFilms = initialState.films;

  if (genre === GenreNames.ALL) {
    return allFilms;
  }

  const filteredFilms = allFilms.filter(({promoMovie}) => promoMovie.genre === genre);

  return filteredFilms;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload
      });
    case ActionTypes.FILTERED_FILMS:
      const filteredFilms = getFilteredFilms(state.genre, initialState.films);
      return extend(state, {
        films: filteredFilms
      });
  }
  return state;
};

export {reducer, ActionTypes, ActionCreator, getFilteredFilms};
