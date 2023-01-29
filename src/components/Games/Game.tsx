import React, {useState} from "react";
import {IGame} from "./Game.types";
import {GameStyled} from "../styled/Game/Game.styled";
import {GameImageDivStyled} from "../styled/Game/GameImageDiv.styled";
import {GameInfoStyled, GameFullInfoStyled} from "../styled/Game/GameInfo.styled";
import {ImageStyled, PlayButtonImageStyled} from "../styled/Image.styled";
import iconHeartEmpty from "../../assets/icons/iconHeartEmpty.png";
import iconHeartFull from "../../assets/icons/iconHeartFull.png";
import playCircleIcon from "../../assets/icons/playCircleIcon.png";

const Game = ({
                title,
                appId,
                url,
                imgUrl,
                price,
                reviewSummary,
                released,
                gameIsFull = false,
                gameIsLiked = false
              }: IGame) => {
  const [gameHasLike, setGameHasLike] = useState<boolean>(gameIsLiked);

  const toggleGameHasLike = () => {
    setGameHasLike(prev => !prev);
  };

  return (
      <GameStyled>
        <GameImageDivStyled>
          <ImageStyled src={imgUrl} objectFit={"contain"} maxWidth={"100%"}/>
        </GameImageDivStyled>
        {
            gameIsFull && (<GameFullInfoStyled>
              <div>{title}</div>
              <div>{released}</div>
              <div>{price}</div>
              <div>{reviewSummary}</div>
              <a href={url}>Game link</a>
              {!gameHasLike && <button onClick={toggleGameHasLike}><ImageStyled src={iconHeartEmpty}/></button>}
              {gameHasLike && <button onClick={toggleGameHasLike}><ImageStyled src={iconHeartFull}/></button>}
              {gameHasLike && <PlayButtonImageStyled src={playCircleIcon}/>}
            </GameFullInfoStyled>)
        }
        {
            !gameIsFull && (<GameInfoStyled>
              <div>{title}</div>
              <div>{released}</div>
              <div>{price}</div>
              {!gameHasLike && <button onClick={toggleGameHasLike}><ImageStyled src={iconHeartEmpty}/></button>}
              {gameHasLike && <button onClick={toggleGameHasLike}><ImageStyled src={iconHeartFull}/></button>}
              {gameHasLike && <PlayButtonImageStyled src={playCircleIcon}/>}
            </GameInfoStyled>)
        }

      </GameStyled>
  );
};

export default Game;