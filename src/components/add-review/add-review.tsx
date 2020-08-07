import React from "react";
import PropTypes from 'prop-types';
import {TEXTAREA_BACKGROUNDCOLOR, Review, reviewSubmitButton, AppRoute} from "../../const";
import Header from "../header/header.js";
import {Link} from "react-router-dom";

const AddReview = (props) => {

  const {
    movie,
    isError,
    isReviewPosting,
    onSubmitClick,
    onRatingChange,
    onFormChange,
    onReviewChange,
    isSubmitDisabled,
    isReviewLengthError
  } = props;

  const RATINGS_QUANTITY = 5;
  const isRadioDisabled = isReviewPosting ? true : false;

  const {promoMovie, backgroundColor} = movie;
  const {id, title, poster, cover} = promoMovie;

  const boxShadow = isReviewLengthError ? `inset 1px 0 10px red` : ``;

  return (
    <section
      className="movie-card movie-card--full"
      style={{backgroundColor: `${backgroundColor}`}}
    >
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={cover} alt={title}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link
                  className="breadcrumbs__link"
                  to={`${AppRoute.MOVIE}/${id}`}>
                  {title}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
        </Header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={poster} alt={title} width="218"
            height="327"/>
        </div>
      </div>

      <div className="add-review">
        <form
          action="#"
          className="add-review__form"
          onSubmit={onSubmitClick}
          onChange={onFormChange}
        >
          <div className="rating">
            <div
              className="rating__stars"
              onChange={onRatingChange}
            >
              {Array.from(Array(RATINGS_QUANTITY)).map((_, index) => {
                const rating = index + 1;

                return (
                  <React.Fragment key={rating}>
                    <input
                      className="rating__input"
                      id={`star-${rating}`}
                      type="radio"
                      name="rating"
                      value={rating}
                      disabled={isRadioDisabled}
                    />
                    <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="add-review__text"
            style={{backgroundColor: `${TEXTAREA_BACKGROUNDCOLOR}`, boxShadow: `${boxShadow}`}}
          >
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              minLength={Review.MIN_LENGTH}
              maxLength={Review.MAX_LENGTH}
              onChange={onReviewChange}
              required
            ></textarea>
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                disabled={isSubmitDisabled}
              >
                {isReviewPosting ? reviewSubmitButton.posting : reviewSubmitButton.post}
              </button>
            </div>

          </div>
        </form>

        {isReviewLengthError &&
        <p style={{color: `red`, textShadow: `1px 1px 2px black, 0 0 1em red`}}>The length of the text should not be less than 50 characters and not be more than 400.</p>
        }

        {isError &&
        <p style={{color: `red`, textShadow: `1px 1px 2px black, 0 0 1em red`}}>Error while submitting form data. Please, try again later.</p>
        }

      </div>

    </section>
  );
};

AddReview.propTypes = {
  movie: PropTypes.shape({
    promoMovie: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      releaseDate: PropTypes.number.isRequired,
      poster: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      previewVideo: PropTypes.string.isRequired,
    }),
    backgroundColor: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratingLevel: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    runTime: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.array.isRequired,
  }),
  isReviewPosting: PropTypes.bool.isRequired,
  onSubmitClick: PropTypes.func.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onReviewChange: PropTypes.func.isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
  isReviewLengthError: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default AddReview;
