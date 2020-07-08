export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getGenresList = (movies) => {
  return [`All genres`, ...new Set(movies.map(({promoMovie}) => promoMovie.genre))];
};
