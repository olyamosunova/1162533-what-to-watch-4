import React from "react";
import renderer from "react-test-renderer";
import {MoviePage} from "./movie-page.jsx";
import {movie, Movies} from "../../mock/testData";

it(`Should MoviePage render correctly`, () => {
  const tree = renderer
    .create(<MoviePage
      movie={movie}
      movies={Movies}
      onMovieClick={() => {}}
      renderTabs={() => {}}
      activeTab={`Overview`}
    />, {
      createNodeMock: ()=>{
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
