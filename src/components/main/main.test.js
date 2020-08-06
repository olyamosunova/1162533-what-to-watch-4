import React from "react";
import renderer from "react-test-renderer";
import {Main} from "./main.jsx";
import {genres, Movies, movie} from "../../mock/testData";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";
import {Router} from 'react-router-dom';
import history from '../../history';

const mockStore = configureStore([]);

it(`Should Main render correctly`, () => {
  const store = mockStore({
    [NameSpace.STATES]: {
      activeGenre: `All genres`,
      showedMoviesCount: 8,
    },
    [NameSpace.DATA]: {
      filteredMovies: Movies,
      genres,
      promoMovieCard: movie,
    },
    [NameSpace.USER]: {
      authorizationStatus: `NO_AUTH`,
      userData: {
        id: 1,
        email: `sadas@gmail.com`,
        name: `asdasd`,
        avatarUrl: `https://4.react.pages.academy/wtw/asda.jpg`,
      }
    },
  });

  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <Main
              activeGenre={`All genres`}
              genres={genres}
              filteredMovies={Movies}
              showedMoviesCount={8}
              onClick={() => {}}
              onShowMoreButtonClick={()=>{}}
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
