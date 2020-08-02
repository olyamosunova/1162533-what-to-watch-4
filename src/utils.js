import {SCORE_NAME} from "./const";
import moment from "moment";
import momentDurationFormatSetup from 'moment-duration-format';
momentDurationFormatSetup(moment);

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getScore = (rating) => {
  if (rating >= SCORE_NAME.BAD.min && rating < SCORE_NAME.BAD.max) {
    return SCORE_NAME.BAD.name;
  } else if (rating >= SCORE_NAME.NORMAL.min && rating < SCORE_NAME.NORMAL.max) {
    return SCORE_NAME.NORMAL.name;
  } else if (rating >= SCORE_NAME.GOOD.min && rating < SCORE_NAME.GOOD.max) {
    return SCORE_NAME.GOOD.name;
  } else if (rating >= SCORE_NAME.VERY_GOOD.min && rating < SCORE_NAME.VERY_GOOD.max) {
    return SCORE_NAME.VERY_GOOD.name;
  } else {
    return SCORE_NAME.AWESOME.name;
  }
};

export const formatDateTime = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

export const formatReviewDate = (date) => {
  return moment(date).format(`MMMM DD YYYY`);
};

export const formatMovieDuration = (duration) => {
  return moment.duration(duration, `minutes`).format(`h[h] m[m]`);
};

export const getMovieById = (movies, id) => {
  return movies.find(({promoMovie}) => promoMovie.id === Number(id));
};

