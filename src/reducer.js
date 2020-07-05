import {extend} from "./utils.js";
import {MoviesList} from "./mock/movies";
import {GenreNames} from "./const";

const initialState = {
  genre: GenreNames.ALL,
  movies: MoviesList,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  FILTERED_MOVIES: `FILTERED_MOVIES`,
};

const ActionCreator = {
  changeGenre: (genre)=>({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),

  filteredFilms: ()=>({
    type: ActionType.FILTERED_MOVIES,
    payload: null
  })
};

const getMoviesByGenre = (genre) => {
  const allMovies = initialState.movies;

  if (genre === GenreNames.ALL) {
    return allMovies;
  }

  const filteredMovies = allMovies.filter(({promoMovie}) => promoMovie.genre === genre);
  return filteredMovies;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload,
      });

    case ActionType.FILTERED_MOVIES:
      const filteredFilms = getMoviesByGenre(state.genre);

      return extend(state, {
        movies: filteredFilms,
      });

    default:
      return state;
  }
};


export {reducer, ActionType, ActionCreator};
