import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BigVideoPlayer from "./big-video-player";
import {Movies} from "../../mock/testData";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter()
});

const store = mockStore({
  playingMovie: Movies[0],
});

it(`Callback onPauseClick are working`, () => {
  const onPlayClick = jest.fn();

  const bigVideoPlayer = mount(
      <Provider store={store}>
        <BigVideoPlayer
          onExitClick={()=>{}}
          isPlaying={false}
          progress={0}
          timeLeft={`01:00:00`}
          onPlayClick={onPlayClick}
          onPauseClick={()=>{}}
          onFullScreenClick={()=>{}}
          isFullScreenMode={true}
        >
          <video />
        </BigVideoPlayer>
      </Provider>
  );

  bigVideoPlayer.find(`button.player__play`).simulate(`click`);
  expect(onPlayClick).toHaveBeenCalledTimes(1);
});
