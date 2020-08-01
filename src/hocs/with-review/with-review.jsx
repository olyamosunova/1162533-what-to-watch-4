import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Review} from "../../const";
import {connect} from 'react-redux';
import {Operations as DataOperations} from "../../reducer/data/data";
import {getMovies} from "../../reducer/data/selectors";
import {getActiveMovie} from "../../reducer/states/selectors";
import {getReviewPosting} from "../../reducer/data/selectors";
import {getMovieById} from "../../utils";

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      const {activeMovieId, movies} = this.props;

      this.activeMovie = getMovieById(movies, activeMovieId);

      this.state = {
        rating: 5,
        comment: ``,
        isSubmitDisabled: true,
      };

      this._handleSubmitClick = this._handleSubmitClick.bind(this);
      this._handleReviewChange = this._handleReviewChange.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
    }

    _handleRatingChange(evt) {
      this.setState({
        rating: evt.target.value,
      });
    }

    _handleReviewChange(evt) {
      const {isReviewPosting} = this.props;

      this.setState({
        comment: evt.target.value,
        isSubmitDisabled: evt.target.value.length < Review.MIN_LENGTH || isReviewPosting,
      });
    }

    _handleSubmitClick(evt) {
      const {activeMovieId, onReviewSubmit} = this.props;

      const review = {
        rating: this.state.rating,
        comment: this.state.comment,
      };

      evt.preventDefault();
      onReviewSubmit(activeMovieId, review);
    }

    render() {
      return (
        <Component
          {...this.props}
          activeMovie={this.activeMovie}
          onSubmitClick={this._handleSubmitClick}
          onRatingChange={this._handleRatingChange}
          onReviewChange={this._handleReviewChange}
          isSubmitDisabled={this.state.isSubmitDisabled}
        />
      );
    }
  }

  WithReview.propTypes = {
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
          runTime: PropTypes.number.isRequired,
          description: PropTypes.string.isRequired,
          director: PropTypes.string.isRequired,
          starring: PropTypes.array.isRequired,
        })
    ),
    isReviewPosting: PropTypes.bool.isRequired,
    onReviewSubmit: PropTypes.func.isRequired,
    activeMovieId: PropTypes.number.isRequired,
  };

  const mapStateToProps = (state) => {
    return {
      activeMovieId: getActiveMovie(state),
      movies: getMovies(state),
      isReviewPosting: getReviewPosting(state),
    };
  };

  const mapDispatchToProps = (dispatch) => ({
    onReviewSubmit(movieId, review) {
      dispatch(DataOperations.postReview(movieId, review));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReview);
};

export default withReview;
