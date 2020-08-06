import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review.jsx";
import {movie} from "../../mock/testData";
import {Provider} from 'react-redux';
import history from '../../history';
import {Router} from 'react-router-dom';
import NameSpace from "../../reducer/name-space";
import configureStore from 'redux-mock-store';
import {AuthorizationStatus} from "../../const";

const mockStore = configureStore([]);

const store = mockStore({
  movie,
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
    userData: {
      id: 1,
      email: `sadas@gmail.com`,
      name: `asdasd`,
      avatarUrl: `https://4.react.pages.academy/wtw/asda.jpg`,
    }
  },
});

it(`render AddReview`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <AddReview
              movie={movie}
              isReviewPosting={false}
              onSubmitClick={() => {}}
              onFormChange={() => {}}
              onRatingChange={() => {}}
              onReviewChange={() => {}}
              isSubmitDisabled={true}
              isReviewLengthError={false}
              isError={false}
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
