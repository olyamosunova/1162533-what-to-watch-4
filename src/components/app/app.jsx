import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

const movieTitleHandler = () => {};

const App = (props) => {
  const {title, genre, releaseDate, moviesTitles} = props;

  return (
    <Main
      title={title}
      genre={genre}
      releaseDate={releaseDate}
      moviesTitles={moviesTitles}
      onMovieTitleClick={movieTitleHandler}
    />
  );
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseDate: PropTypes.number.isRequired,
  moviesTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
