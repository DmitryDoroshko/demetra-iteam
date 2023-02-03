import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";
import {
  parseDateToMillisecondsFromBeginning,
  parsePrice, sortLoadedGamesByPriceBiggerToLower,
  sortLoadedGamesByPriceLowerToBigger, sortLoadedGamesByReleasedBiggerToLower, sortLoadedGamesByReleasedLowerToBigger
} from "../../utils/helpers";
import {IGame} from "../../model/games";

/*
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
  parsedPrice?: number;
  parsedDateInMilliseconds?: number;
}
*/

export interface GamesState {
  gamesLoaded: IGame[];
  gamesLoading: boolean;
  gamesError: null | string;
  gamesLiked: IGame[];
  singleSpecificGameLoaded: IGame | null;
  orderByWhichToSort: "lower-to-bigger" | "bigger-to-lower";
  valueOfSortGamesBy: "price" | "released";
}

const initialState: GamesState = {
  gamesLoaded: [],
  gamesLoading: false,
  gamesError: null,
  gamesLiked: [],
  singleSpecificGameLoaded: null,
  orderByWhichToSort: "lower-to-bigger",
  valueOfSortGamesBy: "price",
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGamesLoading: (state, {payload}: PayloadAction<boolean>) => {
      state.gamesLoading = payload;
    },
    setGamesError: (state, {payload}: PayloadAction<string>) => {
      state.gamesError = payload;
    },
    setGamesLoaded: (state, {payload}: PayloadAction<IGame[]>) => {
      const gamesLoadedParsedForPriceAndReleasedDate = payload.map(game => {
        const parsedPrice = parsePrice(game.price);
        const parsedDateInMilliseconds = parseDateToMillisecondsFromBeginning(game.released);
        return {...game, parsedPrice, parsedDateInMilliseconds};
      });
      state.gamesLoaded = gamesLoadedParsedForPriceAndReleasedDate;
    },
    setLikedGame: (state, {payload}: PayloadAction<IGame>) => {
      const gameAlreadyInLikedList = state.gamesLiked.find(game => game.appId === payload.appId);
      if (!gameAlreadyInLikedList) {
        state.gamesLiked.push(payload);
        state.gamesLoaded = state.gamesLoaded.map(gameLoaded => {
          if (gameLoaded.appId === payload.appId) {
            return {...gameLoaded, gameIsLiked: true};
          }
          return gameLoaded;
        });
      }
    },
    removeLikedGame: (state, {payload}: PayloadAction<string>) => {
      state.gamesLiked = state.gamesLiked.filter(game => game.appId !== payload);
      state.gamesLoaded = state.gamesLoaded.map(gameLoaded => {
        if (gameLoaded.appId === payload) {
          return {...gameLoaded, gameIsLiked: false};
        }
        return gameLoaded;
      });
    },
    setLikedGames: (state, {payload}: PayloadAction<IGame[]>) => {
      state.gamesLiked = payload;
    },
    setOrderByWhichToSort: (state, {payload}: PayloadAction<"lower-to-bigger" | "bigger-to-lower">) => {
      state.orderByWhichToSort = payload;
    },
    setValueOfSortGamesBy: (state, {payload}: PayloadAction<"price" | "released">) => {
      state.valueOfSortGamesBy = payload;
    },
    sortLoadedGames: (state) => {
      if (
          state.valueOfSortGamesBy === "price"
          && state.orderByWhichToSort === "lower-to-bigger"
      ) {
        state.gamesLoaded = sortLoadedGamesByPriceLowerToBigger(state.gamesLoaded);
      } else if (
          state.valueOfSortGamesBy === "price"
          && state.orderByWhichToSort === "bigger-to-lower"
      ) {
        state.gamesLoaded = sortLoadedGamesByPriceBiggerToLower(state.gamesLoaded);
      } else if (
          state.valueOfSortGamesBy === "released"
          && state.orderByWhichToSort === "lower-to-bigger"
      ) {
        state.gamesLoaded = sortLoadedGamesByReleasedLowerToBigger(state.gamesLoaded);
      } else if (
          state.valueOfSortGamesBy === "released"
          && state.orderByWhichToSort === "bigger-to-lower"
      ) {
        state.gamesLoaded = sortLoadedGamesByReleasedBiggerToLower(state.gamesLoaded);
      }
    },
  },
});

export const {
  setGamesLoading,
  setGamesError,
  setGamesLoaded,
  setLikedGame,
  removeLikedGame,
  setLikedGames,
  setOrderByWhichToSort,
  setValueOfSortGamesBy,
  sortLoadedGames
} = gamesSlice.actions;

export default gamesSlice.reducer;

export const selectGamesLoaded = (state: RootState) => state.gamesReducer.gamesLoaded;
export const selectGamesLoading = (state: RootState) => state.gamesReducer.gamesLoading;
export const selectGamesError = (state: RootState) => state.gamesReducer.gamesError;
export const selectLikedGames = (state: RootState) => state.gamesReducer.gamesLiked;