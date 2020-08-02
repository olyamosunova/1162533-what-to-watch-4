import {extend} from "../../utils";
import {createMovie, createReview} from "../../adapters/adapters";
import {ActionCreator} from "../states/states";
import {CurrentPage} from "../../const";

const initialState = {
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
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  GET_GENRES: `GET_GENRES`,
  GET_FILTERED_MOVIES: `GET_FILTERED_MOVIES`,
  CHECK_REVIEW_POSTING: `CHECK_REVIEW_POSTING`,
};

const ActionCreatorByData = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  },
  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
  },
  loadPromoMovieCard: (promoMovieCard) => {
    return {
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: promoMovieCard,
    };
  },
  checkReviewPosting: (isReviewPosting) => ({
    type: ActionType.CHECK_REVIEW_POSTING,
    payload: isReviewPosting,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
      });
    case ActionType.GET_GENRES:
      return extend(state, {
        genres: action.payload,
      });
    case ActionType.GET_FILTERED_MOVIES:
      return extend(state, {
        filteredMovies: action.payload,
      });
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        promoMovieCard: action.payload,
      });
    case ActionType.CHECK_REVIEW_POSTING:
      return extend(state, {
        isReviewPosting: action.payload,
      });
  }

  return state;
};

const Operations = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreatorByData.loadMovies(response.data.map((movie) => createMovie(movie))));
      });
  },
  loadReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreatorByData.loadReviews(response.data.map((review) => createReview(review))));
      });
  },
  loadPromoMovieCard: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreatorByData.loadPromoMovieCard(createMovie(response.data)));
      });
  },
  postReview: (movieId, review) => (dispatch, getState, api) => {
    dispatch(ActionCreatorByData.checkReviewPosting(true));
    return api.post(`/comments/${movieId}`, {
      rating: review.rating,
      comment: review.comment,
    })
      .then(() => {
        dispatch(ActionCreatorByData.checkReviewPosting(false));
      })
      .then(() => {
        dispatch(Operations.loadReviews(movieId));
        dispatch(ActionCreator.changePage(CurrentPage.DETAIL));
      })
      .catch(() => {
        dispatch(ActionCreatorByData.checkReviewPosting(false));
      });
  },
};


export {reducer, ActionType, ActionCreatorByData, Operations};
