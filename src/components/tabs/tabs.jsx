import React from "react";

const Tabs = () => {
  return (
    <ul className="movie-nav__list">
      <li className="movie-nav__item">
        <a href="#" className="movie-nav__link">Overview</a>
      </li>
      <li className="movie-nav__item movie-nav__item--active">
        <a href="#" className="movie-nav__link">Details</a>
      </li>
      <li className="movie-nav__item">
        <a href="#" className="movie-nav__link">Reviews</a>
      </li>
    </ul>
  );
};

export default Tabs;
