import React, {useState} from "react";
import {IGame} from "../../model/games";
import {GameStyled} from "../styled/Game/Game.styled";
import {GameImageDivStyled} from "../styled/Game/GameImageDiv.styled";
import {GameInfoStyled, GameFullInfoStyled} from "../styled/Game/GameInfo.styled";
import {ImageStyled, PlayButtonImageStyled} from "../styled/Image.styled";
import iconHeartEmpty from "../../assets/icons/iconHeartEmpty.png";
import iconHeartFull from "../../assets/icons/iconHeartFull.png";
import playCircleIcon from "../../assets/icons/playCircleIcon.png";
import {removeLikedGame, setLikedGame} from "../../store/games/gamesSlice";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {addSingleLikedGameToLocalStorage, removeSingleGameFromLocalStorage} from "../../utils/local-storage-helpers";
import {Link} from "react-router-dom";

const Game = ({
                title,
                appId,
                url,
                imgUrl,
                price,
                reviewSummary,
                released,
                description,
                gameIsFull = false,
                gameIsLiked = false,
                gameIsSpecific = false,
              }: IGame) => {
  const [gameHasLike, setGameHasLike] = useState<boolean>(gameIsLiked);
  const dispatch = useAppDispatch();

  const toggleGameHasLike = () => {
    if (gameHasLike) {
      dispatch(removeLikedGame(appId));
      removeSingleGameFromLocalStorage(appId);
    } else {
      const likedGame: IGame = {
        title,
        appId,
        url,
        imgUrl,
        price,
        description,
        reviewSummary,
        released,
        gameIsFull: true,
        gameIsLiked: true
      };
      dispatch(setLikedGame(likedGame));
      addSingleLikedGameToLocalStorage(likedGame);
    }
    setGameHasLike(prev => !prev);
  };

  return (
      <GameStyled>
        <GameImageDivStyled>

          {gameIsSpecific && <ImageStyled src={imgUrl} objectFit={"contain"} maxWidth={"100%"}/>}
          {
              !gameIsSpecific && (
                  <Link to={`/games/${appId}`}>
                    <ImageStyled src={imgUrl} objectFit={"contain"} maxWidth={"100%"}/>
                  </Link>
              )
          }
        </GameImageDivStyled>
        {
            gameIsFull && (<GameFullInfoStyled>
              <div>{title}</div>
              <div>{released}</div>
              <div>{price}</div>
              <div>{reviewSummary}</div>
              <div>{description}</div>
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