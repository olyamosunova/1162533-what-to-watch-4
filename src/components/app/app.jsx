import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePage: `main`,
    };

    this._movieClickHandler = this._movieClickHandler.bind(this);
  }
  _movieClickHandler(activePage) {
    this.setState({
      activePage
    });
  }

  _renderApp() {
    const activePage = this.state.activePage;
    const {promoMovie, movieDescription, movies} = this.props;

    switch (activePage) {
      case `main`:
        return (
          <Main
            promoMovie={promoMovie}
            movies={movies}
            onMovieTitleClick={this._movieClickHandler}
          />
        );
      case `movie`:
        return (
          <MoviePage
            movieDescription={movieDescription}
            movies={movies}
            onMovieTitleClick={this._movieClickHandler}
          />
        );
    }
    return null;
  }

  render() {
    const {movieDescription, movies} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-movie-page">
            <MoviePage
              movieDescription={movieDescription}
              movies={movies}
              onMovieTitleClick={this._movieClickHandler}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  promoMovie: PropTypes.shape({
    TITLE: PropTypes.string.isRequired,
    GENRE: PropTypes.string.isRequired,
    RELEASE_DATE: PropTypes.number.isRequired,
    COVER: PropTypes.string.isRequired,
    POSTER: PropTypes.string.isRequired,
  }).isRequired,
  movieDescription: PropTypes.shape({
    TITLE: PropTypes.string.isRequired,
    GENRE: PropTypes.string.isRequired,
    RELEASE_DATE: PropTypes.number.isRequired,
    POSTER: PropTypes.string.isRequired,
    COVER: PropTypes.string.isRequired,
    RATING: PropTypes.number.isRequired,
    RATING_LEVEL: PropTypes.string.isRequired,
    RATING_COUNT: PropTypes.number.isRequired,
    DESCRIPTION: PropTypes.array.isRequired,
    DIRECTOR: PropTypes.string.isRequired,
    STARRING: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      })
  ).isRequired,
};

export default App;
