import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {indexMovie} from "../../mock/testData";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Movies} from "../../mock/testData";
import {GenreNames} from "../../const";
import {getGenresList} from "../../utils";

const genres = getGenresList(Movies);

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    activeGenre: GenreNames.ALL,
    movies: Movies,
    genres,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            indexMovie={indexMovie}
            movies={Movies}
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
