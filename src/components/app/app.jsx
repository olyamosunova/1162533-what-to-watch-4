import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

const movieTitleClickHandler = () => {};

const App = (props) => {
  const {title, genre, releaseDate, movies} = props;

  return (
    <Main
      title={title}
      genre={genre}
      releaseDate={releaseDate}
      movies={movies}
      onMovieTitleClick={movieTitleClickHandler}
    />
  );
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,
  movies: PropTypes.array.isRequired,
};

export default App;
