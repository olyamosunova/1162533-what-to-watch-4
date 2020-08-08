import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app";
import reducer from "./reducer/reducer";
import thunk from "redux-thunk";
import {createAPI} from "./api/api";
import {composeWithDevTools} from "redux-devtools-extension";
import {Operations} from "./reducer/data/data";
import {Operations as UserOperations} from "./reducer/user/user";
import {ActionCreator} from "./reducer/user/user";
import {AuthorizationStatus} from "./const";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    ));

store.dispatch(Operations.loadPromoMovieCard());
store.dispatch(Operations.loadMovies());
store.dispatch(UserOperations.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
