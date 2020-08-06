import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import history from "../../history";

const withPlayer = (Component) =>{
  class WithPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = React.createRef();

      this.state = {
        isPlaying: true,
        progress: 0,
        timeLeft: `00:00:00`,
        isFullScreenMode: false,
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

    handleFullScreenClick() {
      this.setState((prevState)=>({
        isFullScreenMode: !prevState.isFullScreenMode,
      }));
    }

    componentDidMount() {
      const video = this._videoRef.current;

      video.onloadedmetadata = () => {
        video.ontimeupdate = () =>
          this.setState({
            progress: (Math.floor(video.currentTime) * 100) / video.duration,
            timeLeft: this.secondsToTime(video.duration - video.currentTime),
          });
      };
    }

    componentWillUnmount() {
      const video = this._videoRef.current;
      video.onloadedmetadata = null;
      video.ontimeupdate = null;
    }

    componentDidUpdate() {
      const {isPlaying} = this.state;
      const video = this._videoRef.current;

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
      const {isPlaying, progress, timeLeft, isFullScreenMode} = this.state;
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
        isFullScreenMode={isFullScreenMode}
      >
        <video
          src={videoLink}
          className="player__video"
          poster={previewImage}
          autoPlay={true}
          loop={false}
          ref={this._videoRef}
        />
      </Component>;
    }
  }

  WithPlayer.propTypes = {
    movie: PropTypes.shape({
      promoMovie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        releaseDate: PropTypes.number.isRequired,
        poster: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        previewVideo: PropTypes.string.isRequired,
      }),
      previewImage: PropTypes.string.isRequired,
      videoLink: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      ratingLevel: PropTypes.string.isRequired,
      ratingCount: PropTypes.number.isRequired,
      runTime: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      starring: PropTypes.array.isRequired,
    }).isRequired,
  };

  return WithPlayer;
};

export default withPlayer;
