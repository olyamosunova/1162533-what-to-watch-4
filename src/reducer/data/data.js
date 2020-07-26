import {extend} from "../../utils";
import {createMovie} from "../../adapters/adapters";

const initialState = {
  movies: [],
  genres: [],
  filteredMovies: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  GET_GENRES: `GET_GENRES`,
  GET_FILTERED_MOVIES: `GET_FILTERED_MOVIES`,
};

const ActionCreatorByData = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  }
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
};


export {reducer, ActionType, ActionCreatorByData, Operations};
