import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VideoPlayer from './video-player.jsx';

const video = {
  poster: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`The component has a playback state`, () => {
  const expectedState = {isPlaying: true};

  const videoPlayer = mount(
      <VideoPlayer
        poster={video.poster}
        previewVideo={video.previewVideo}
        isPlaying={true}
      />
  );
  const state = videoPlayer.state();
  expect(state).toMatchObject(expectedState);
});

it(`The component has a pause state`, () => {
  const expectedState = {isPlaying: false};

  const videoPlayer = mount(
      <VideoPlayer
        poster={video.poster}
        previewVideo={video.previewVideo}
        isPlaying={false}
      />
  );

  const state = videoPlayer.state();

  expect(state).toMatchObject(expectedState);
});
