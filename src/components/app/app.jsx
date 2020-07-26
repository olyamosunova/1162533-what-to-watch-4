import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import withTabs from "../../hocs/with-tabs.jsx";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/states/states";
import BigVideoPlayer from "../big-video-player/big-video-player.jsx";
import withPlayer from "../../hocs/with-player/with-player.jsx";
import {getFilteredMovies, getGenres} from "../../reducer/data/selectors";
import {getActiveMovie, getPlayingMovie} from "../../reducer/states/selectors";

const BigVideoPlayerWrapped = withPlayer(BigVideoPlayer);

const MoviePageWrapped = withTabs(MoviePage);

const App = (props) => {
  const {filteredMovies, genres, activeMovie, onMovieClick, playingMovie} = props;
  const currentMovie = filteredMovies.filter(({promoMovie}) => promoMovie.id === activeMovie)[0];

  const _renderApp = () => {
    if (playingMovie) {
      return <BigVideoPlayerWrapped movie={playingMovie}/>;
    }

    if (currentMovie) {
      return (
        <MoviePageWrapped
          movie={currentMovie}
          onMovieClick={onMovieClick}
        />
      );
    }

    return (
      <Main
        filteredMovies={filteredMovies}
        genres={genres}
        onMovieClick={onMovieClick}
      />
    );
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
  }),
};

const mapStateToProps = (state) => ({
  filteredMovies: getFilteredMovies(state),
  genres: getGenres(state),
  activeMovie: getActiveMovie(state),
  playingMovie: getPlayingMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMovieClick(id) {
    dispatch(ActionCreator.changeActiveMovie(id));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
