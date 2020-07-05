import React from "react";
import renderer from "react-test-renderer";
import {GenresList} from "./genres-list.jsx";
import {GenreNames} from "./../../const.js";
import {Movies} from "../../mock/testData";


it(`render GenresList`, () => {
  const tree = renderer
    .create(
        <GenresList
          activeGenre={GenreNames.ALL}
          onClick={()=>{}}
          movies={Movies}
        />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
