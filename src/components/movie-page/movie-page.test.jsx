import React from "react";
import renderer from "react-test-renderer";
import {MoviePage} from "./movie-page.jsx";
import {movie, Movies, userData} from "../../mock/testData";
import {Router} from 'react-router-dom';
import history from '../../history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from "../../reducer/name-space";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    movies: Movies,
  },
  [NameSpace.USER]: {
    authorizationStatus: `AUTH`,
    userData: {
      id: 1,
      email: `sadas@gmail.com`,
      name: `asdasd`,
      avatarUrl: `https://4.react.pages.academy/wtw/asda.jpg`,
    }
  },
});

it(`Should MoviePage render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <MoviePage
              movie={movie}
              movies={Movies}
              onMovieClick={() => {}}
              renderTabs={() => {}}
              activeTab={`Overview`}
              authorizationStatus={`NO_AUTH`}
              userData={userData}
              onLoginClick={() => {}}
              isSignedIn={true}
              onAddReviewClick={() => {}}
              onMyListClick={() => {}}
              loadMovie={() => {}}
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
