import React from "react";
import renderer from "react-test-renderer";
import {Main} from "./main.jsx";
import {genres, Movies, movie} from "../../mock/testData";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";

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
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            activeGenre={`All genres`}
            genres={genres}
            filteredMovies={Movies}
            showedMoviesCount={8}
            onMovieClick={() => {}}
            onClick={() => {}}
            onShowMoreButtonClick={()=>{}}
          />
        </Provider>, {
          createNodeMock: ()=>{
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
