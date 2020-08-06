import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import MoviesList from "../movies-list/movies-list.jsx";
import MoviePageOverview from "../movie-page-overview/movie-page-overview.jsx";
import MoviePageDetails from "../movie-page-details/movie-page-details.jsx";
import MoviePageReviews from "../movie-page-reviews/movie-page-reviews.jsx";
import Header from "../header/header.jsx";
import {TabsName} from "../../const";
import {ActionCreator} from "../../reducer/states/states";
import {getMovies, getReviews} from "../../reducer/data/selectors";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {AuthorizationStatus} from "../../const";
import MyListButton from "../my-list-button/my-list-button.jsx";
import {Operations} from "../../reducer/data/data";
import {getCurrentPage} from "../../reducer/states/selectors";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

const SIMILAR_FILM_COUNT = 4;

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {movie, loadMovie} = this.props;
    loadMovie(movie);
  }

  componentDidUpdate() {
    const {movie, loadMovie} = this.props;
    loadMovie(movie);
  }


  render() {
    const {
      movie,
      movies,
      renderTabs,
      activeTab,
      onPlayClick,
      reviews,
      isSignedIn,
      onMyListClick,
      currentPage,
    } = this.props;

    const {promoMovie, backgroundColor, isFavorite} = movie;
    const {id, title, genre, releaseDate, poster, cover} = promoMovie;

    const addReviewButton = (
      <Link
        to={`${AppRoute.MOVIE}/${id}/review`}
        className="btn movie-card__button">
        Add review
      </Link>
    );

    const getSimilarMovies = (currentGenre, films, currentId) => {
      const similarMovies = films.filter((film) => {
        if (currentId !== film.promoMovie.id && film.promoMovie.genre === currentGenre) {
          return film;
        }
        return null;
      }).slice(0, SIMILAR_FILM_COUNT);
      return similarMovies;
    };


    const _renderTabsInformation = () => {
      switch (activeTab) {
        case TabsName.OVERVIEW:
          return <MoviePageOverview
            movie={movie}
          />;
        case TabsName.DETAILS:
          return <MoviePageDetails
            movie={movie}
          />;
        case TabsName.REVIEWS:
          return <MoviePageReviews reviews={reviews} />;
      }

      return null;
    };

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full" style={{backgroundColor: `${backgroundColor}`}}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={cover} alt={title}/>
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header currentPage={currentPage} />

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{releaseDate}</span>
                </p>

                <div className="movie-card__buttons">
                  <button
                    className="btn btn--play movie-card__button"
                    type="button"
                    onClick={() => {
                      onPlayClick(movie);
                    }}
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <MyListButton id={id} isFavorite={isFavorite} onMyListClick={onMyListClick} />
                  {isSignedIn && addReviewButton}
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img
                  src={poster}
                  alt="The Grand Budapest Hotel poster"
                  width="218"
                  height="327"/>
              </div>

              <div className="movie-card__desc">
                {renderTabs()}
                {_renderTabsInformation()}
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <MoviesList
              movies={getSimilarMovies(genre, movies, movie.promoMovie.id)}
              genre={genre}
            />
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light">
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

MoviePage.propTypes = {
  movie: PropTypes.shape({
    promoMovie: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      releaseDate: PropTypes.number.isRequired,
      poster: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      previewVideo: PropTypes.string.isRequired,
    }),
    backgroundColor: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratingLevel: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    runTime: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.array.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }),
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
        backgroundColor: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        ratingLevel: PropTypes.string.isRequired,
        ratingCount: PropTypes.number.isRequired,
        runTime: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        starring: PropTypes.array.isRequired,
        isFavorite: PropTypes.bool.isRequired,
      })),
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })),
  renderTabs: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  onPlayClick: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  onMyListClick: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired,
  loadMovie: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    movies: getMovies(state),
    reviews: getReviews(state),
    isSignedIn: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
    currentPage: getCurrentPage(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onPlayClick(movie) {
    dispatch(ActionCreator.chooseMovieToWatch(movie));
  },
  onMyListClick(movieId, status, isPromoMovie) {
    dispatch(Operations.changeFlagIsFavorite(movieId, status, isPromoMovie));
  },
  loadMovie(movie) {
    dispatch(Operations.loadReviews(movie.promoMovie.id));
  }
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
