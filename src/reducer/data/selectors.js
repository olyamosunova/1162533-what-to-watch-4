import NameSpace from "../name-space";
import {GenreNames} from "../../const";
import {createSelector} from "reselect";
import {getActiveGenre} from "../states/selectors";

export const getMovies = (state) => state[NameSpace.DATA].movies;

export const getGenres = createSelector(
    getMovies,
    (movies) => {
      return [`All genres`, ...new Set(movies.map(({promoMovie}) => promoMovie.genre))];
    }
);

export const getReviews = (state) => state[NameSpace.DATA].reviews;

export const getMovie = (state) => state[NameSpace.DATA].movies[0];

export const getFilteredMovies = createSelector(
    getMovies,
    getActiveGenre,
    (movies, activeGenre) => {
      if (activeGenre === GenreNames.ALL) {
        return movies;
      }

      const filteredMovies = movies.filter(({promoMovie}) => promoMovie.genre === activeGenre);

      return filteredMovies;
    });
