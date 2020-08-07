import React, {PureComponent} from 'react';
import Tabs from "../components/tabs/tabs.js";

const withTabs = (Component) => {
  class WithTabs extends PureComponent {
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

  WithTabs.propTypes = {};

  return WithTabs;
};
export default withTabs;
