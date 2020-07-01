import React from "react";
import renderer from "react-test-renderer";
import MoviePageDetails from "./movie-page-details.jsx";
import {movie} from "../../mock/testData";

it(`Should MoviePageDetails render correctly`, () => {
  const tree = renderer
    .create(<MoviePageDetails
      movie={movie}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
