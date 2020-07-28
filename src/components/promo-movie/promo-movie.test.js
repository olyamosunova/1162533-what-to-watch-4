import React from "react";
import renderer from "react-test-renderer";
import PromoMovie from "./promo-movie";
import {movie} from "../../mock/testData";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";

const mockStore = configureStore([]);

it(`Should PromoMovie render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      promoMovieCard: movie,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <PromoMovie
            onPlayClick={() => {}}
          />
        </Provider>, {
          createNodeMock: ()=>{
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
