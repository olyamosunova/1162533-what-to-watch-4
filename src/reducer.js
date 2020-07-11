import {MoviesList} from "./mock/movies";
import {extend} from "./utils.js";
import {GenreNames} from "./const";
import {getGenresList} from "./utils";

const initialState = {
  activeGenre: GenreNames.ALL,
  movies: MoviesList,
  genres: getGenresList(MoviesList),
  filteredMovies: MoviesList,
};

const ActionTypes = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  FILTERED_FILMS: `FILTERED_FILMS`,
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionTypes.CHANGE_GENRE,
    payload: genre,
  }),
  filteredMovies: (genre) => {
    const filteredMovies = getFilteredMovies(MoviesList, genre);

    return {
      type: ActionTypes.FILTERED_FILMS,
      payload: filteredMovies,
    };
  },
};

const getFilteredMovies = (movies, genre) => {
  const allMovies = movies;

  if (genre === GenreNames.ALL) {
    return allMovies;
  }

  const filteredMovies = allMovies.filter(({promoMovie}) => promoMovie.genre === genre);

  return filteredMovies;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_GENRE:
      return extend(state, {
        activeGenre: action.payload,
      });
    case ActionTypes.FILTERED_FILMS:
      return extend(state, {
        filteredMovies: action.payload,
      });
  }
  return state;
};

export {reducer, ActionTypes, ActionCreator, getFilteredMovies};
