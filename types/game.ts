export type GameListProp = GameListItemProp[];

export type GameListItemProp = {
  id: number;
  name: string;
  created_at: number;
  updated_at: number;
  total_rating: number;
  total_rating_count: number;
  cover: string;
  genres: GameGenre[];
  themes: GameTheme[];
};

export type GameItemProp = {
  id: number;
  name: string;
  created_at: number;
  updated_at: number;
  total_rating: number;
  total_rating_count: number;
  summary: string;
  storyline: string;
  url: string;
  cover: string;
  artworks: string[];
  genres: GameGenre[];
  themes: GameTheme[];
  videos: GameVideo[];
  websites: GameWebsite[];
  platforms: GamePlatform[];
};

export type GameGenre = {
  id: number;
  name: string;
};

export type GameTheme = {
  id: number;
  name: string;
};

export type GameVideo = {
  name: string;
  video_id: string;
};

export type GameWebsite = {
  category: string;
  url: string;
};

export type GamePlatform = {
  name: string;
  logo: string;
};
