import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {movieInformation, onMovieTitleClick, onMovieHover} = props;
  const {id, title, poster} = movieInformation;

  function _onMovieClickHandler() {
    onMovieTitleClick(`movie`);
  }

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => {
        onMovieHover(id);
      }}
    >
      <div
        className="small-movie-card__image"
        onClick={_onMovieClickHandler}
      >
        <img src={`img/${poster}`} alt={title}
          width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a
          onClick={_onMovieClickHandler}
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
  movieInformation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  onMovieHover: PropTypes.func.isRequired,
};

export default SmallMovieCard;
