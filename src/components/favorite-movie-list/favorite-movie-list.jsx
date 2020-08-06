import React, {PureComponent} from "react";
import MoviesList from "../movies-list/movies-list.jsx";
import {connect} from "react-redux";
import {getFavoriteMovies} from "../../reducer/data/selectors";
import Header from "../header/header.jsx";
import {CurrentPage} from "../../const";
import PropTypes from "prop-types";

class FavoriteMovieList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {favoriteMovies} = this.props;

    return <div className="user-page">
      <Header currentPage={CurrentPage.MY_LIST}>
        <h1 className="page-title user-page__title">My list</h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__movies-list">
          <MoviesList movies={favoriteMovies} />
        </div>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>

    </div>;
  }
}

FavoriteMovieList.propTypes = {
  favoriteMovies: PropTypes.arrayOf(
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
};

const mapStateToProps = (state) => ({
  favoriteMovies: getFavoriteMovies(state),
});

export default connect(mapStateToProps)(FavoriteMovieList);
