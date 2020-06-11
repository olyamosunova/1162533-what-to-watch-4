import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const MovieDescription = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  RELEASE_DATE: `2014`,
};

ReactDOM.render(
    <App title={MovieDescription.TITLE}
      genre={MovieDescription.GENRE}
      releaseDate={MovieDescription.RELEASE_DATE} />,
    document.querySelector(`#root`)
);
