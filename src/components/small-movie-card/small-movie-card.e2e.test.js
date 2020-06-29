import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card";
import {movie} from "../../mock/testData";
const {promoMovie} = movie;

Enzyme.configure({
  adapter: new Adapter(),
});

it(`when user hover movie card`, () => {
  const onMovieHover = jest.fn();

  const smallMovieCard = shallow(
      <SmallMovieCard
        promoMovie={promoMovie}
        onMovieClick={() => {
        }}
        onMovieHover={onMovieHover}
      />
  );

  smallMovieCard.find(`.small-movie-card`).simulate(`mouseEnter`);

  expect(onMovieHover.mock.calls[0][0]).toBe(promoMovie.id);
});

it(`when user click title movie card`, () => {
  const onMovieClick = jest.fn();

  const smallMovieCard = shallow(
      <SmallMovieCard
        promoMovie={promoMovie}
        onMovieClick={onMovieClick}
        onMovieHover={() => {}}
      />
  );

  smallMovieCard.find(`.small-movie-card__link`).simulate(`click`);

  expect(onMovieClick.mock.calls[0][0]).toBe(promoMovie.id);
});
