import React, {PureComponent} from "react";

const withPlayingCard = (Component) => {
  class WithActiveItem extends PureComponent {
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
