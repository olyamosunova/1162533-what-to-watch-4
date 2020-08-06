import {extend} from "../../utils";
import {createMovie, createReview} from "../../adapters/adapters";
import history from "../../history";

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
  isReviewPostingError: false,
  favoriteMovies: [],
  isLoading: true,
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  GET_GENRES: `GET_GENRES`,
  GET_FILTERED_MOVIES: `GET_FILTERED_MOVIES`,
  CHECK_REVIEW_POSTING: `CHECK_REVIEW_POSTING`,
  CHECK_REVIEW_POSTING_ERROR: `CHECK_REVIEW_POSTING_ERROR`,
  UPDATE_MOVIE: `UPDATE_MOVIE`,
  LOAD_FAVORITE_MOVIES: `LOAD_FAVORITE_MOVIES`,
  FINISH_LOADING: `FINISH_LOADING`,
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
  checkReviewPostingError: (isReviewPostingError) => ({
    type: ActionType.CHECK_REVIEW_POSTING,
    payload: isReviewPostingError,
  }),
  updateMovie: (movie) => ({
    type: ActionType.UPDATE_MOVIE,
    payload: movie
  }),
  loadFavoriteMovies: (movies) => ({
    type: ActionType.LOAD_FAVORITE_MOVIES,
    payload: movies
  }),
  finishLoading: () => ({
    type: ActionType.FINISH_LOADING,
    payload: false,
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
    case ActionType.CHECK_REVIEW_POSTING_ERROR:
      return extend(state, {
        isReviewPostingError: action.payload,
      });
    case ActionType.UPDATE_MOVIE:
      const newMovie = action.payload;
      const allMovies = state.movies;

      const movies = allMovies.map((movie) => {
        if (movie.promoMovie.id === newMovie.promoMovie.id) {
          movie = Object.assign({}, movie, {isFavorite: !movie.isFavorite});
        }
        return movie;
      });
      return extend(state, {
        movies
      });
    case ActionType.LOAD_FAVORITE_MOVIES:
      return extend(state, {
        favoriteMovies: action.payload
      });
    case ActionType.FINISH_LOADING:
      return extend(state, {
        isLoading: action.payload,
      });
  }

  return state;
};

const Operations = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreatorByData.loadMovies(response.data.map((movie) => createMovie(movie))));
        dispatch(ActionCreatorByData.finishLoading());
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
        dispatch(ActionCreatorByData.checkReviewPostingError(false));
      })
      .then(() => {
        dispatch(Operations.loadReviews(movieId));
        history.goBack();
      })
      .catch(() => {
        dispatch(ActionCreatorByData.checkReviewPosting(false));
        dispatch(ActionCreatorByData.checkReviewPostingError(true));
      });
  },
  changeFlagIsFavorite: (movieId, status, isPromoMovie) => (dispatch, getState, api) => {
    return api.post(`/favorite/${movieId}/${status}`)
        .then((response) => {
          const movie = createMovie(response.data);

          if (isPromoMovie) {
            dispatch(ActionCreatorByData.loadPromoMovieCard(movie));
          } else {
            dispatch(ActionCreatorByData.updateMovie(movie));
          }
        });
  },
  loadFavoriteMovies: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
        .then((response) => {
          if (response.data) {
            const favoriteMovies = response.data.map((favoriteMovie) => createMovie(favoriteMovie));
            dispatch(ActionCreatorByData.loadFavoriteMovies(favoriteMovies));
          }
        });
  },
};


export {reducer, ActionType, ActionCreatorByData, Operations};
