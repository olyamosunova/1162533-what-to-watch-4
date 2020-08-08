import * as React from "react";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import withPlayingCard from "../../hocs/with-playing-card/with-playing-card";
const SmallMovieCardWrapped = withPlayingCard(SmallMovieCard);
import {MovieInterface} from "../../types";

interface Props {
  movies: Array<MovieInterface>,
}

const MoviesList: React.FC<Props> = ({
  movies
}: Props) => {
  return (
    <div className="catalog__movies-list">
      {movies.map((movie) => (
        <SmallMovieCardWrapped
          key={movie.promoMovie.id}
          movie={movie}
        />
      ))}
    </div>
  );
};

export default MoviesList;
