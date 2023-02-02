import React from "react";
import Game from "./Game";
import {GamesStyled} from "../styled/Game/Games.styled";
import {IGame} from "../../model/games";

interface ILikedGamesProps {
  likedGames: IGame[];
}

const LikedGames = ({likedGames}: ILikedGamesProps) => {
  return <GamesStyled>{likedGames.map(likedGame => <Game key={likedGame.appId} {...likedGame}/>)}</GamesStyled>
};

export default LikedGames;