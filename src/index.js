import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {IndexMovie, MoviesList} from "./mock/movies";

ReactDOM.render(
    <App
      indexMovie={IndexMovie}
      movies={MoviesList} />,
    document.querySelector(`#root`)
);
