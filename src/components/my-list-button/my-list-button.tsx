import * as React from 'react';
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../const";
import {AppRoute} from "../../const";
import history from "../../history";

const REMOVE_FROM_MY_LIST = 0;
const ADD_TO_MY_LIST = 1;

interface Props {
  isFavorite: boolean,
  id: number,
  onMyListClick(id: number, status: number, isPromoMovie: boolean): void,
  isPromoMovie: boolean,
  authorizationStatus: string
}

class MyListButton extends React.PureComponent<Props, {}>{
  constructor(props) {
    super(props);

    this.handleMyListClick = this.handleMyListClick.bind(this);
  }

  handleMyListClick() {
    const {isFavorite, id, onMyListClick, isPromoMovie, authorizationStatus} = this.props;

    const status = isFavorite ? REMOVE_FROM_MY_LIST : ADD_TO_MY_LIST;

    return (authorizationStatus === AuthorizationStatus.AUTH
      ? onMyListClick(id, status, isPromoMovie)
      : history.push(AppRoute.LOGIN));
  }

  render() {
    const {isFavorite} = this.props;

    const myListIcon = isFavorite ?
      <svg viewBox="0 0 18 14" width="18" height="14"><use xlinkHref="#in-list"></use></svg> :
      <svg viewBox="0 0 19 20" width="19" height="20"><use xlinkHref="#add"/></svg>;

    return <button
      className="btn btn--list movie-card__button"
      type="button"
      onClick={this.handleMyListClick}
    >
      {myListIcon}
      <span>My list</span>
    </button>;
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(MyListButton);
