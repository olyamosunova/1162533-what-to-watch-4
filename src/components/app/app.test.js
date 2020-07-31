import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Movies, genres} from "../../mock/testData";
import {GenreNames} from "../../const";

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    activeGenre: GenreNames.ALL,
    filteredMovies: Movies,
    genres,
    activeMovie: -1,
    showedMoviesCount: 8,
    playingMovie: Movies[0],
    authorizationStatus: `NO_AUTH`,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            filteredMovies={Movies}
            genres={genres}
            activeMovie={-1}
            onMovieClick={() => {}}
            playingMovie={Movies[0]}
            authorizationStatus={`NO_AUTH`}
            login={() => {}}
          />
        </Provider>, {
          createNodeMock: ()=>{
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
