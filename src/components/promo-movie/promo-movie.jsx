import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
// import {getMovies} from "../../reducer/data/selectors";
import {ActionCreator} from "../../reducer/states/states";

const PromoMovie = (props) => {
  const movie = {
    promoMovie: {
      id: 1,
      title: `Fantastic Beasts: The Crimes of Grindelwald`,
      poster: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      cover: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      genre: `Fantasy`,
      releaseDate: 2018,
      previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    },
    rating: 6.6,
    ratingLevel: `Very good`,
    ratingCount: 240,
    runTime: `1h 39m`,
    description: [
      `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    ],
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Willem Dafoe`, `Saoirse Ronan`,
      `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`],
    reviews: [
      {
        id: 1,
        message: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
        rating: 8.9,
        author: `Kate Muir`,
        date: `December 24, 2016`,
      },
      {
        id: 2,
        message: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
        rating: 8.0,
        author: `Bill Goodykoontz`,
        date: `November 18, 2015`,
      },
      {
        id: 3,
        message: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
        rating: 8.0,
        author: `Amanda Greever`,
        date: `November 18, 2015`,
      },
      {
        id: 4,
        message: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
        rating: 7.2,
        author: `Matthew Lickona`,
        date: `December 20, 2016`,
      },
      {
        id: 5,
        message: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
        rating: 7.6,
        author: `Paula Fleri-Soler`,
        date: `December 20, 2016`,
      },
      {
        id: 6,
        message: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
        rating: 7.6,
        author: `Paula Fleri-Soler`,
        date: `December 20, 2016`,
      },
    ],
  };
  const {onPlayClick} = props;
  const {promoMovie} = movie;
  const {title, genre, releaseDate, cover, poster} = promoMovie;
  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={cover} alt="The Grand Budapest Hotel"/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="user-block">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
          </div>
        </div>
      </header>

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={`img/${poster}`} alt={title} width="218" height="327"/>
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{releaseDate}</span>
            </p>

            <div className="movie-card__buttons">
              <button
                className="btn btn--play movie-card__button"
                type="button"
                onClick={() => {
                  onPlayClick(movie);
                }}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

PromoMovie.propTypes = {
  movie: PropTypes.shape({
    promoMovie: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      releaseDate: PropTypes.number.isRequired,
      poster: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      previewVideo: PropTypes.string.isRequired,
    }),
    rating: PropTypes.number.isRequired,
    ratingLevel: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    runTime: PropTypes.string.isRequired,
    description: PropTypes.array.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.array.isRequired,
  }),
  onPlayClick: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   movie: getMovies(state)[0],
// });

const mapDispatchToProps = (dispatch) => ({
  onPlayClick(movie) {
    dispatch(ActionCreator.chooseMovieToWatch(movie));
  }
});

export {PromoMovie};
export default connect(null, mapDispatchToProps)(PromoMovie);
