import {MoviesList} from "./mock/movies";
import {extend} from "./utils.js";
import {GenreNames} from "./const";
import {getGenresList} from "./utils";

const SHOWED_MOVIES_MAX = 8;

const initialState = {
  activeGenre: GenreNames.ALL,
  movies: MoviesList,
  genres: getGenresList(MoviesList),
  filteredMovies: MoviesList,
  activeMovie: -1,
  showedMoviesCount: SHOWED_MOVIES_MAX,
};

const ActionTypes = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  FILTERED_FILMS: `FILTERED_FILMS`,
  CHANGE_ACTIVE_MOVIE: `CHANGE_ACTIVE_MOVIE`,
  INCREMENT_SHOWED_MOVIES: `INCREMENT_SHOWED_MOVIES`,
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
  changeActiveMovie: (id) => ({
    type: ActionTypes.CHANGE_ACTIVE_MOVIE,
    payload: id,
  }),
  incrementShownMoviesCount: () => ({
    type: ActionTypes.INCREMENT_SHOWED_MOVIES,
  }),
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
        showedMoviesCount: SHOWED_MOVIES_MAX,
      });
    case ActionTypes.FILTERED_FILMS:
      return extend(state, {
        filteredMovies: action.payload,
      });
    case ActionTypes.CHANGE_ACTIVE_MOVIE:
      return extend(state, {
        activeMovie: action.payload,
      });
    case ActionTypes.INCREMENT_SHOWED_MOVIES:
      return extend(state, {
        showedMoviesCount: state.showedMoviesCount + SHOWED_MOVIES_MAX,
      });
  }
  return state;
};

export {reducer, ActionTypes, ActionCreator, getFilteredMovies};
