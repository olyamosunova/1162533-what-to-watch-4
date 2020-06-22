import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

const movieTitleClickHandler = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {promoMovie, movieDescription, movies} = this.props;

    console.log(promoMovie, movieDescription);

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main
              promoMovie={promoMovie}
              movies={movies}
              onMovieTitleClick={movieTitleClickHandler}
            />
          </Route>
          <Route exact path="/dev-movie-page">
            <MoviePage
              movieDescription={movieDescription}
              movies={movies}
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
