import React from "react";
import renderer from "react-test-renderer";
import PromoMovie from "./promo-movie";
import {movie, userData} from "../../mock/testData";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";
import {Router} from 'react-router-dom';
import history from '../../history';

const mockStore = configureStore([]);

it(`Should PromoMovie render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      promoMovieCard: movie,
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
      userData,
    },
  });

  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <PromoMovie
              onPlayClick={() => {}}
            />
          </Provider>
        </Router>, {
          createNodeMock: ()=>{
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
