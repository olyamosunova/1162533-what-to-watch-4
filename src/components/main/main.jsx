import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import {ActionCreator} from "../../reducer";
import {connect} from "react-redux";

const SHOWED_MOVIES_COUNT = 8;

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      shownMoviesCount: SHOWED_MOVIES_COUNT,
    };

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeGenre !== this.props.activeGenre) {
      this.setState({
        shownMoviesCount: SHOWED_MOVIES_COUNT,
      });
    }
  }

  _handleShowMoreButtonClick() {
    this.setState((prevState) => ({shownMoviesCount: prevState.shownMoviesCount + SHOWED_MOVIES_COUNT}));
  }

  render() {
    const {indexMovie, onMovieClick, genres, activeGenre, onClick, filteredMovies} = this.props;
    const {title, genre, releaseDate, cover, poster} = indexMovie;
    const {shownMoviesCount} = this.state;

    this._showedMovies = filteredMovies.slice(0, shownMoviesCount);

    const isHideShowMoreButton = shownMoviesCount >= filteredMovies.length ? true : false;

    return (
      <React.Fragment>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src={`img/${cover}`} alt="The Grand Budapest Hotel"/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src={`img/${poster}`} alt={title} width="218" height="327"/>
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{releaseDate}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <GenresList genres={genres} activeGenre={activeGenre} onClick={onClick} />

            <MoviesList
              movies={this._showedMovies}
              onMovieClick={onMovieClick}
            />

            {isHideShowMoreButton ? null : <ShowMoreButton onShowMoreButtonClick={this._handleShowMoreButtonClick} />}

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
  indexMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  }).isRequired,
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
  genres: state.genres,
  filteredMovies: state.filteredMovies,
});

const mapDispatchToProps = (dispatch) => ({
  onClick(activeGenre) {
    dispatch(ActionCreator.changeGenre(activeGenre));
    dispatch(ActionCreator.filteredMovies(activeGenre));
  }
});
export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
