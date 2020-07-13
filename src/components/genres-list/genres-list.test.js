import React from "react";
import renderer from "react-test-renderer";
import GenresList from "./genres-list.jsx";
import {GenreNames} from "./../../const.js";
import {Movies} from "../../mock/testData";
import {getGenresList} from "../../utils";

const genres = getGenresList(Movies);

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
