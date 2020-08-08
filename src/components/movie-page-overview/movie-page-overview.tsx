import * as React from "react";
import {MovieInterface} from "../../types";

interface Props {
  movie: MovieInterface,
}

const MoviePageOverview: React.FC<Props> = (props: Props) => {
  const {movie} = props;
  const {rating, ratingLevel, ratingCount, description, director, starring} = movie;

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{ratingLevel}</span>
          <span className="movie-rating__count">{ratingCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        {description}

        <p className="movie-card__director">
          <strong>
            Director:
            {director}
          </strong>
        </p>

        <p className="movie-card__starring">
          <strong>
            Starring:
            {starring.join(`, `)}
          </strong>
        </p>
      </div>
    </React.Fragment>
  );
};

export default MoviePageOverview;
