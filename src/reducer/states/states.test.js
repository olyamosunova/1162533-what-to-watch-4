import {reducer, ActionType} from "./states";
import {CurrentPage, GenreNames} from "../../const";
import {movie} from "../../mock/testData";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    activeGenre: GenreNames.ALL,
    activeMovie: -1,
    showedMoviesCount: 8,
    playingMovie: null,
    currentPage: CurrentPage.MAIN,
  });
});

it(`Reducer should change genre`, () => {
  expect(reducer({
    activeGenre: GenreNames.ALL,
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: `Horror`,
  })).toEqual({
    activeGenre: `Horror`,
    showedMoviesCount: 8,
  });
});

it(`Reducer should change active movie`, () => {
  expect(reducer({
    activeMovie: -1
  }, {
    type: ActionType.CHANGE_ACTIVE_MOVIE,
    payload: 2,
  })).toEqual({
    activeMovie: 2,
  });
});

it(`Reducer should showed movies`, () => {
  expect(reducer({
    showedMoviesCount: 8,
  }, {
    type: ActionType.INCREMENT_SHOWED_MOVIES,
    payload: 16,
  })).toEqual({
    showedMoviesCount: 16,
  });
});

it(`Reducer should video movie`, () => {
  expect(reducer({
    playingMovie: null,
  }, {
    type: ActionType.CHOOSE_MOVIE_TO_WATCH,
    payload: movie,
  })).toEqual({
    playingMovie: movie,
  });
});

it(`Reducer should current page`, () => {
  expect(reducer({
    currentPage: CurrentPage.MAIN,
  }, {
    type: ActionType.CHANGE_PAGE,
    payload: CurrentPage.LOGIN,
  })).toEqual({
    currentPage: CurrentPage.LOGIN,
  });
});
