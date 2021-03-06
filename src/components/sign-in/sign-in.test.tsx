import * as React from "react";
import * as renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Router} from 'react-router-dom';
import history from '../../history';
import NameSpace from '../../reducer/name-space';
import SignIn from './sign-in';
import {emptyFunction} from "../../mock/testData";

describe(`SignIn`, () => {
  const mockStore = configureStore([]);

  it(`Should render correctly when AuthError`, () => {
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

    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <SignIn
                onSubmit={emptyFunction}
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

  it(`Should render correctly when no AuthError`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: `NO_AUTH`,
        authorizationError: false,
        userData: {
          id: 1,
          email: `vesna@mail.ru`,
          name: `qwerty`,
          avatarUrl: ``,
        }
      },
    });

    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <SignIn
                onSubmit={emptyFunction}
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
