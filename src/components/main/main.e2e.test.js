import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Main} from "./main.jsx";
import {indexMovie, Movies} from "../../mock/testData";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movie title be clicked`, () => {
  const onMovieClick = jest.fn();

  const main = shallow(
      <Main
        indexMovie={indexMovie}
        movies={Movies}
        onMovieClick={onMovieClick}
      />
  );

  const cardTitles = main.find(`.small-movie-card__title`);

  cardTitles.forEach((title) => title.props().onClick());

  expect(onMovieClick.mock.calls.length).toBe(cardTitles.length);
});
