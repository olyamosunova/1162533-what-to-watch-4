import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card";
import {movie} from "../../mock/testData";

it(`Should SmallMovieCard render correctly`, () => {
  const tree = renderer
    .create(<SmallMovieCard
      movie={movie}
      onMovieClick={() => {}}
      isPlaying={false}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
    />, {
      createNodeMock: ()=>{
        return {};
      }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
