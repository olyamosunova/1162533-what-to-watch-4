import * as React from 'react';
import MoviesList from "../movies-list/movies-list";
import GenresList from "../genres-list/genres-list";
import ShowMoreButton from "../show-more-button/show-more-button";
import {ActionCreator} from "../../reducer/states/states";
import {connect} from "react-redux";
import {getGenres, getFilteredMovies} from "../../reducer/data/selectors";
import {getActiveGenre, getShowedMoviesCount} from "../../reducer/states/selectors";
import PromoMovie from "../promo-movie/promo-movie";
import {MovieInterface} from "../../types";

interface Props {
  genres: string[];
  activeGenre: string;
  onClick(activeGenre: string): void;
  filteredMovies: Array<MovieInterface>;
  showedMoviesCount: number;
  onShowMoreButtonClick(): void;
}

class Main extends React.PureComponent<Props, {} > {
  constructor(props) {
    super(props);
  }

  render() {
    const {genres, activeGenre, onClick, filteredMovies, showedMoviesCount, onShowMoreButtonClick} = this.props;
    const showedMovies = [...filteredMovies].splice(0, showedMoviesCount);

    const isHideShowMoreButton = showedMoviesCount >= filteredMovies.length ? true : false;

    return (
      <React.Fragment>
        <PromoMovie />

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <GenresList genres={genres} activeGenre={activeGenre} onClick={onClick} />

            <MoviesList
              movies={showedMovies}
            />

            {isHideShowMoreButton ? null : <ShowMoreButton onShowMoreButtonClick={onShowMoreButtonClick} />}

          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  activeGenre: getActiveGenre(state),
  genres: getGenres(state),
  filteredMovies: getFilteredMovies(state),
  showedMoviesCount: getShowedMoviesCount(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClick(activeGenre) {
    dispatch(ActionCreator.changeGenre(activeGenre));
  },
  onShowMoreButtonClick() {
    dispatch(ActionCreator.incrementShownMoviesCount());
  },
});
export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
