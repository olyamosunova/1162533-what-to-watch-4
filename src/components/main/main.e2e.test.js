import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";
import {MovieDescription, MOVIES_TITLES} from "../../mock/movies";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should movie title be clicked`, () => {
  const onMovieTitleClick = jest.fn();

  const main = shallow(
      <Main
        title={MovieDescription.TITLE}
        genre={MovieDescription.GENRE}
        releaseDate={MovieDescription.RELEASE_DATE}
        moviesTitles={MOVIES_TITLES}
        onMovieTitleClick={onMovieTitleClick}
      />
  );

  const cardTitles = main.find(`.small-movie-card__title`);

  cardTitles.forEach((title) => title.props().onClick());

  expect(onMovieTitleClick.mock.calls.length).toBe(cardTitles.length);
});
