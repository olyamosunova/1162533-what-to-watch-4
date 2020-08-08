import * as React from 'react';
import {Route, Switch, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PrivateRoute from "../private-route/private-route";
import history from "../../history";
import {MovieInterface} from "../../types";

import {AppRoute} from "../../const";
import {getMovieById} from "../../utils";
import {Operations} from "../../reducer/data/data";
import {getFilteredMovies, getGenres, getIsError, getIsLoading, getMovies} from "../../reducer/data/selectors";
import {AuthorizationStatus, Operations as UserOperations} from "../../reducer/user/user";
import {getAuthorizationStatus} from "../../reducer/user/selectors";

import Main from "../main/main";
import MoviePage from "../movie-page/movie-page";
import BigVideoPlayer from "../big-video-player/big-video-player";
import SignIn from "../sign-in/sign-in";
import FavoriteMovieList from "../favorite-movie-list/favorite-movie-list";
import AddReview from "../add-review/add-review";
import Loader from "../loader/loader";

import withTabs from "../../hocs/with-tabs";
import withPlayer from "../../hocs/with-player/with-player";
import withReview from "../../hocs/with-review/with-review";

const BigVideoPlayerWrapped = withPlayer(BigVideoPlayer);
const MoviePageWrapped = withTabs(MoviePage);
const AddReviewWrapped = withReview(AddReview);

interface Props {
  movies: Array<MovieInterface>;
  filteredMovies: Array<MovieInterface>;
  genres: string[];
  authorizationStatus: string;
  isLoading: boolean;
  isError: boolean;
  login(authData: {}): void;
  loadMovies(): void;
}

const App: React.FC<Props> = ({
  movies,
  filteredMovies,
  isLoading,
  isError,
  genres,
  authorizationStatus,
  login,
  loadMovies
}: Props) => {

  const renderMainPage = () => {
    return !isError ?
      <Main
        filteredMovies={filteredMovies}
        genres={genres}
      />
      : <div>404 not found</div>;
  };

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
            <Route
              exact
              path={AppRoute.ROOT}
              render={renderMainPage}
            />
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

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  filteredMovies: getFilteredMovies(state),
  genres: getGenres(state),
  isLoading: getIsLoading(state),
  authorizationStatus: getAuthorizationStatus(state),
  isError: getIsError(state),
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
