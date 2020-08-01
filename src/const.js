export const TabsName = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

export const TABS = Object.values(TabsName);

export const GenreNames = {
  ALL: `All genres`,
  COMEDIES: `Comedies`,
  CRIME: `Crime`,
  DOCUMENTARY: `Documentary`,
  DRAMAS: `Dramas`,
  HORROR: `Horror`,
  KIDS_AND_FAMILY: `Kids & Family`,
  ROMANCE: `Romance`,
  SCI_FI: `Sci-Fi`,
  THRILLERS: `Thrillers`,
};

export const SCORE_NAME = {
  BAD: {
    name: `Bad`,
    min: 0,
    max: 3,
  },
  NORMAL: {
    name: `Normal`,
    min: 3,
    max: 5,
  },
  GOOD: {
    name: `Good`,
    min: 5,
    max: 8,
  },
  VERY_GOOD: {
    name: `Very good`,
    min: 8,
    max: 10,
  },
  AWESOME: {
    name: `Awesome`,
  },
};

export const AuthorizationStatus = {
  NO_AUTH: `NO_AUTH`,
  AUTH: `AUTH`,
};

export const CurrentPage = {
  MAIN: `MAIN`,
  DETAIL: `DETAIL`,
  LOGIN: `LOGIN`,
  PLAYER: `PLAYER`,
  ADD_REVIEW: `ADD_REVIEW`,
};

export const Review = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 400,
};

export const TEXTAREA_BACKGROUNDCOLOR = `rgba(0, 0, 0, 0.15)`;

export const reviewSubmitButton = {
  post: `Post`,
  sending: `Sending...`,
};
