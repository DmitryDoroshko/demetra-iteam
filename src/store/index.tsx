import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import gamesReducer, {GamesState} from "./games/gamesSlice";
import {setupListeners} from "@reduxjs/toolkit/query";
import {gamesApi} from "../services/games.service";

export const store = configureStore({
  reducer: {
    gamesReducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gamesApi.middleware),
});

setupListeners(store.dispatch);

export type AppThunk = ThunkAction<void, GamesState, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;