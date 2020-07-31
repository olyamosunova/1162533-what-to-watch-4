import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/states/states";
import {getPromoMovie} from "../../reducer/data/selectors";
import Header from "../header/header.jsx";
import {getAuthorizationStatus, getUserData} from "../../reducer/user/selectors";
import {CurrentPage} from "../../const";

const PromoMovie = (props) => {
  const {promoMovieCard, onPlayClick, authorizationStatus, userData, onLoginClick} = props;
  const {promoMovie} = promoMovieCard;
  const {title, genre, releaseDate, cover, poster} = promoMovie;
  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={cover} alt="The Grand Budapest Hotel"/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header authorizationStatus={authorizationStatus} userData={userData} onLoginClick={onLoginClick} />

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
              <button
                className="btn btn--play movie-card__button"
                type="button"
                onClick={() => {
                  onPlayClick(promoMovieCard);
                }}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
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
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      releaseDate: PropTypes.number.isRequired,
      poster: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
    }),
  }),
  onPlayClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  promoMovieCard: getPromoMovie(state),
  authorizationStatus: getAuthorizationStatus(state),
  userData: getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onPlayClick(movie) {
    dispatch(ActionCreator.chooseMovieToWatch(movie));
  },
  onLoginClick(evt) {
    evt.preventDefault();
    dispatch(ActionCreator.changePage(CurrentPage.LOGIN));
  }
});

export {PromoMovie};
export default connect(mapStateToProps, mapDispatchToProps)(PromoMovie);
