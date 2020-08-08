import * as React from "react";
import * as renderer from 'react-test-renderer';
import MoviePageOverview from "./movie-page-overview";
import {movie} from "../../mock/testData";

it(`Should MoviePageOverview render correctly`, () => {
  const tree = renderer
    .create(<MoviePageOverview
      movie={movie}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
