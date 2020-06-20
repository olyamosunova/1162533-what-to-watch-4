import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {MovieDescription, MoviesList} from "./mock/movies";

ReactDOM.render(
    <App title={MovieDescription.TITLE}
      genre={MovieDescription.GENRE}
      releaseDate={MovieDescription.RELEASE_DATE}
      movies={MoviesList} />,
    document.querySelector(`#root`)
);
