import * as React from "react";
import * as renderer from 'react-test-renderer';
import {App} from "./app";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Movies, movie, genres, emptyFunction} from "../../mock/testData";
import {AuthorizationStatus, GenreNames} from "../../const";
import NameSpace from "../../reducer/name-space";

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movies: Movies,
      promoMovieCard: movie,
    },
    [NameSpace.STATES]: {
      activeGenre: GenreNames.ALL,
      showedMoviesCount: 8,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
      userData: {
        id: 1,
        email: `sadas@gmail.com`,
        name: `asdasd`,
        avatarUrl: `https://4.react.pages.academy/wtw/asda.jpg`,
      }
    },
    filteredMovies: Movies,
    genres,
    showedMoviesCount: 8,
    playingMovie: Movies[0],
    authorizationStatus: `NO_AUTH`,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            movies={Movies}
            filteredMovies={Movies}
            genres={genres}
            authorizationStatus={`NO_AUTH`}
            login={emptyFunction}
            isLoading={false}
            loadMovies={emptyFunction}
            isError={false}
          />
        </Provider>, {
          createNodeMock: ()=>{
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
