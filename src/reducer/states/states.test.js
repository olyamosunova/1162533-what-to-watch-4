import {reducer, ActionType} from "./states";
import {GenreNames} from "../../const";
import {movie} from "../../mock/testData";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    activeGenre: GenreNames.ALL,
    activeMovie: -1,
    showedMoviesCount: 8,
    playingMovie: null,
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

it(`Reducer should change genre`, () => {
  expect(reducer({
    activeMovie: -1
  }, {
    type: ActionType.CHANGE_ACTIVE_MOVIE,
    payload: 2,
  })).toEqual({
    activeMovie: 2,
  });
});

it(`Reducer should increment showed movie`, () => {
  expect(reducer({
    showedMoviesCount: 8,
  }, {
    type: ActionType.INCREMENT_SHOWED_MOVIES,
    payload: 16,
  })).toEqual({
    showedMoviesCount: 16,
  });
});

it(`Reducer should increment showed movie`, () => {
  expect(reducer({
    playingMovie: null,
  }, {
    type: ActionType.CHOOSE_MOVIE_TO_WATCH,
    payload: movie,
  })).toEqual({
    playingMovie: movie,
  });
});
