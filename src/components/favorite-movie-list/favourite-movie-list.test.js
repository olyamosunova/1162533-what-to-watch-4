import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Movies} from "../../mock/testData";
import NameSpace from '../../reducer/name-space';
import FavoriteMovieList from "./favorite-movie-list.jsx";
import {Router} from 'react-router-dom';
import history from '../../history';
import {AuthorizationStatus} from "../../const";

const mockStore = configureStore([]);

describe(`MyList`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      favoriteMovies: Movies,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
      userData: {
        id: 1,
        email: `sadas@gmail.com`,
        name: `asdasd`,
        avatarUrl: `https://4.react.pages.academy/wtw/asda.jpg`,
      }
    }
  });

  it(`Should render correctly`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <FavoriteMovieList />
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
