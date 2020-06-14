import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {MovieDescription, MOVIES_TITLES} from "../../mock/movies";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      title={MovieDescription.TITLE}
      genre={MovieDescription.GENRE}
      releaseDate={MovieDescription.RELEASE_DATE}
      moviesTitles={MOVIES_TITLES}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
