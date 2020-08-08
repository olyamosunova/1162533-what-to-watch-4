export interface MovieInterface {
  promoMovie: {
    id: number,
    title: string,
    genre: string,
    releaseDate: number,
    poster: string,
    cover: string,
    previewVideo: string,
  },
  backgroundColor: string,
  previewImage: string,
  videoLink: string,
  rating: number,
  ratingLevel: string,
  ratingCount: number,
  runTime: number,
  description: string,
  director: string,
  starring: string[],
  isFavorite: boolean,
}

export interface UserDataInterface {
  id: number;
  email: string;
  name: string;
  avatarUrl: string;
}

export interface ReviewInterface {
  id: number,
  message: string,
  rating: number,
  author: string,
  date: string,
}
