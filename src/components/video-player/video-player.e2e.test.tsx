import * as React from "react";
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import VideoPlayer from './video-player';
import {emptyFunction} from "../../mock/testData";

const video = {
  poster: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

configure({
  adapter: new Adapter(),
});

it(`Start and Pause work correctly`, () => {
  const isPlaying = false;

  const videoPlayer = mount(
      <VideoPlayer
        poster={video.poster}
        previewVideo={video.previewVideo}
        isPlaying={isPlaying}
      />
  );

  expect(videoPlayer.props().isPlaying).toEqual(false);

  videoPlayer.setProps({isPlaying: true});
  expect(videoPlayer.props().isPlaying).toEqual(true);
});
