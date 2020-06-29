import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player";
import {movie} from "../../mock/testData";
const {poster, previewVideo} = movie;

it(`Should VideoPlayer render correctly`, () => {
  const tree = renderer
    .create(<VideoPlayer
      isPlaying={false}
      previewVideo={previewVideo}
      poster={poster}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
