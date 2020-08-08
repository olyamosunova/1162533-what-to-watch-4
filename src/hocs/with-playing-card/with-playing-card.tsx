import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  isPlaying: boolean;
}

interface InjectingProps {
  isPlaying: boolean;
  onMouseEnter(): void;
  onMouseLeave(): void;
}

const withPlayingCard = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithActiveItem extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false
      };

      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter() {
      this.setState({
        isPlaying: true
      });
    }

    handleMouseLeave() {
      this.setState({
        isPlaying: false
      });
    }

    render() {
      const {isPlaying} = this.state;

      return <Component
        {...this.props}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        isPlaying={isPlaying}
      />;
    }
  }

  return WithActiveItem;
};

export default withPlayingCard;
