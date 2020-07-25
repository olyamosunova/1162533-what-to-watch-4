import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {indexMovie} from "../../mock/testData";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Movies} from "../../mock/testData";
import {GenreNames} from "../../const";
import {getGenresList} from "../../utils";

const genres = getGenresList(Movies);

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    activeGenre: GenreNames.ALL,
    filteredMovies: Movies,
    genres,
    activeMovie: -1,
    showedMoviesCount: 8,
    playingMovie: Movies[0],
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            indexMovie={indexMovie}
            filteredMovies={Movies}
            genres={genres}
            activeMovie={-1}
            onMovieClick={() => {}}
            playingMovie={Movies[0]}
          />
        </Provider>, {
          createNodeMock: ()=>{
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
