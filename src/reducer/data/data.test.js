import {initialState, ActionType, reducer} from './data';
import {Movies, movie, reviews} from "../../mock/testData";

describe(`Data Reducer`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should update MovieCard by load`, () => {
    expect(reducer({
      promoMovieCard: {},
    }, {
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: movie,
    })).toEqual({
      promoMovieCard: movie,
    });
  });

  it(`Reducer should update movies by load`, () => {
    expect(reducer({
      movies: [],
    }, {
      type: ActionType.LOAD_MOVIES,
      payload: Movies,
    })).toEqual({
      movies: Movies,
    });
  });

  it(`Reducer should update reviews by load`, () => {
    expect(reducer({
      reviews: [],
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    })).toEqual({
      reviews,
    });
  });

  it(`Reducer should catch error on load fail`, () => {
    expect(reducer({
      isError: false,
    }, {
      type: ActionType.CATCH_ERROR,
      payload: true,
    })).toEqual({
      isError: true,
    });
  });

  it(`Reducer should check if review is sending`, () => {
    expect(reducer({
      isReviewPosting: false,
    }, {
      type: ActionType.CHECK_REVIEW_POSTING,
      payload: true,
    })).toEqual({
      isReviewPosting: true,
    });
  });

  it(`Reducer should clear sending error`, () => {
    expect(reducer({
      isError: true,
    }, {
      type: ActionType.CLEAR_ERROR,
      payload: false,
    })).toEqual({
      isError: false,
    });
  });

  it(`Reducer should add favorite movies to store`, () => {
    expect(reducer({
      favoriteMovies: [],
    }, {
      type: ActionType.LOAD_FAVORITE_MOVIES,
      payload: Movies,
    })).toEqual({
      favoriteMovies: Movies,
    });
  });

  it(`Reducer should finish loading`, () => {
    expect(reducer({
      isLoading: true,
    }, {
      type: ActionType.FINISH_LOADING,
      payload: false,
    })).toEqual({
      isLoading: false,
    });
  });
});
