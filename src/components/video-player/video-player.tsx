import * as React from 'react';

interface Props {
  isPlaying: boolean;
  previewVideo: string;
  poster: string;
}

class VideoPlayer extends React.PureComponent<Props, {} > {
  private videoRef: React.RefObject<HTMLVideoElement>;
  private videoTimer: NodeJS.Timeout;

  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const video = this.videoRef.current;
    video.muted = true;
  }

  onPlay() {
    const video = this.videoRef.current;

    const videoPlay = () => {
      video.play();
    };

    this.videoTimer = setTimeout(videoPlay, 1000);
  }

  componentDidUpdate() {
    const video = this.videoRef.current;

    if (this.props.isPlaying) {
      this.onPlay();
    } else {
      clearTimeout(this.videoTimer);
      video.load();
    }
  }

  render() {
    const {previewVideo, poster} = this.props;

    return (
      <video
        poster={poster}
        ref={this.videoRef}
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

export default VideoPlayer;
