import * as React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {CurrentPage} from "../../const";
import {MovieInterface} from "../../types";
import {AppRoute} from "../../const";

import {getFavoriteMovies} from "../../reducer/data/selectors";

import MoviesList from "../movies-list/movies-list";
import Header from "../header/header";

interface Props {
  favoriteMovies: Array<MovieInterface>,
}

const FavoriteMovieList: React.FC<Props> = (props: Props) => {
  const {favoriteMovies} = props;

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
        {<Link
          className="logo__link logo__link--light"
          to={AppRoute.ROOT}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>}
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>

  </div>;
};

const mapStateToProps = (state) => ({
  favoriteMovies: getFavoriteMovies(state),
});

export default connect(mapStateToProps)(FavoriteMovieList);
