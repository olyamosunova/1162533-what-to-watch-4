import React from "react";
import {Route, Switch, Router, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import withTabs from "../../hocs/with-tabs.jsx";
import {connect} from "react-redux";
import {Operations} from "../../reducer/data/data";
import BigVideoPlayer from "../big-video-player/big-video-player.jsx";
import withPlayer from "../../hocs/with-player/with-player.jsx";
import {getFilteredMovies, getGenres, getIsLoading, getMovies} from "../../reducer/data/selectors";
import {Operations as UserOperations} from "../../reducer/user/user";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import withReview from "../../hocs/with-review/with-review.jsx";
import history from "../../history";
import {AppRoute} from "../../const";
import PrivateRoute from "../private-route/private-route.jsx";
import FavoriteMovieList from "../favorite-movie-list/favorite-movie-list.jsx";
import {getMovieById} from "../../utils";
import Loader from "../loader/loader.jsx";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";

const BigVideoPlayerWrapped = withPlayer(BigVideoPlayer);
const MoviePageWrapped = withTabs(MoviePage);
const AddReviewWrapped = withReview(AddReview);

const App = (props) => {
  const {movies, isLoading, filteredMovies, genres, login, loadMovies, authorizationStatus} = props;

  const renderAddReview = (match) => {
    const id = Number(match.params.id);
    return (
      <AddReviewWrapped movie={getMovieById(movies, id)}/>
    );
  };

  const renderMoviePage = (match) => {
    const id = Number(match.params.id);
    return (
      <MoviePageWrapped movie={getMovieById(movies, id)}/>
    );
  };

  const renderVideoPlayer = (match) => {
    const id = Number(match.params.id);
    return (
      <BigVideoPlayerWrapped movie={getMovieById(movies, id)}/>
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
              <Main
                filteredMovies={filteredMovies}
                genres={genres}
              />
            </Route>
            <Route
              exact path={AppRoute.LOGIN}
              render={() => {
                return authorizationStatus !== AuthorizationStatus.AUTH ?
                  <SignIn onSubmit={login} /> :
                  <Redirect
                    to={AppRoute.ROOT}
                  />;
              }}
            />
            <PrivateRoute
              exact
              path={AppRoute.REVIEW}
              render={({match}) => renderAddReview(match)}
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
            <Route
              exact path={AppRoute.PLAYER}
              render={({match}) => renderVideoPlayer(match)}
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
  login: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadMovies: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  filteredMovies: getFilteredMovies(state),
  genres: getGenres(state),
  isLoading: getIsLoading(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperations.login(authData));
  },
  loadMovies() {
    dispatch(Operations.loadFavoriteMovies());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
