import React from "react";
import PropTypes from "prop-types";
import {TABS} from "../../const";

const Tabs = (props) => {
  const _renderTab = () => {
    const {activeTab, onTabClick} = props;

    return TABS.map((tab, i) => (
      <li
        className={`movie-nav__item ${activeTab === tab ? `movie-nav__item--active` : ``}`}
        key={tab + i}
        onClick={() => onTabClick(tab)}
      >
        <a href="#" className="movie-nav__link">{tab}</a>
      </li>
    ));
  };

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {_renderTab()}
      </ul>
    </nav>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired
};

export default Tabs;
