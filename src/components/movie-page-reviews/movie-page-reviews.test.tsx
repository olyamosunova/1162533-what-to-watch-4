import * as React from "react";
import * as renderer from 'react-test-renderer';
import MoviePageReviews from "./movie-page-reviews";
import {reviews} from "../../mock/testData";

it(`Should MoviePageReviews render correctly`, () => {
  const tree = renderer
    .create(<MoviePageReviews
      reviews={reviews}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
