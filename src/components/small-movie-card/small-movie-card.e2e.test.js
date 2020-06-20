import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card";

const movie = {
  id: 1,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  poster: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`when user hover movie card`, () => {
  const onMovieHover = jest.fn();

  const smallMovieCard = shallow(
      <SmallMovieCard
        movieInformation={movie}
        onMovieTitleClick={() => {
        }}
        onMovieHover={onMovieHover}
      />
  );

  smallMovieCard.find(`.small-movie-card`).simulate(`mouseEnter`);

  expect(onMovieHover).toHaveBeenCalledTimes(1);
  expect(onMovieHover.mock.calls.length).toBe(movie.id);
});
