import * as React from 'react';
import {RouterProps} from 'react-router';
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {AuthorizationStatus} from "./../../reducer/user/user";
import {Route, Redirect} from "react-router-dom";
import {AppRoute} from "../../const";

interface Props {
  render: (historyProps: RouterProps) => React.ReactNode;
  path: string;
  exact: boolean;
  authorizationStatus: string;
}

const PrivateRoute: React.FC<Props> = ({
  authorizationStatus,
  exact,
  path,
  render
}: Props) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(historyProps) => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render(historyProps)
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(PrivateRoute);
