import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.js";
import GenresList from "../genres-list/genres-list.js";
import ShowMoreButton from "../show-more-button/show-more-button.js";
import {ActionCreator} from "../../reducer/states/states";
import {connect} from "react-redux";
import {getGenres, getFilteredMovies} from "../../reducer/data/selectors";
import {getActiveGenre, getShowedMoviesCount} from "../../reducer/states/selectors";
import PromoMovie from "../promo-movie/promo-movie.js";

class Main extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {genres, activeGenre, onClick, filteredMovies, showedMoviesCount, onShowMoreButtonClick} = this.props;
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
        description: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        starring: PropTypes.array.isRequired,
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
  },
  onShowMoreButtonClick() {
    dispatch(ActionCreator.incrementShownMoviesCount());
  },
});
export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
