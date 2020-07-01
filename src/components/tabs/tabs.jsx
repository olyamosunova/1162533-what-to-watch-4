import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {TABS} from "../../const";

export default class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: `Overview`,
    };
  }

  _renderTab() {
    const {activeTab} = this.state;

    return TABS.map((tab, i) => (
      <li
        className={`movie-nav__item ${activeTab === tab ? `movie-nav__item--active` : ``}`}
        key={tab + i}
      >
        <a href="#" className="movie-nav__link">{tab}</a>
      </li>
    ));
  }

  render() {
    return (
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {this._renderTab()}
        </ul>
      </nav>
    );
  }
};

Tabs.propTypes = {};
