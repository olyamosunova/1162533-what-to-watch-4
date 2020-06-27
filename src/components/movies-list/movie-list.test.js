import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import {Movies} from "../../mock/testData";

it(`Should MoviesList render correctly`, () => {
  const tree = renderer
    .create(<MoviesList
      movies={Movies}
      onMovieClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
