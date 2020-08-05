import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
import {AppRoute} from "../../const";
import {Link} from "react-router-dom";

const SmallMovieCard = (props) => {
  const {isPlaying, onMouseEnter, onMouseLeave, movie} = props;
  const {promoMovie, previewImage} = movie;
  const {id, title, previewVideo} = promoMovie;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        className="small-movie-card__link"
        to={`${AppRoute.MOVIE}/${id}`}>
        <div
          className="small-movie-card__image"
        >
          <VideoPlayer
            isPlaying={isPlaying}
            poster={previewImage}
            previewVideo={previewVideo}/>
        </div>
        <h3
          className="small-movie-card__title"
        >
          {title}
        </h3>
      </Link>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    promoMovie: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      previewVideo: PropTypes.string.isRequired,
    }),
    previewImage: PropTypes.string.isRequired,
  }).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default SmallMovieCard;
