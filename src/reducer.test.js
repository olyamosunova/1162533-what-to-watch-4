import {reducer, ActionCreator, ActionTypes} from "./reducer.js";
import {GenreNames} from "./const";
import {Movies} from "./mock/testData";
import {getGenresList} from "./utils";

it(`Returns initial state at application start`, ()=>{
  expect(reducer(undefined, {})).toEqual({
    activeGenre: GenreNames.ALL,
    movies: Movies,
    genres: getGenresList(Movies),
    filteredMovies: Movies,
    activeMovie: -1,
    showedMoviesCount: 8,
    playingMovie: null,
  });
});

it(`Change genre`, ()=>{
  expect(reducer({
    activeGenre: GenreNames.ALL,
    movies: Movies,
    genres: getGenresList(Movies),
    filteredMovies: Movies,
    activeMovie: -1,
    showedMoviesCount: 8,
    playingMovie: null,
  }, {
    type: ActionTypes.CHANGE_GENRE,
    payload: GenreNames.DRAMAS,
  })).toEqual({
    activeGenre: GenreNames.DRAMAS,
    movies: Movies,
    genres: getGenresList(Movies),
    filteredMovies: Movies,
    activeMovie: -1,
    showedMoviesCount: 8,
    playingMovie: null,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creators change genre`, () => {
    expect(ActionCreator.changeGenre(GenreNames.COMEDIES)).toEqual({
      type: ActionTypes.CHANGE_GENRE,
      payload: GenreNames.COMEDIES,
    });
  });
});
