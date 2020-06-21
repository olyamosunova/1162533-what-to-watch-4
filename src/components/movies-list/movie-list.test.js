import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

const Movies = [
  {
    id: 1,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    poster: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  },
  {
    id: 2,
    title: `Bohemian Rhapsody`,
    poster: `bohemian-rhapsody.jpg`,
  },
  {
    id: 3,
    title: `Macbeth`,
    poster: `macbeth.jpg`,
  },
  {
    id: 4,
    title: `Aviator`,
    poster: `aviator.jpg`,
  },
  {
    id: 5,
    title: `We need to talk about Kevin`,
    poster: `we-need-to-talk-about-kevin.jpg`,
  },
  {
    id: 6,
    title: `What We Do in the Shadows`,
    poster: `what-we-do-in-the-shadows.jpg`,
  },
  {
    id: 7,
    title: `Revenant`,
    poster: `revenant.jpg`,
  },
  {
    id: 8,
    title: `Johnny English`,
    poster: `johnny-english.jpg`,
  },
];

it(`Should MoviesList render correctly`, () => {
  const tree = renderer
    .create(<MoviesList
      movies={Movies}
      onMovieTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
