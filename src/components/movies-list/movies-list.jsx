import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovieCardId: null,
    };
    this._handleMouseEnter = this._handleMouseEnter.bind(this);
  }

  _handleMouseEnter(id) {
    this.setState({activeMovieCardId: id});
  }

  render() {
    const {movies, onMovieClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map(({promoMovie}) => (
          <SmallMovieCard
            key={promoMovie.id}
            promoMovie={promoMovie}
            onMovieClick={onMovieClick}
            onMovieHover={this._handleMouseEnter}
          />
        ))}
      </div>
    );
  }
}

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
        }),
        rating: PropTypes.number.isRequired,
        ratingLevel: PropTypes.string.isRequired,
        ratingCount: PropTypes.number.isRequired,
        description: PropTypes.array.isRequired,
        director: PropTypes.string.isRequired,
        starring: PropTypes.string.isRequired,
      })
  ).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MoviesList;
