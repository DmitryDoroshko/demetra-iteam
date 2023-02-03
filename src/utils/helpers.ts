import moment from "moment";
import {IGame} from "../model/games";

// 11 Mar, 2019 => 1552255200000
export function parseDateToMillisecondsFromBeginning(date: string) {
  const resultValue = moment(date, "DD MMM, YYYY").toDate().getTime();

  // if parsed result value is NaN, let's give out the biggest result
  if (Number.isNaN(resultValue)) {
    return Infinity;
  }

  return resultValue;
}

// 12,34$ => 12.34
export function parsePrice(price: string) {
  if (price.toLowerCase().includes("free")) {
    return 0;
  }
  if (price.trim().length === 0) {
    return 0;
  }
  const imperialVersionOfPrice = price.split(",").join(".");
  return parseFloat(imperialVersionOfPrice);
}

export const sortLoadedGamesByPriceLowerToBigger = (gamesLoaded: IGame[]) => {
  const copyOfGamesLoaded = [...gamesLoaded];
  copyOfGamesLoaded.sort((game1, game2) => {
    if (game1.parsedPrice > game2.parsedPrice) {
      return 1;
    }
    if (game1.parsedPrice < game2.parsedPrice) {
      return -1;
    }
    return 0;
  });
  return copyOfGamesLoaded;
};

export const sortLoadedGamesByPriceBiggerToLower = (gamesLoaded: IGame[]) => {
  const copyOfGamesLoaded = [...gamesLoaded];
  copyOfGamesLoaded.sort((game1, game2) => {
    if (game1.parsedPrice > game2.parsedPrice) {
      return -1;
    }
    if (game1.parsedPrice < game2.parsedPrice) {
      return 1;
    }
    return 0;
  });
  return copyOfGamesLoaded;
};

export const sortLoadedGamesByReleasedLowerToBigger = (gamesLoaded: IGame[]) => {
  const copyOfGamesLoaded = [...gamesLoaded];

  copyOfGamesLoaded.sort((game1, game2) => {
    if (game1.parsedDateInMilliseconds > game2.parsedDateInMilliseconds) {
      return 1;
    }
    if (game1.parsedDateInMilliseconds < game2.parsedDateInMilliseconds) {
      return -1;
    }
    return 0;
  });

  return copyOfGamesLoaded;
};

export const sortLoadedGamesByReleasedBiggerToLower = (gamesLoaded: IGame[]) => {
  const copyOfGamesLoaded = [...gamesLoaded];

  copyOfGamesLoaded.sort((game1, game2) => {
    if (game1.parsedDateInMilliseconds > game2.parsedDateInMilliseconds) {
      return -1;
    }
    if (game1.parsedDateInMilliseconds < game2.parsedDateInMilliseconds) {
      return 1;
    }
    return 0;
  });

  return copyOfGamesLoaded;
};

