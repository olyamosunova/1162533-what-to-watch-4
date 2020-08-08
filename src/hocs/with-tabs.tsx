import * as React from "react";
import {Subtract} from 'utility-types';
import Tabs from "../components/tabs/tabs";

interface InjectingProps {
  onTabClick(): void;
}

interface State {
  activeTab: string;
}

const withTabs = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithTabs extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: `Overview`,
      };
      this._tabClickHandler = this._tabClickHandler.bind(this);
    }
    _tabClickHandler(newActiveTab) {
      this.setState({
        activeTab: newActiveTab
      });
    }
    render() {
      const {activeTab} = this.state;
      return <Component
        activeTab={activeTab}
        {...this.props}
        renderTabs={() => {
          return (
            <Tabs
              activeTab={activeTab}
              onTabClick={this._tabClickHandler}
            />
          );
        }}
      />;
    }
  }

  return WithTabs;
};
export default withTabs;
