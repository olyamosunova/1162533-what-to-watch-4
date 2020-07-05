import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {indexMovie} from "../../mock/testData";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Movies} from "../../mock/testData";
import {GenreNames} from "../../const";

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    activeGenre: GenreNames.ALL,
    movies: Movies,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            indexMovie={indexMovie}
            movies={Movies}
          />
        </Provider>, {
          createNodeMock: ()=>{
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
