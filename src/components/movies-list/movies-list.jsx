import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovieCardId: null,
    };
    this._handleMouseOver = this._handleMouseOver.bind(this);
  }

  _handleMouseOver(id) {
    this.setState({activeMovieCardId: id});
  }

  render() {
    const {movies, onMovieTitleClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie) => (
          <SmallMovieCard
            key={movie.id}
            movieInformation={movie}
            onMovieTitleClick={onMovieTitleClick}
            onMovieHover={this._handleMouseOver}
          />
        ))};
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      })
  ).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
