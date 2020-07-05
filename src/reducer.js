import {extend} from "./utils.js";
import {MoviesList} from "./mock/movies";
import {GenreNames} from "./const";

const initialState = {
  genre: GenreNames.ALL,
  movies: MoviesList,
};

const ActionType = {
  CHANGE_FILTER: `CHANGE_FILTER`,
  GET_MOVIES: `GET_MOVIES`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_FILTER:
      return extend(state, {
        genre: action.payload,
      });

    case ActionType.GET_MOVIES:
      return extend(state, {
        movies: action.payload,
      });

    default:
      return state;
  }
};


export {reducer, ActionType};
