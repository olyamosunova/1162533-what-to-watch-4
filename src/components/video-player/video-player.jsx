import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
  }

  componentDidMount() {
    const video = this._videoRef.current;
    video.muted = true;
  }

  onPlay() {
    const video = this._videoRef.current;

    const videoPlay = () => {
      video.play();
    };

    this._videoTimer = setTimeout(videoPlay, 1000);
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      this.onPlay();
    } else {
      clearTimeout(this._videoTimer);
      video.load();
    }
  }

  render() {
    const {previewVideo, poster} = this.props;

    return (
      <video
        poster={`img/${poster}`}
        ref={this._videoRef}
        width={`100%`}
        height={`100%`}
      >
        <source
          src={previewVideo}
        />
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  previewVideo: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

export default VideoPlayer;
