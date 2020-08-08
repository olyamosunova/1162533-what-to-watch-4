import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import BigVideoPlayer from "./big-video-player";
import {Movies, emptyFunction} from "../../mock/testData";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

configure({
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
          onExitClick={emptyFunction}
          isPlaying={false}
          progress={0}
          timeLeft={`01:00:00`}
          onPlayClick={onPlayClick}
          onPauseClick={emptyFunction}
          onFullScreenClick={emptyFunction}
        >
          <video />
        </BigVideoPlayer>
      </Provider>
  );

  bigVideoPlayer.find(`button.player__play`).simulate(`click`);
  expect(onPlayClick).toHaveBeenCalledTimes(1);
});
