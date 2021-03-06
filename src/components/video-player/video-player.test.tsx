import * as React from "react";
import * as renderer from 'react-test-renderer';
import VideoPlayer from "./video-player";
import {movie} from "../../mock/testData";
const {promoMovie} = movie;
const {poster, previewVideo} = promoMovie;

it(`Should VideoPlayer render correctly`, () => {
  const tree = renderer
    .create(<VideoPlayer
      isPlaying={false}
      previewVideo={previewVideo}
      poster={poster}
    />, {
      createNodeMock: ()=>{
        return {};
      }
    })
    .toJSON();
  expect(tree).toMatchSnapshot();
});
