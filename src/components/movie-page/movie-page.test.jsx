import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import {movie, Movies} from "../../mock/testData";

it(`Should MoviePage render correctly`, () => {
  const tree = renderer
    .create(<MoviePage
      movie={movie}
      movies={Movies}
      onMovieClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
