import React from "react";
import renderer from "react-test-renderer";
import MoviePageReviews from "./movie-page-reviews.jsx";
import {movie} from "../../mock/testData";

it(`Should MoviePageReviews render correctly`, () => {
  const tree = renderer
    .create(<MoviePageReviews
      movie={movie}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
