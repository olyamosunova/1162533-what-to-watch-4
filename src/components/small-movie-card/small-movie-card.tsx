import * as React from "react";
import VideoPlayer from "../video-player/video-player";
import {AppRoute} from "../../const";
import {Link} from "react-router-dom";
import {MovieInterface} from "../../types";

interface Props {
  movie: MovieInterface;
  isPlaying: boolean;
  onMouseEnter(): void;
  onMouseLeave(): void;
}

const SmallMovieCard: React.FC<Props> = ({
  movie,
  isPlaying,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
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

export default SmallMovieCard;
