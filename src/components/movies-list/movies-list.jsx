import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import withPlayingCard from "../../hocs/with-playing-card/with-playing-card.jsx";

const SmallMovieCardWrapped = withPlayingCard(SmallMovieCard);

const MoviesList = (props) => {
  const {movies, onMovieClick} = props;

  return (
    <div className="catalog__movies-list">
      {movies.map(({promoMovie}) => (
        <SmallMovieCardWrapped
          key={promoMovie.id}
          promoMovie={promoMovie}
          onMovieClick={onMovieClick}
        />
      ))}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
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
        runTime: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        starring: PropTypes.array.isRequired,
      })
  ).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MoviesList;
