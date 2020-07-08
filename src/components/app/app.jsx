import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import withTabs from "../../hocs/with-tabs.jsx";
import {connect} from "react-redux";

const MoviePageWrapped = withTabs(MoviePage);

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
    const {indexMovie, movies, genres} = this.props;

    if (activeMovie) {
      const currentMovie = movies.filter(({promoMovie}) => promoMovie.id === activeMovie)[0];

      return (
        <MoviePageWrapped
          movie={currentMovie}
          onMovieClick={this._movieClickHandler}
        />
      );
    }

    return (
      <Main
        genres={genres}
        indexMovie={indexMovie}
        onMovieClick={this._movieClickHandler}
      />
    );
  }

  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-movie-page">
            <MoviePageWrapped
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
      })
  ).isRequired,
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  genres: state.genres,
});

export {App};
export default connect(mapStateToProps)(App);
