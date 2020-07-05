import React from "react";
import PropTypes from "prop-types";
import {GenreNames} from "../../const";
import {connect} from "react-redux";
import {ActionCreator} from "./../../reducer.js";

const GenresList = (props) => {
  const {activeGenre, onClick} = props;
  const genres = Object.values(GenreNames);

  function _renderGenres() {
    return genres.map(({single, multiple}) => {
      return (
        <li
          className={`catalog__genres-item ${multiple === activeGenre ? `catalog__genres-item--active` : ``}`}
          key={multiple}
          onClick={()=>{
            onClick(single);
          }}
        >
          <a href="#" className="catalog__genres-link">{multiple}</a>
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

GenresList.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeGenre: state.activeGenre,
});

const mapDispatchToProps = (dispatch) => ({
  onClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.filteredFilms());
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
