import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";

interface IGame {
  appId: string;
  title: string;
  imgUrl: string;
  released: string;
  price: string;
  url: string;
  reviewSummary: string;
  gameIsFull?: boolean;
  gameIsLiked?: boolean;
}

export interface GamesState {
  gamesLoaded: IGame[];
  gamesLoading: boolean;
  gamesError: null | string;
  gamesLiked: IGame[];
  singleSpecificGameLoaded: IGame | null;
}

const initialState: GamesState = {
  gamesLoaded: [],
  gamesLoading: false,
  gamesError: null,
  gamesLiked: [],
  singleSpecificGameLoaded: null,
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
      state.gamesLoaded = payload;
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
  },
});

export const {
  setGamesLoading,
  setGamesError,
  setGamesLoaded,
  setLikedGame,
  removeLikedGame,
  setLikedGames
} = gamesSlice.actions;

export default gamesSlice.reducer;

export const selectGamesLoaded = (state: RootState) => state.gamesReducer.gamesLoaded;
export const selectGamesLoading = (state: RootState) => state.gamesReducer.gamesLoading;
export const selectGamesError = (state: RootState) => state.gamesReducer.gamesError;
export const selectLikedGames = (state: RootState) => state.gamesReducer.gamesLiked;

/*
extraReducers: (builder) => {
    builder.addCase(fetchGamesByGameNameThunk.pending, (state, action) => {
      state.gamesLoading = true;
    }).addCase(fetchGamesByGameNameThunk.fulfilled, (state, action) => {
      state.gamesLoading = false;
      state.gamesLoaded = action.payload;
    }).addCase(fetchGamesByGameNameThunk.rejected, (state, action) => {
      state.gamesLoading = false;
      state.gamesError = action.payload as (string | null);
    })
  }
 */

/*export const fetchGamesByGameNameThunk = createAsyncThunk(
    "games/fetchGamesByGameNameThunk",
    async ({gameName}: { gameName: string }) => {
      try {
        const gamesByGameNameLoaded = await getGamesByGameName(gameName);
        return gamesByGameNameLoaded;
      } catch {
        return null;
      }
    });*/

/*export const fetchGamesByGameName = (gameName: string): AppThunk => {
  return async (dispatch) => {
    dispatch(setGamesLoading(true));
    try {
      const gamesByGameNameLoaded = await getGamesByGameName(gameName);
      dispatch(setGamesLoading(false));
      dispatch(setGamesLoaded(gamesByGameNameLoaded));
    } catch (error: any) {
      dispatch(setGamesError(error.message.toString()));
      dispatch(setGamesLoading(false));
    }
  };
};*/