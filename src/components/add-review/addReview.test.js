import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review.jsx";
import {movie} from "../../mock/testData";

it(`render AddReview`, () => {
  const tree = renderer
    .create(
        <AddReview
          activeMovie={movie}
          isReviewPosting={false}
          onSubmitClick={() => {}}
          onRatingChange={() => {}}
          onReviewChange={() => {}}
          isSubmitDisabled={true}
          isReviewPostingError={false}
          isReviewLengthError={false}
        />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
