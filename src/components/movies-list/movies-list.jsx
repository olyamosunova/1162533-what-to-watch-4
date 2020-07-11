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

  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  _handleMouseEnter(id) {
    clearTimeout(this._timeout);

    if (id) {
      this._timeout = setTimeout(() => {
        this.setState({
          activeMovieCardId: id,
        });
      }, 1000);

      return;
    }

    this.setState({
      activeMovieCardId: null,
    });
  }
  render() {
    const {movies, onMovieClick} = this.props;
    const {activeMovieCardId} = this.state;

    return (
      <div className="catalog__movies-list">
        {movies.map(({promoMovie}) => (
          <SmallMovieCard
            key={promoMovie.id}
            promoMovie={promoMovie}
            onMovieClick={onMovieClick}
            onMovieHover={this._handleMouseEnter}
            isPlaying={activeMovieCardId === promoMovie.id}
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
          previewVideo: PropTypes.string.isRequired,
        }),
        rating: PropTypes.number.isRequired,
        ratingLevel: PropTypes.string.isRequired,
        ratingCount: PropTypes.number.isRequired,
        runTime: PropTypes.string.isRequired,
        description: PropTypes.array.isRequired,
        director: PropTypes.string.isRequired,
        starring: PropTypes.array.isRequired,
        reviews: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number.isRequired,
              message: PropTypes.string.isRequired,
              rating: PropTypes.number.isRequired,
              author: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
            })
        )
      })
  ).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  activeGenre: PropTypes.string,
};

export default MoviesList;
