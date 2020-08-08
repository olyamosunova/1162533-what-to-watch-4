import * as React from 'react';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import * as renderer from 'react-test-renderer';
import {movie} from "../../mock/testData";
import NameSpace from '../../reducer/name-space';
import {Router} from 'react-router-dom';
import history from '../../history';
import {AuthorizationStatus} from "../../const";
import MyListButton from "./my-list-button";

const mockStore = configureStore([]);

describe(`MyListButton`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
    }
  });

  it(`Should render correctly`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <MyListButton
                movie={movie} />
            </Provider>
          </Router>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
