import React from "react";
import PropTypes from "prop-types";
import {GenreNames} from "../../const";

const GenresList = (props) => {
  const genres = Object.values(GenreNames);

  function _renderGenres() {
    return genres.map((genre, i) => {
      return (
        <li
          className={`catalog__genres-item ${i === 0 ? `catalog__genres-item--active` : ``}`}
          key={genre}
        >
          <a
            href="#"
            className="catalog__genres-link"
          >
            {genre}
          </a>
        </li>
      );
    });
  }

  return (
    <ul className="catalog__genres-list">
      {_renderGenres()}
    </ul>
  );
};

GenresList.propTypes = {};

export default GenresList;
