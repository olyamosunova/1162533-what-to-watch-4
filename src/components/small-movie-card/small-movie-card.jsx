import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {promoMovie, onMovieClick, onMovieHover} = props;
  const {id, title, poster} = promoMovie;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => {
        onMovieHover(id);
      }}
    >
      <div
        className="small-movie-card__image"
        onClick={() => {
          onMovieClick(id);
        }}
      >
        <img src={`img/${poster}`} alt={title}
          width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a
          onClick={() => {
            onMovieClick(id);
          }}
          className="small-movie-card__link"
          href="movie-page.html"
        >
          {title}
        </a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  promoMovie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  onMovieHover: PropTypes.func.isRequired,
};

export default SmallMovieCard;
