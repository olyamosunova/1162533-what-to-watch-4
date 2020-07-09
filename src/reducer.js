import {MoviesList} from "./mock/movies";
import {extend} from "./utils.js";
import {GenreNames} from "./const";
import {getGenresList} from "./utils";

const initialState = {
  activeGenre: GenreNames.ALL,
  movies: MoviesList,
  genres: getGenresList(MoviesList),
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
  filteredMovies: (genre)=>({
    type: ActionTypes.FILTERED_FILMS,
    payload: getFilteredMovies(genre),
  })
};

const getFilteredMovies = (genre) => {
  const allMovies = initialState.movies;

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
        activeGenre: action.payload
      });
    case ActionTypes.FILTERED_FILMS:
      const filteredMovies = getFilteredMovies(state.activeGenre, initialState.movies);
      return extend(state, {
        movies: filteredMovies
      });
  }
  return state;
};

export {reducer, ActionTypes, ActionCreator, getFilteredMovies};
