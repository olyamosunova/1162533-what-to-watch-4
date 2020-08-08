import * as React from "react";
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import history from '../../history';
import SmallMovieCard from "./small-movie-card";
import {movie, emptyFunction} from "../../mock/testData";

it(`Should SmallMovieCard render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <SmallMovieCard
            movie={movie}
            isPlaying={false}
            onMouseEnter={emptyFunction}
            onMouseLeave={emptyFunction} />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
