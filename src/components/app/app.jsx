import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

const movieTitleClickHandler = () => {};

const App = (props) => {
  const {title, genre, releaseDate, movies} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            title={title}
            genre={genre}
            releaseDate={releaseDate}
            movies={movies}
            onMovieTitleClick={movieTitleClickHandler}
          />
        </Route>
        <Route exact path="/dev-movie-page">
          <MoviePage />
        </Route>
      </Switch>
    </BrowserRouter>

  );
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,
  movies: PropTypes.array.isRequired,
};

export default App;
