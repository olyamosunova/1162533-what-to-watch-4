import * as React from "react";
import {Subtract} from "utility-types";
import history from "../../history";
import {MovieInterface} from "../../types";

interface State {
  isPlaying: boolean,
  progress: number,
  timeLeft: string,
}

interface InjectingProps {
  movie: MovieInterface;
}

const withPlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithPlayer extends React.PureComponent<T, State> {
    private videoRef: React.RefObject<HTMLVideoElement>;

    constructor(props) {
      super(props);

      this.videoRef = React.createRef();

      this.state = {
        isPlaying: true,
        progress: 0,
        timeLeft: `00:00:00`,
      };

      this.handlePlayClick = this.handlePlayClick.bind(this);
      this.handlePauseClick = this.handlePauseClick.bind(this);
      this.handleFullScreenClick = this.handleFullScreenClick.bind(this);
    }

    handlePlayClick() {
      this.setState({
        isPlaying: true
      });
    }

    handlePauseClick() {
      this.setState({
        isPlaying: false
      });
    }

    private handleFullScreenClick() {
      this.videoRef.current.requestFullscreen();
    }

    componentDidMount() {
      const video = this.videoRef.current;

      video.onloadedmetadata = () => {
        video.ontimeupdate = () =>
          this.setState({
            progress: (Math.floor(video.currentTime) * 100) / video.duration,
            timeLeft: this.secondsToTime(video.duration - video.currentTime),
          });
      };
    }

    componentWillUnmount() {
      const video = this.videoRef.current;
      video.onloadedmetadata = null;
      video.ontimeupdate = null;
    }

    componentDidUpdate() {
      const {isPlaying} = this.state;
      const video = this.videoRef.current;

      if (isPlaying && !video.ended) {
        video.play();
      } else {
        video.pause();
      }
    }

    secondsToTime(seconds) {
      const date = new Date(0);
      date.setSeconds(seconds);
      const timeString = date.toISOString().substr(11, 8);
      return timeString;
    }

    render() {
      const {isPlaying, progress, timeLeft} = this.state;
      const {movie} = this.props;
      const {videoLink, previewImage} = movie;

      return <Component
        {...this.props}
        isPlaying={isPlaying}
        progress={progress}
        timeLeft={timeLeft}
        onExitClick={() => history.goBack()}
        onPlayClick={this.handlePlayClick}
        onPauseClick={this.handlePauseClick}
        onFullScreenClick={this.handleFullScreenClick}
      >
        <video
          src={videoLink}
          className="player__video"
          poster={previewImage}
          autoPlay={true}
          loop={false}
          ref={this.videoRef}
        />
      </Component>;
    }
  }

  return WithPlayer;
};

export default withPlayer;
