import React from "react";
import renderer from "react-test-renderer";
import BigVideoPlayer from "./big-video-player";
import configureStore from "redux-mock-store";
import {GenreNames} from "../../const";
import {Movies, genres} from "../../mock/testData";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

it(`render BigVideoPlayer with video play`, () => {
  const store = mockStore({
    activeGenre: GenreNames.ALL,
    filteredMovies: Movies,
    genres,
    activeMovie: -1,
    showedMoviesCount: 8,
    playingMovie: Movies[0],
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <BigVideoPlayer
            onExitClick={()=>{}}
            isPlaying={true}
            progress={0}
            timeLeft={`01:00:00`}
            onPlayClick={()=>{}}
            onPauseClick={()=>{}}
            onFullScreenClick={()=>{}}
            isFullScreenMode={false}
          >
            <video />
          </BigVideoPlayer>
        </Provider>, {
          createNodeMock: ()=>{
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`render BigVideoPlayer with video pause`, () => {
  const store = mockStore({
    activeGenre: GenreNames.ALL,
    filteredMovies: Movies,
    genres,
    activeMovie: -1,
    showedMoviesCount: 8,
    playingMovie: Movies[0],
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <BigVideoPlayer
            onExitClick={()=>{}}
            isPlaying={false}
            progress={0}
            timeLeft={`01:00:00`}
            onPlayClick={()=>{}}
            onPauseClick={()=>{}}
            onFullScreenClick={()=>{}}
            isFullScreenMode={false}
          >
            <video />
          </BigVideoPlayer>
        </Provider>, {
          createNodeMock: ()=>{
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
