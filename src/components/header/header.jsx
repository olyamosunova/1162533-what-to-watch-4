import React from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../const";

const Header = (props) => {
  const {authorizationStatus, userData, onLoginClick} = props;

  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <a href="main.html" className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="user-block">
        {authorizationStatus === AuthorizationStatus.AUTH &&
        <div className="user-block__avatar">
          <img src={userData.avatarUrl} alt={userData.name} width="63" height="63"/>
        </div>}
        {authorizationStatus === AuthorizationStatus.NO_AUTH &&
        <a
          href="sign-in.html"
          className="user-block__link"
          onClick={onLoginClick}
        >
          Sign in
        </a>
        }
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

export default Header;
