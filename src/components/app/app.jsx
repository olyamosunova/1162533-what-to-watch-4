import React from "react";
import {Route, Switch, Router} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import withTabs from "../../hocs/with-tabs.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/states/states";
import {Operations} from "../../reducer/data/data";
import BigVideoPlayer from "../big-video-player/big-video-player.jsx";
import withPlayer from "../../hocs/with-player/with-player.jsx";
import {getFilteredMovies, getGenres, getIsLoading, getMovies} from "../../reducer/data/selectors";
import {getActiveMovie, getPlayingMovie} from "../../reducer/states/selectors";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {Operations as UserOperations} from "../../reducer/user/user";
import SignIn from "../sign-in/sign-in.jsx";
import {CurrentPage} from "../../const";
import {getCurrentPage} from "../../reducer/states/selectors";
import AddReview from "../add-review/add-review.jsx";
import withReview from "../../hocs/with-review/with-review.jsx";
import history from "../../history";
import {AppRoute} from "../../const";
import PrivateRoute from "../private-route/private-route.jsx";
import FavoriteMovieList from "../favorite-movie-list/favorite-movie-list.jsx";
import {getMovieById} from "../../utils";
import Loader from "../loader/loader.jsx";

const BigVideoPlayerWrapped = withPlayer(BigVideoPlayer);
const MoviePageWrapped = withTabs(MoviePage);
const AddReviewWrapped = withReview(AddReview);

const App = (props) => {
  const {movies, isLoading, filteredMovies, genres, activeMovie, onMovieClick, playingMovie, currentPage, login, loadMovies} = props;
  const currentMovie = filteredMovies.filter(({promoMovie}) => promoMovie.id === activeMovie)[0];

  const _renderApp = () => {
    if (playingMovie) {
      return <BigVideoPlayerWrapped movie={playingMovie}/>;
    }

    switch (currentPage) {
      case CurrentPage.PLAYER:
        return <BigVideoPlayerWrapped movie={playingMovie}/>;
      case CurrentPage.DETAIL:
        return (
          <MoviePageWrapped
            movie={currentMovie}
          />
        );
      case CurrentPage.LOGIN:
        return (
          <SignIn
            onSubmit={login}
          />
        );
      case CurrentPage.ADD_REVIEW:
        return (
          <AddReviewWrapped />
        );
      default:
        return (
          <Main
            filteredMovies={filteredMovies}
            genres={genres}
            onMovieClick={onMovieClick}
          />
        );
    }
  };

  const renderMoviePage = (match) => {
    const id = Number(match.params.id);
    return (
      <MoviePageWrapped movies={movies} movie={getMovieById(movies, id)}/>
    );
  };

  return (
    <React.Fragment>
      {!isLoading ?
        <Router
          history={history}
        >
          <Switch>
            <Route exact path={AppRoute.ROOT}>
              {_renderApp()}
            </Route>
            <Route exact path={AppRoute.LOGIN}>
              <SignIn onSubmit={login} />
            </Route>
            <PrivateRoute
              exact
              path={AppRoute.REVIEW}
              render={() => {
                return <AddReviewWrapped />;
              }}
            />
            <PrivateRoute
              exact
              path={AppRoute.MY_LIST}
              render={(RouteProps) => {
                loadMovies();
                return <FavoriteMovieList RouteProps={RouteProps} />;
              }}
            />
            <Route
              exact path={`${AppRoute.MOVIE}/:id`}
              render={({match}) => renderMoviePage(match)}
            />
            <Route>
              <div>404 not found</div>
            </Route>
          </Switch>
        </Router>
        : <Loader />}
    </React.Fragment>


  );
};

App.propTypes = {
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
        runTime: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        starring: PropTypes.array.isRequired,
      })
  ).isRequired,
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
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  activeMovie: PropTypes.number.isRequired,
  onMovieClick: PropTypes.func.isRequired,
  playingMovie: PropTypes.shape({
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
  }),
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  filteredMovies: getFilteredMovies(state),
  genres: getGenres(state),
  activeMovie: getActiveMovie(state),
  playingMovie: getPlayingMovie(state),
  authorizationStatus: getAuthorizationStatus(state),
  currentPage: getCurrentPage(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMovieClick(id) {
    dispatch(ActionCreator.changePage(CurrentPage.DETAIL));
    dispatch(ActionCreator.changeActiveMovie(id));
    dispatch(Operations.loadReviews(id));
  },
  login(authData) {
    dispatch(UserOperations.login(authData));
  },
  loadMovies() {
    dispatch(Operations.loadFavoriteMovies());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
