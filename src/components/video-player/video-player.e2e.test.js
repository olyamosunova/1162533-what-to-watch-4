import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VideoPlayer from './video-player';

const video = {
  poster: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`The component has a playback state`, () => {
  window.HTMLMediaElement.prototype.load = () => {};

  const videoPlayer = mount(
      <VideoPlayer
        poster={video.poster}
        previewVideo={video.previewVideo}
        isPlaying={true}
      />
  );
  const {_videoRef} = videoPlayer.instance();
  jest.spyOn(_videoRef.current, `load`);
  videoPlayer.instance().componentDidMount();

  videoPlayer.setProps({isPlaying: false});
  expect(_videoRef.current.load).toHaveBeenCalledTimes(1);
});

it(`The component has a pause state`, () => {
  const videoPlayer = mount(
      <VideoPlayer
        poster={video.poster}
        previewVideo={video.previewVideo}
        isPlaying={false}
      />
  );

  jest.spyOn(videoPlayer.instance(), `onPlay`);
  videoPlayer.instance().componentDidMount();

  videoPlayer.setProps({isPlaying: true});
  expect(videoPlayer.instance().onPlay).toHaveBeenCalledTimes(1);
});
