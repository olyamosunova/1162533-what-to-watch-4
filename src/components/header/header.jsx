import React from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus, CurrentPage} from "../../const";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import {getAuthorizationStatus, getUserData} from "../../reducer/user/selectors";
import {connect} from "react-redux";

const Header = (props) => {
  const {authorizationStatus, userData, currentPage} = props;

  const headerTitle = currentPage === CurrentPage.MY_LIST ? `user-page__head` : `movie-card__head`;

  return (
    <header className={`page-header ${headerTitle}`}>
      <div className="logo">
        {<Link
          className="logo__link"
          to={AppRoute.ROOT}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>}
      </div>

      {props.children}

      <div className="user-block">
        {authorizationStatus === AuthorizationStatus.AUTH &&
        <Link
          className="user-block__avatar"
          to={AppRoute.MY_LIST}
          style={{display: `block`}}>
          <img src={userData.avatarUrl} alt={userData.name} width="63" height="63"/>
        </Link>}
        {authorizationStatus === AuthorizationStatus.NO_AUTH &&
        <Link
          to={AppRoute.LOGIN}
          className="user-block__link">
          Sign in
        </Link>
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
  currentPage: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authorizationStatus: getAuthorizationStatus(state),
    userData: getUserData(state),
  };
};

export default connect(mapStateToProps)(Header);
