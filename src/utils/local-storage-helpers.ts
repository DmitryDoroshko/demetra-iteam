import {IGame} from "../model/games";
import {LOCAL_STORAGE_LIKED_GAMES_KEY} from "./constants";

export const getLikedGamesFromLocalStorage = () => {
  const likedGamesFromLocalStorage: IGame[] = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIKED_GAMES_KEY) || "[]");
  return likedGamesFromLocalStorage;
};

export const setLikedGamesToLocalStorage = (likedGames: IGame[]) => {
  const stringifiedLikedGames = JSON.stringify(likedGames);
  localStorage.setItem(LOCAL_STORAGE_LIKED_GAMES_KEY, stringifiedLikedGames);
};

export const addSingleLikedGameToLocalStorage = (singleLikedGame: IGame) => {
  const likedGamesFromLocalStorage = getLikedGamesFromLocalStorage();

  // if liked game already exists, return nothing
  if (likedGamesFromLocalStorage.find(game => game.appId === singleLikedGame.appId)) {
    return;
  }

  likedGamesFromLocalStorage.push(singleLikedGame);
  setLikedGamesToLocalStorage(likedGamesFromLocalStorage);
};

export const removeSingleGameFromLocalStorage = (gameToRemoveId: string) => {
  let likedGamesFromLocalStorage = getLikedGamesFromLocalStorage();
  likedGamesFromLocalStorage = likedGamesFromLocalStorage.filter(game => game.appId !== gameToRemoveId);
  setLikedGamesToLocalStorage(likedGamesFromLocalStorage);
};