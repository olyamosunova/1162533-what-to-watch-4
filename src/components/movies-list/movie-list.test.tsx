import * as React from "react";
import * as renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';
import {Router} from 'react-router-dom';
import history from "../../history";
import MoviesList from "./movies-list";
import {Movies} from "../../mock/testData";

const mockStore = configureStore([]);

it(`Should MoviesList render correctly`, () => {
  const store = mockStore({
    movies: Movies,
  });

  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <MoviesList
              movies={Movies}
            />
          </Provider>
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
