import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const PromoMovie = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_DATE: 2014,
  POSTER: `the-grand-budapest-hotel-poster.jpg`,
  COVER: `bg-the-grand-budapest-hotel.jpg`,
};

const MoviesList = [
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

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      promoMovie={PromoMovie}
      movies={MoviesList}
      onMovieClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
