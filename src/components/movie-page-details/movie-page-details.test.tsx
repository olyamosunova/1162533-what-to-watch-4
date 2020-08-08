import * as React from "react";
import * as renderer from 'react-test-renderer';
import MoviePageDetails from "./movie-page-details";
import {movie} from "../../mock/testData";

it(`Should MoviePageDetails render correctly`, () => {
  const tree = renderer
    .create(<MoviePageDetails
      movie={movie}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
