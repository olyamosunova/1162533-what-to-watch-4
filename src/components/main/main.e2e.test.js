import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Main} from "./main.jsx";
import {Movies, genres} from "../../mock/testData";
import {GenreNames} from "../../const";

const mockStore = configureStore([]);

const store = mockStore({
  activeGenre: GenreNames.ALL,
  filteredMovies: Movies,
  genres,
  showedMoviesCount: 8,
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
          filteredMovies={Movies}
          onMovieClick={onMovieClick}
          onClick={() => {}}
          genres={genres}
          showedMoviesCount={8}
          onShowMoreButtonClick={()=>{}}
        />
      </Provider>
  );

  const cardTitles = main.find(`.small-movie-card__title`);

  cardTitles.forEach((title) => title.props().onClick());

  expect(onMovieClick.mock.calls.length).toBe(cardTitles.length);
});
