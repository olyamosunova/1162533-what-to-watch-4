import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Main} from "./main.jsx";
import {indexMovie, Movies} from "../../mock/testData";
import {GenreNames} from "../../const";
import {getGenresList} from "../../utils";

const mockStore = configureStore([]);

const genres = getGenresList(Movies);

const store = mockStore({
  activeGenre: GenreNames.ALL,
  filteredMovies: Movies,
  genres,
});

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movie title be clicked`, () => {
  const onMovieClick = jest.fn();

  const main = shallow(
      <Provider store={store}>
        <Main
          activeGenre={GenreNames.ALL}
          indexMovie={indexMovie}
          filteredMovies={Movies}
          onMovieClick={onMovieClick}
          onClick={() => {}}
          genres={genres}
        />
      </Provider>
  );

  const cardTitles = main.find(`.small-movie-card__title`);

  cardTitles.forEach((title) => title.props().onClick());

  expect(onMovieClick.mock.calls.length).toBe(cardTitles.length);
});
