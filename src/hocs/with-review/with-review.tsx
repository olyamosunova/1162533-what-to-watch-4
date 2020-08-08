import * as React from "react";
import {Review} from "../../const";
import {connect} from 'react-redux';
import {Operations as DataOperations} from "../../reducer/data/data";
import {getIsError, getMovies} from "../../reducer/data/selectors";
import {getActiveMovie} from "../../reducer/states/selectors";
import {getReviewPosting} from "../../reducer/data/selectors";
import {ActionCreatorByData} from "../../reducer/data/data";
import {MovieInterface} from "../../types";
import {Subtract} from "utility-types";

interface State {
  rating: number,
  comment: string,
  isSubmitDisabled: boolean,
  isReviewLengthError: boolean,
}

interface InjectingProps {
  movie: MovieInterface,
  movies: Array<MovieInterface>,
  isReviewPosting: boolean,
  onReviewSubmit(movieId: number, review: {
    rating: number;
    comment: string;
  }): void,
  activeMovieId: number
  isError: boolean,
  clearError(): void,
}

const withReview = (Component) => {
  class WithReview extends React.PureComponent<InjectingProps, State> {
    constructor(props) {
      super(props);

      this.state = {
        rating: 5,
        comment: ``,
        isSubmitDisabled: true,
        isReviewLengthError: false,
      };

      this._handleFormChange = this._handleFormChange.bind(this);
      this._handleSubmitClick = this._handleSubmitClick.bind(this);
      this._handleReviewChange = this._handleReviewChange.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
    }

    _handleFormChange() {
      const {clearError} = this.props;
      clearError();
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
        isSubmitDisabled: evt.target.value.length < Review.MIN_LENGTH || evt.target.value.length > Review.MAX_LENGTH || isReviewPosting,
        isReviewLengthError: evt.target.value.length < Review.MIN_LENGTH || evt.target.value.length > Review.MAX_LENGTH,
      });
    }

    _handleSubmitClick(evt) {
      const {movie, onReviewSubmit} = this.props;

      const review = {
        rating: this.state.rating,
        comment: this.state.comment,
      };

      evt.preventDefault();
      onReviewSubmit(movie.promoMovie.id, review);
    }

    render() {
      const {movie} = this.props;

      return (
        <Component
          {...this.props}
          activeMovie={movie}
          onFormChange={this._handleFormChange}
          onSubmitClick={this._handleSubmitClick}
          onRatingChange={this._handleRatingChange}
          onReviewChange={this._handleReviewChange}
          isSubmitDisabled={this.state.isSubmitDisabled}
          isReviewLengthError={this.state.isReviewLengthError}
        />
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      activeMovieId: getActiveMovie(state),
      movies: getMovies(state),
      isReviewPosting: getReviewPosting(state),
      isError: getIsError(state),
    };
  };

  const mapDispatchToProps = (dispatch) => ({
    onReviewSubmit(movieId, review) {
      dispatch(DataOperations.postReview(movieId, review));
    },

    clearError() {
      dispatch(ActionCreatorByData.clearError());
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReview);
};

export default withReview;
