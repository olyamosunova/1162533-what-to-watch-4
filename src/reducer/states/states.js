import {extend} from "../../utils";
import {GenreNames} from "../../const";

const SHOWED_MOVIES_MAX = 8;

const initialState = {
  activeGenre: GenreNames.ALL,
  activeMovie: -1,
  showedMoviesCount: SHOWED_MOVIES_MAX,
  playingMovie: null,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_ACTIVE_MOVIE: `CHANGE_ACTIVE_MOVIE`,
  INCREMENT_SHOWED_MOVIES: `INCREMENT_SHOWED_MOVIES`,
  CHOOSE_MOVIE_TO_WATCH: `CHOOSE_MOVIE_TO_WATCH`,
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  changeActiveMovie: (id) => ({
    type: ActionType.CHANGE_ACTIVE_MOVIE,
    payload: id,
  }),
  incrementShownMoviesCount: () => ({
    type: ActionType.INCREMENT_SHOWED_MOVIES,
  }),
  chooseMovieToWatch: (movie) => ({
    type: ActionType.CHOOSE_MOVIE_TO_WATCH,
    payload: movie,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        activeGenre: action.payload,
        showedMoviesCount: SHOWED_MOVIES_MAX,
      });
    case ActionType.CHANGE_ACTIVE_MOVIE:
      return extend(state, {
        activeMovie: action.payload,
      });
    case ActionType.INCREMENT_SHOWED_MOVIES:
      return extend(state, {
        showedMoviesCount: state.showedMoviesCount + SHOWED_MOVIES_MAX,
      });
    case ActionType.CHOOSE_MOVIE_TO_WATCH:
      return extend(state, {
        playingMovie: action.payload
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
