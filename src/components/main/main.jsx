import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import {ActionCreator} from "../../reducer/states/states";
import {ActionCreatorByData} from "../../reducer/data/data";
import {connect} from "react-redux";
import {getGenres, getFilteredMovies} from "../../reducer/data/selectors";
import {getActiveGenre, getShowedMoviesCount} from "../../reducer/states/selectors";
import PromoMovie from "../promo-movie/promo-movie.jsx";

class Main extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {onMovieClick, genres, activeGenre, onClick, filteredMovies, showedMoviesCount, onShowMoreButtonClick} = this.props;
    const showedMovies = [...filteredMovies].splice(0, showedMoviesCount);

    const isHideShowMoreButton = showedMoviesCount >= filteredMovies.length ? true : false;

    return (
      <React.Fragment>
        <PromoMovie />
        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <GenresList genres={genres} activeGenre={activeGenre} onClick={onClick} />

            <MoviesList
              movies={showedMovies}
              onMovieClick={onMovieClick}
            />

            {isHideShowMoreButton ? null : <ShowMoreButton onShowMoreButtonClick={onShowMoreButtonClick} />}

          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  activeGenre: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  filteredMovies: PropTypes.arrayOf(
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
  showedMoviesCount: PropTypes.number.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeGenre: getActiveGenre(state),
  genres: getGenres(state),
  filteredMovies: getFilteredMovies(state),
  showedMoviesCount: getShowedMoviesCount(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClick(activeGenre) {
    dispatch(ActionCreator.changeGenre(activeGenre));
    dispatch(ActionCreatorByData.filteredMovies(activeGenre));
  },
  onShowMoreButtonClick() {
    dispatch(ActionCreator.incrementShownMoviesCount());
  },
});
export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
