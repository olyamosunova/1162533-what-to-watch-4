import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {indexMovie, Movies} from "../../mock/testData";

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      indexMovie={indexMovie}
      movies={Movies}
      onMovieClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
