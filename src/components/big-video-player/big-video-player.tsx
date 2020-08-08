import * as React from 'react';

interface Props {
  children: React.ReactNode,
  progress: number,
  timeLeft: string,
  isPlaying: boolean,
  onExitClick(): void,
  onPlayClick(): void,
  onPauseClick(): void,
  onFullScreenClick(): void,
}

const MoviePlayer: React.FC<Props> = ({
  children,
  progress,
  timeLeft,
  isPlaying,
  onExitClick,
  onPlayClick,
  onPauseClick,
  onFullScreenClick,
}: Props) => {
  return (
    <div
      className="player"
    >
      {children}

      <button
        type="button"
        className="player__exit"
        onClick={onExitClick}
      >
        Exit
      </button>

      <div
        className="player__controls"
      >
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{timeLeft}</div>
        </div>

        <div className="player__controls-row">
          {isPlaying === false &&
          <button
            type="button"
            className="player__play"
            onClick={onPlayClick}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          }

          {isPlaying === true &&
          <button
            type="button"
            className="player__play"
            onClick={onPauseClick}
          >
            <svg viewBox="0 0 14 21" width="14" height="21">
              <use xlinkHref="#pause"></use>
            </svg>
            <span>Pause</span>
          </button>
          }

          <div className="player__name">Transpotting</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={onFullScreenClick}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>

    </div>);
};

export default MoviePlayer;
