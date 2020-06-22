import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {PromoMovie, MoviesList, MovieDescriptions} from "./mock/movies";

ReactDOM.render(
    <App
      promoMovie={PromoMovie}
      movieDescription={MovieDescriptions}
      movies={MoviesList} />,
    document.querySelector(`#root`)
);
