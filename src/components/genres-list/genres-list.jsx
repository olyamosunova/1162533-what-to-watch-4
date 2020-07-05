import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "./../../reducer.js";

class GenresList extends PureComponent {
  constructor(props) {
    super(props);

    this.allMovies = this.props.movies;

    this._getGenresList = this._getGenresList.bind(this);
  }

  _getGenresList() {
    const genres = new Set();
    genres.add(`All genres`);
    this.allMovies.forEach((movie) => {
      genres.add(movie.promoMovie.genre);
    });
    const genresList = Array.from(genres);
    return genresList;
  }

  render() {
    const {activeGenre, onClick} = this.props;
    const genresList = this._getGenresList();

    return <ul className="catalog__genres-list">
      {genresList.map((item) => {
        return <li
          key={item}
          className={`catalog__genres-item ${activeGenre === item ? `catalog__genres-item--active` : ``}`}
          onClick={()=>{
            onClick(item);
          }}
        >
          <a href="#" className="catalog__genres-link">{item}</a>
        </li>;
      })}
    </ul>;
  }
}

GenresList.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
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
};

const mapStateToProps = (state) => ({
  activeGenre: state.activeGenre,
  movies: state.movies,
});

const mapDispatchToProps = (dispatch) => ({
  onClick(activeGenre) {
    dispatch(ActionCreator.changeGenre(activeGenre));
    dispatch(ActionCreator.filteredMovies(activeGenre));
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
