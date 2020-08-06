import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getPromoMovie} from "../../reducer/data/selectors";
import Header from "../header/header.jsx";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import {Operations} from "../../reducer/data/data";
import MyListButton from "../my-list-button/my-list-button.jsx";

const PromoMovie = (props) => {
  const {promoMovieCard, onMyListClick} = props;
  const {promoMovie, isFavorite} = promoMovieCard;
  const {id, title, genre, releaseDate, cover, poster} = promoMovie;
  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={cover} alt="The Grand Budapest Hotel"/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header />

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={poster} alt={title} width="218" height="327"/>
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{releaseDate}</span>
            </p>

            <div className="movie-card__buttons">
              <Link
                className="btn btn--play movie-card__button"
                to={`${AppRoute.MOVIE}/${id}/player`}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </Link>
              <MyListButton id={id} isFavorite={isFavorite} onMyListClick={onMyListClick} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

PromoMovie.propTypes = {
  promoMovieCard: PropTypes.shape({
    promoMovie: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      releaseDate: PropTypes.number.isRequired,
      poster: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
    }),
    isFavorite: PropTypes.bool.isRequired,
  }),
  onMyListClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  promoMovieCard: getPromoMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMyListClick(movieId, status, isPromoMovie) {
    dispatch(Operations.changeFlagIsFavorite(movieId, status, isPromoMovie));
  },
});

export {PromoMovie};
export default connect(mapStateToProps, mapDispatchToProps)(PromoMovie);
