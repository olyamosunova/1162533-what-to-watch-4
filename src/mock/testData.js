const genres = [`Drama`, `Comedy`, `Western`];

const movie = {
  promoMovie: {
    id: 1,
    title: `Macbeth`,
    poster: `macbeth.jpg`,
    cover: `macbeth.jpg`,
    genre: `Drama`,
    releaseDate: 2015,
    previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
  backgroundColor: ``,
  previewImage: ``,
  videoLink: ``,
  rating: 7.1,
  ratingLevel: `Very good`,
  ratingCount: 240,
  runTime: 120,
  description: ``,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Willem Dafoe`, `Saoirse Ronan`,
    `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`],
};

const Movies = [
  {
    promoMovie: {
      id: 1,
      title: `Fantastic Beasts: The Crimes of Grindelwald`,
      poster: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      cover: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      genre: `Fantasy`,
      releaseDate: 2018,
      previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    },
    backgroundColor: ``,
    previewImage: ``,
    videoLink: ``,
    rating: 6.6,
    ratingLevel: `Very good`,
    ratingCount: 240,
    runTime: 110,
    description: ``,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Willem Dafoe`, `Saoirse Ronan`,
      `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`],
  },
  {
    promoMovie: {
      id: 2,
      title: `Bohemian Rhapsody`,
      poster: `bohemian-rhapsody.jpg`,
      cover: `bohemian-rhapsody.jpg`,
      genre: `Music`,
      releaseDate: 2018,
      previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    },
    backgroundColor: ``,
    previewImage: ``,
    videoLink: ``,
    rating: 8.0,
    ratingLevel: `Very good`,
    ratingCount: 240,
    runTime: 110,
    description: ``,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Willem Dafoe`, `Saoirse Ronan`,
      `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`],
  },
  {
    promoMovie: {
      id: 3,
      title: `Macbeth`,
      poster: `macbeth.jpg`,
      cover: `macbeth.jpg`,
      genre: `Drama`,
      releaseDate: 2015,
      previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    },
    backgroundColor: ``,
    previewImage: ``,
    videoLink: ``,
    rating: 7.1,
    ratingLevel: `Very good`,
    ratingCount: 240,
    runTime: 110,
    description: ``,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Willem Dafoe`, `Saoirse Ronan`,
      `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`],
  },
  {
    promoMovie: {
      id: 4,
      title: `Aviator`,
      poster: `aviator.jpg`,
      cover: `aviator.jpg`,
      genre: `Drama`,
      releaseDate: 2014,
      previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    },
    backgroundColor: ``,
    previewImage: ``,
    videoLink: ``,
    rating: 7.6,
    ratingLevel: `Very good`,
    ratingCount: 240,
    runTime: 110,
    description: ``,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Willem Dafoe`, `Saoirse Ronan`,
      `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`],
  },
  {
    promoMovie: {
      id: 5,
      title: `We need to talk about Kevin`,
      poster: `we-need-to-talk-about-kevin.jpg`,
      cover: `we-need-to-talk-about-kevin.jpg`,
      genre: `Drama`,
      releaseDate: 2011,
      previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    },
    backgroundColor: ``,
    previewImage: ``,
    videoLink: ``,
    rating: 7.5,
    ratingLevel: `Very good`,
    ratingCount: 240,
    runTime: 110,
    description: ``,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Willem Dafoe`, `Saoirse Ronan`,
      `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`],
  },
  {
    promoMovie: {
      id: 6,
      title: `What We Do in the Shadows`,
      poster: `what-we-do-in-the-shadows.jpg`,
      cover: `what-we-do-in-the-shadows.jpg`,
      genre: `Comedy`,
      releaseDate: 2014,
      previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    },
    backgroundColor: ``,
    previewImage: ``,
    videoLink: ``,
    rating: 7.4,
    ratingLevel: `Very good`,
    ratingCount: 240,
    runTime: 110,
    description: ``,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Willem Dafoe`, `Saoirse Ronan`,
      `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`],
  },
  {
    promoMovie: {
      id: 7,
      title: `Revenant`,
      poster: `revenant.jpg`,
      cover: `revenant.jpg`,
      genre: `Vestern`,
      releaseDate: 2015,
      previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,

    },
    backgroundColor: ``,
    previewImage: ``,
    videoLink: ``,
    rating: 7.8,
    ratingLevel: `Very good`,
    ratingCount: 240,
    runTime: 110,
    description: ``,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Willem Dafoe`, `Saoirse Ronan`,
      `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`],
  },
  {
    promoMovie: {
      id: 8,
      title: `Johnny English`,
      poster: `johnny-english.jpg`,
      cover: `johnny-english.jpg`,
      genre: `Comedy`,
      releaseDate: 2003,
      previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    },
    backgroundColor: ``,
    previewImage: ``,
    videoLink: ``,
    rating: 6.2,
    ratingLevel: `Very good`,
    ratingCount: 240,
    runTime: 110,
    description: ``,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Willem Dafoe`, `Saoirse Ronan`,
      `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`],
  },
  {
    promoMovie: {
      id: 9,
      title: `Fantastic Beasts: The Crimes of Grindelwald`,
      poster: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      cover: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
      genre: `Fantasy`,
      releaseDate: 2018,
      previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    },
    backgroundColor: ``,
    previewImage: ``,
    videoLink: ``,
    rating: 6.6,
    ratingLevel: `Very good`,
    ratingCount: 240,
    runTime: 110,
    description: ``,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Willem Dafoe`, `Saoirse Ronan`,
      `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`],
  },
  {
    promoMovie: {
      id: 10,
      title: `Bohemian Rhapsody`,
      poster: `bohemian-rhapsody.jpg`,
      cover: `bohemian-rhapsody.jpg`,
      genre: `Music`,
      releaseDate: 2018,
      previewVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    },
    backgroundColor: ``,
    previewImage: ``,
    videoLink: ``,
    rating: 8.0,
    ratingLevel: `Very good`,
    ratingCount: 240,
    runTime: 110,
    description: ``,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Willem Dafoe`, `Saoirse Ronan`,
      `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`],
  },
];

const reviews = [{
  id: 1,
  message: ``,
  rating: 8.9,
  author: ``,
  date: ``,
}];

const userData = {
  id: 0,
  email: `vesan@mail.ru`,
  name: `Lola`,
  avatarUrl: ``,
};

export {movie, Movies, reviews, genres, userData};
