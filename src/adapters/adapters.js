export const createMovie = (movie) => {
  return {
    promoMovie: {
      id: movie.id,
      title: movie.name,
      poster: movie.poster_image,
      cover: movie.background_image,
      genre: movie.genre,
      releaseDate: movie.released,
      previewVideo: movie.preview_video_link,
    },
    videoLink: movie.video_link,
    rating: movie.rating,
    ratingLevel: `Very good`,
    ratingCount: movie.scores_count,
    runTime: movie.run_time,
    description: movie.description,
    director: movie.director,
    starring: movie.starring,
  };
};
