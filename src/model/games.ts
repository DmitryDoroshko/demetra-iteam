export interface IGame {
  appId: string;
  title: string;
  imgUrl: string;
  released: string;
  price: string;
  url: string;
  reviewSummary: string;
  gameIsFull?: boolean;
  gameIsLiked?: boolean;
  description?: string;
  gameIsSpecific?: boolean;
  parsedPrice: number;
  parsedDateInMilliseconds: number;
}

export interface IGames {
  games: IGame[];
}