import * as React from "react";
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from '../../history';
import Header from './header';
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.USER]: {
    authorizationStatus: `NO_AUTH`,
    userData: {
      id: 0,
      email: ``,
      name: ``,
      avatarUrl: ``,
    }
  },
});

const userData = {
  id: 1,
  email: `sadas@dsasd.ru`,
  name: `asdasd`,
  avatarUrl: `https://4.react.pages.academy/wtw/asda.jpg`,
};

describe(`Header`, () => {
  it(`Should render correctly when is main page and user signed in`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <Header
                authorizationStatus={``}
                userData={userData}
              />
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
