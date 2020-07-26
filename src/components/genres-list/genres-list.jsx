import React from "react";
import PropTypes from "prop-types";

const GenresList = (props) => {
  const {genres, activeGenre, onClick} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.map((item) => {
        return <li
          key={item}
          className={`catalog__genres-item ${activeGenre === item ? `catalog__genres-item--active` : ``}`}
          onClick={()=>{
            onClick(item);
          }}
        >
          <a href="#" className="catalog__genres-link">{item}</a>
        </li>;
      })}
    </ul>
  );
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  activeGenre: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GenresList;
