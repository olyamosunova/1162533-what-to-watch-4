import {getScore} from "../utils";

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
    backgroundColor: movie.background_color,
    previewImage: movie.preview_image,
    videoLink: movie.video_link,
    rating: movie.rating,
    ratingLevel: getScore(movie.rating),
    ratingCount: movie.scores_count,
    runTime: movie.run_time,
    description: movie.description,
    director: movie.director,
    starring: movie.starring,
  };
};

export const createReview = (review) => {
  return {
    id: review.id,
    message: review.comment,
    rating: review.rating,
    author: review.user.name,
    date: review.date,
  };
};

export const createUser = (userInfo) => {
  return {
    id: userInfo.id,
    email: userInfo.email,
    name: userInfo.name,
    avatarUrl: `https://4.react.pages.academy${userInfo.avatar_url}`,
  };
};
