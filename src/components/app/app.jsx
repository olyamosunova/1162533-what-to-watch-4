import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import withTabs from "../../hocs/with-tabs.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/states/states";
import {Operations} from "../../reducer/data/data";
import BigVideoPlayer from "../big-video-player/big-video-player.jsx";
import withPlayer from "../../hocs/with-player/with-player.jsx";
import {getFilteredMovies, getGenres} from "../../reducer/data/selectors";
import {getActiveMovie, getPlayingMovie} from "../../reducer/states/selectors";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {Operations as UserOperations} from "../../reducer/user/user";
import SignIn from "../sign-in/sign-in.jsx";
import {CurrentPage} from "../../const";
import {getCurrentPage} from "../../reducer/states/selectors";
import AddReview from "../add-review/add-review.jsx";

const BigVideoPlayerWrapped = withPlayer(BigVideoPlayer);

const MoviePageWrapped = withTabs(MoviePage);

const App = (props) => {
  const {filteredMovies, genres, activeMovie, onMovieClick, playingMovie, currentPage, login} = props;
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
            onMovieClick={onMovieClick}
          />
        );
      case CurrentPage.LOGIN:
        return (
          <SignIn
            onSubmit={login}
          />
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

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {_renderApp()}
        </Route>
        <Route exact path="/movie-page">
          <MoviePageWrapped
            onMovieClick={onMovieClick}
          />
        </Route>
        <Route exact path="/dev-auth">
          <SignIn onSubmit={login} />
        </Route>
        <Route exact path="/dev-review">
          <AddReview />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
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
};

const mapStateToProps = (state) => ({
  filteredMovies: getFilteredMovies(state),
  genres: getGenres(state),
  activeMovie: getActiveMovie(state),
  playingMovie: getPlayingMovie(state),
  authorizationStatus: getAuthorizationStatus(state),
  currentPage: getCurrentPage(state),
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
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
