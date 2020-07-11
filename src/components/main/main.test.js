import React from "react";
import renderer from "react-test-renderer";
import {Main} from "./main.jsx";
import {indexMovie, Movies} from "../../mock/testData";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {GenreNames} from "./../../const.js";
import {getGenresList} from "../../utils";

const mockStore = configureStore([]);

const genres = getGenresList(Movies);

it(`Should Main render correctly`, () => {
  const store = mockStore({
    activeGenre: GenreNames.ALL,
    filteredMovies: Movies,
    genres,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            activeGenre={GenreNames.ALL}
            indexMovie={indexMovie}
            filteredMovies={Movies}
            onMovieClick={() => {}}
            onClick={() => {}}
            genres={genres}
          />
        </Provider>, {
          createNodeMock: ()=>{
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
