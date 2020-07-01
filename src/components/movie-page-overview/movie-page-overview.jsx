import React from "react";
import PropTypes from "prop-types";

const MoviePageOverview = (props) => {
  const {movie} = props;
  const {rating, ratingLevel, ratingCount, description, director, starring} = movie;

  return (
    <React.Component>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{ratingLevel}</span>
          <span className="movie-rating__count">{ratingCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        {description.map((text, i) => (
          <p key={i}>{text}</p>
        ))}

        <p className="movie-card__director">
          <strong>
            Director:
            {director}
          </strong>
        </p>

        <p className="movie-card__starring">
          <strong>
            Starring:
            {starring.length > 4 ? starring.slice(0, 4).map((star) => star) + `and other` : starring.map((star) => star)}
          </strong>
        </p>
      </div>
    </React.Component>
  );
};

MoviePageOverview.propTypes = {
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
  }),
};

export default MoviePageOverview;
