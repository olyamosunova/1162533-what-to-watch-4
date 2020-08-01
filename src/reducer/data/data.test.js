import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api/api";
import {reducer, ActionType, Operations} from "./data";
import {createMovie} from "../../adapters/adapters";
import {movie, Movies, reviews} from "../../mock/testData";

const api = createAPI(() => {});

const promoMovieCard = movie;
const movies = Movies;

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    movies: [],
    genres: [],
    filteredMovies: [],
    reviews: [],
    promoMovieCard: {
      promoMovie: {
        id: 0,
        title: `Loading`,
        poster: ``,
        cover: ``,
        genre: ``,
        releaseDate: 0,
        previewVideo: ``,
      },
      videoLink: ``,
      rating: 0,
      ratingLevel: ``,
      ratingCount: 0,
      runTime: ``,
      description: ``,
      director: ``,
      starring: [],
    },
    isReviewPosting: false,
  });
});

it(`Reducer should update movies by load movies`, () => {
  expect(reducer({
    movies: [],
  }, {
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  })).toEqual({
    movies,
  });
});

it(`Reducer should update promoMovieCard by load promoMovieCard`, () => {
  expect(reducer({
    promoMovieCard: {
      promoMovie: {
        id: 0,
        title: `Loading`,
        poster: ``,
        cover: ``,
        genre: ``,
        releaseDate: 0,
        previewVideo: ``,
      },
      videoLink: ``,
      rating: 0,
      ratingLevel: ``,
      ratingCount: 0,
      runTime: ``,
      description: ``,
      director: ``,
      starring: [],
    },
  }, {
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: promoMovieCard,
  })).toEqual({
    promoMovieCard,
  });
});

it(`Reducer should update reviews by load reviews`, () => {
  expect(reducer({
    reviews: [],
  }, {
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  })).toEqual({
    reviews,
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoMovieCardLoader = Operations.loadPromoMovieCard();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return promoMovieCardLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_MOVIE,
          payload: createMovie({fake: true}),
        });
      });
  });

  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operations.loadMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIES,
          payload: [createMovie({fake: true})],
        });
      });
  });
});
