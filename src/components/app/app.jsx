import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovie: null,
    };

    this._movieClickHandler = this._movieClickHandler.bind(this);
  }
  _movieClickHandler(id) {
    this.setState({
      activeMovie: id,
    });
  }

  _renderApp() {
    const {activeMovie} = this.state;
    const {indexMovie, movies} = this.props;

    if (activeMovie) {
      const currentMovie = movies.filter(({promoMovie}) => promoMovie.id === activeMovie)[0];
      return (
        <MoviePage
          movie={currentMovie}
          movies={movies}
          onMovieClick={this._movieClickHandler}
        />
      );
    }

    return (
      <Main
        indexMovie={indexMovie}
        movies={movies}
        onMovieClick={this._movieClickHandler}
      />
    );
  }

  render() {
    const {movies} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-movie-page">
            <MoviePage
              movies={movies}
              onMovieClick={this._movieClickHandler}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  indexMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  }).isRequired,
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
        description: PropTypes.array.isRequired,
        director: PropTypes.string.isRequired,
        starring: PropTypes.string.isRequired,
      })
  ).isRequired,
};

export default App;
