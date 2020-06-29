import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {indexMovie, Movies} from "../../mock/testData";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      indexMovie={indexMovie}
      movies={Movies}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
