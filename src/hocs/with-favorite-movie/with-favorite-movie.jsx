import React from "react";
import {getFavoriteMovies} from "../../reducer/data/selectors";
import {compose} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const withFavoriteMovies = (Component) => {
  const WithFavoriteMovies = (props) => {
    const {movies} = props;

    return <Component
      {...props}
      movies={movies}
    />;
  };

  WithFavoriteMovies.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  return WithFavoriteMovies;

};

const mapStateToProps = (state) => {
  let movies = getFavoriteMovies(state);

  return {
    movies
  };
};

const composedHoc = compose(
    connect(mapStateToProps),
    withFavoriteMovies
);

export {withFavoriteMovies};
export default composedHoc;
