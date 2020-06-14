import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {MovieDescription, MOVIES_TITLES} from "../../mock/movies";

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      title={MovieDescription.TITLE}
      genre={MovieDescription.GENRE}
      releaseDate={MovieDescription.RELEASE_DATE}
      moviesTitles={MOVIES_TITLES}
      onMovieTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
