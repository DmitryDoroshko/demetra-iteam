import React, {useEffect, useMemo, useState} from "react";
import Game from "./Game";
import {GamesStyled} from "../styled/Game/Games.styled";
import Pagination from "../Pagination";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {
  selectGamesError,
  selectGamesLoaded,
  selectGamesLoading, setGamesError, setGamesLoaded, setGamesLoading,
  setOrderByWhichToSort, setValueOfSortGamesBy, sortLoadedGames
} from "../../store/games/gamesSlice";
import {GAMES_PAGE_SIZE} from "../../utils/constants";
import {useSearchParams} from "react-router-dom";
import {gamesApi} from "../../services/games.service";
import {getLikedGamesFromLocalStorage} from "../../utils/local-storage-helpers";
import {IGame} from "../../model/games";

const Games = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort");
  const order = searchParams.get("order");
  const gameQuery = searchParams.get("gameQuery");
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const gamesLoaded = useAppSelector(selectGamesLoaded);
  const gamesLoading = useAppSelector(selectGamesLoading);
  const gamesError = useAppSelector(selectGamesError);

  const [trigger] = gamesApi.useLazyGetGamesByGameNameQuery();

  const setIsGameLikedFlagForEachOfCorrespondingLoadedGames = (loadedGames: IGame[], likedGamesFromLocalStorage: IGame[]) => {
    dispatch(setGamesLoaded(loadedGames));
    dispatch(sortLoadedGames());

    const newLoadedGames = loadedGames.map(loadedGame => {
      let newLoadedGame = loadedGame;
      likedGamesFromLocalStorage.forEach(likedGame => {
        if (likedGame.appId === newLoadedGame.appId) {
          newLoadedGame = {...newLoadedGame, gameIsLiked: true};
        }
      });
      return newLoadedGame;
    });

    dispatch(setGamesLoaded(newLoadedGames));
    dispatch(sortLoadedGames());
  };

  useEffect(() => {
    const getGamesByGameQueryAndHandleTheRequestResults =  async () => {

      if (gameQuery === undefined) {
        return;
      }

      dispatch(setGamesLoading(true));
      const {data, error} = await trigger(gameQuery, false);

      if (data) {
        const likedGamesFromLocalStorage = getLikedGamesFromLocalStorage();
        setIsGameLikedFlagForEachOfCorrespondingLoadedGames(data, likedGamesFromLocalStorage);
        dispatch(setGamesLoading(false));
      } else if (error) {
        dispatch(setGamesError(error?.toString() || "Unknown Error"));
        dispatch(setGamesLoading(false));
      }
    };

    if (order === "lower-to-bigger" || order === "bigger-to-lower") {
      dispatch(setOrderByWhichToSort(order));
    }
    if (sort === "price" || sort === "released") {
      dispatch(setValueOfSortGamesBy(sort));
    }

    getGamesByGameQueryAndHandleTheRequestResults();
  }, [sort, order, gameQuery]);

  // Memoize the current page's games loaded array in order not to recompute it multiple times
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * GAMES_PAGE_SIZE;
    const lastPageIndex = firstPageIndex + GAMES_PAGE_SIZE;
    return gamesLoaded.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, gamesLoaded]);

  // If games have been loaded again, set the current page number to 1, otherwise ignore
  useEffect(() => {
    setCurrentPage(1);
  }, [gamesLoaded]);

  let gamesContent;

  if (currentTableData.length === 0 && !gamesLoading) {
    gamesContent = <h2 style={{textAlign: "center"}}>No games found, please search one.</h2>;
  }

  if (gamesLoading) {
    gamesContent = <h2 style={{textAlign: "center"}}>Loading...</h2>;
  }

  if (gamesError) {
    gamesContent = <h2 style={{textAlign: "center"}}>{gamesError}</h2>;
  }

  if (currentTableData.length > 0) {
    gamesContent = <GamesStyled>
      {currentTableData.map(game => {
        return <Game key={game.appId || game.title} appId={game.appId} imgUrl={game.imgUrl} url={game.url}
                     price={game.price}
                     title={game.title} released={game.released} reviewSummary={game.reviewSummary}
                     gameIsLiked={game.gameIsLiked} gameIsFull={game.gameIsFull} parsedPrice={game.parsedPrice}
                     parsedDateInMilliseconds={game.parsedDateInMilliseconds}/>;
      })}
    </GamesStyled>;
  }

  return (
      <>
        {gamesContent}
        <Pagination onPageChange={(page: number) => setCurrentPage(page)} totalCount={gamesLoaded.length}
                    currentPage={currentPage} pageSize={GAMES_PAGE_SIZE} className={"pagination-bar"}/>
      </>);
};

export default Games;