import * as React from "react";
import * as renderer from 'react-test-renderer';
import GenresList from "./genres-list";
import {GenreNames} from "./../../const";
import {genres, emptyFunction} from "../../mock/testData";

it(`render GenresList`, () => {
  const tree = renderer
    .create(
        <GenresList
          activeGenre={GenreNames.ALL}
          onClick={emptyFunction}
          genres={genres}
        />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
