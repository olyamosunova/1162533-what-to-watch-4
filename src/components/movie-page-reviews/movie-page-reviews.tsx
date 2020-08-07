import React from "react";
import PropTypes from "prop-types";
import {formatDateTime, formatReviewDate} from "../../utils";

const MoviePageReviews = (props) => {
  const {reviews} = props;

  const _renderReviews = () => {
    return (
      reviews.map((review) => (
        <div className="review" key={review.id}>
          <blockquote className="review__quote">
            <p className="review__text">{review.message}</p>

            <footer className="review__details">
              <cite className="review__author">{review.author}</cite>
              <time className="review__date" dateTime={formatDateTime(review.date)}>{formatReviewDate(review.date)}</time>
            </footer>
          </blockquote>

          <div className="review__rating">{review.rating}</div>
        </div>
      ))
    );
  };

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {_renderReviews()}
      </div>
    </div>
  );
};

MoviePageReviews.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })),
};

export default MoviePageReviews;
