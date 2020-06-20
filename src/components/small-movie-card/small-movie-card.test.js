import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card";

const movie = {
  id: 1,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  poster: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

it(`Should SmallMovieCard render correctly`, () => {
  const tree = renderer
    .create(<SmallMovieCard
      movieInformation={movie}
      onMovieTitleClick={() => {}}
      onMovieHover={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
