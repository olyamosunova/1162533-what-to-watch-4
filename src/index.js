import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {MovieDescription, MOVIES_TITLES} from "./mock/movies";

ReactDOM.render(
    <App title={MovieDescription.TITLE}
      genre={MovieDescription.GENRE}
      releaseDate={MovieDescription.RELEASE_DATE}
      moviesTitles={MOVIES_TITLES} />,
    document.querySelector(`#root`)
);
