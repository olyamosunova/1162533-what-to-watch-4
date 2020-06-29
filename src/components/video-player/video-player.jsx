import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: props.isPlaying,
    };

    this._videoRef = createRef();
  }

  componentDidUpdate(prevProps) {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      video.muted = true;
      video.play();
    } else {
      video.pause();
    }

    if ((this.props.isPlaying === false) && (prevProps.isPlaying === true)) {
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
