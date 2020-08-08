import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {AuthorizationStatus, CurrentPage, AppRoute} from "../../const";
import {getAuthorizationStatus, getUserData} from "../../reducer/user/selectors";
import {UserDataInterface} from "../../types";

interface Props {
  authorizationStatus: string,
  userData: UserDataInterface,
  currentPage: string,
  children?: React.ReactNode,
}

const Header: React.FC<Props> = (props: Props) => {
  const {authorizationStatus, userData, currentPage} = props;

  const headerTitle = (currentPage === CurrentPage.MY_LIST || currentPage === CurrentPage.LOGIN) ? `user-page__head` : `movie-card__head`;

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

      {currentPage !== CurrentPage.LOGIN ?
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
        :
        ``
      }

    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    authorizationStatus: getAuthorizationStatus(state),
    userData: getUserData(state),
  };
};

export default connect(mapStateToProps)(Header);
