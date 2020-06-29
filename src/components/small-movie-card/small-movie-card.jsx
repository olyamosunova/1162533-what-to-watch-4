import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

const SmallMovieCard = (props) => {
  const {promoMovie, onMovieClick, onMovieHover, isPlaying} = props;
  const {id, title, poster, previewVideo} = promoMovie;

  const _onShowPreviewVideo = () => {
    onMovieHover(id);
  };

  const _onClosePreviewVideo = () => {
    onMovieHover();
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={_onShowPreviewVideo}
      onMouseLeave={_onClosePreviewVideo}
      onClick={() => {
        onMovieClick(id);
      }}
    >
      <div className="small-movie-card__image">
        <VideoPlayer
          isPlaying={isPlaying}
          poster={poster}
          previewVideo={previewVideo} />
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
    previewVideo: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  onMovieHover: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default SmallMovieCard;
