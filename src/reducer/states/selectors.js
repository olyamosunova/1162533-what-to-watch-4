import NameSpace from "../name-space";

export const getActiveMovie = (state) => state[NameSpace.STATES].activeMovie;

export const getPlayingMovie = (state) => state[NameSpace.STATES].playingMovie;

export const getActiveGenre = (state) => state[NameSpace.STATES].activeGenre;

export const getShowedMoviesCount = (state) => state[NameSpace.STATES].showedMoviesCount;

export const getCurrentPage = (state) => state[NameSpace.STATES].currentPage;
