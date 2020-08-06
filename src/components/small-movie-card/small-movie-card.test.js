import React from "react";
import renderer from "react-test-renderer";
import {Router} from 'react-router-dom';
import history from '../../history';
import SmallMovieCard from "./small-movie-card";
import {movie} from "../../mock/testData";

it(`Should SmallMovieCard render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <SmallMovieCard
            movie={movie}
            isPlaying={false}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}} />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
