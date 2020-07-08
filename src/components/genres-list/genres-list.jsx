import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "./../../reducer.js";


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
  activeGenre: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  activeGenre: state.activeGenre,
  genres: state.genres,
});

const mapDispatchToProps = (dispatch) => ({
  onClick(activeGenre) {
    dispatch(ActionCreator.changeGenre(activeGenre));
    dispatch(ActionCreator.filteredMovies(activeGenre));
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
