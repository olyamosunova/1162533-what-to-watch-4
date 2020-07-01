import React from "react";
import PropTypes from "prop-types";

const MoviePageReviews = (props) => {
  const {movie} = props;
  const {reviews} = movie;

  const _renderReview = (review) => {
    const {message, rating, author, date} = review;
    return (
      <div className="review">
        <blockquote className="review__quote">
          <p className="review__text">{message}</p>

          <footer className="review__details">
            <cite className="review__author">{author}</cite>
            <time className="review__date" dateTime="2016-12-24">{date}</time>
          </footer>
        </blockquote>

        <div className="review__rating">{rating}</div>
      </div>
    );
  };

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {reviews.map((review) => _renderReview(review))}
      </div>
    </div>
  );
};

MoviePageReviews.propTypes = {
  movie: PropTypes.shape({
    promoMovie: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      releaseDate: PropTypes.number.isRequired,
      poster: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      previewVideo: PropTypes.string.isRequired,
    }),
    rating: PropTypes.number.isRequired,
    ratingLevel: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    runTime: PropTypes.string.isRequired,
    description: PropTypes.array.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.array.isRequired,
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
          message: PropTypes.string.isRequired,
          rating: PropTypes.number.isRequired,
          author: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }))
  }),
};

export default MoviePageReviews;
