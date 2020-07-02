import React from "react";
import renderer from "react-test-renderer";
import MoviePageOverview from "./movie-page-overview.jsx";
import {movie} from "../../mock/testData";

it(`Should MoviePageOverview render correctly`, () => {
  const tree = renderer
    .create(<MoviePageOverview
      movie={movie}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
