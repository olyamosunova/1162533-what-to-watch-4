import React from "react";
import renderer from "react-test-renderer";
import MoviePageReviews from "./movie-page-reviews.jsx";
import {reviews} from "../../mock/testData";

it(`Should MoviePageReviews render correctly`, () => {
  const tree = renderer
    .create(<MoviePageReviews
      reviews={reviews}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
