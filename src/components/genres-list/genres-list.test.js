import React from "react";
import renderer from "react-test-renderer";
import GenresList from "./genres-list.jsx";
import {GenreNames} from "./../../const.js";
import {genres} from "../../mock/testData";

it(`render GenresList`, () => {
  const tree = renderer
    .create(
        <GenresList
          activeGenre={GenreNames.ALL}
          onClick={()=>{}}
          genres={genres}
        />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
