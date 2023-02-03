import React, {useEffect, useMemo, useState} from "react";
import Game from "./Game";
import {GamesStyled} from "../styled/Game/Games.styled";
import Pagination from "../Pagination";
import {useAppSelector} from "../../hooks/redux-hooks";
import {selectGamesError, selectGamesLoaded, selectGamesLoading} from "../../store/games/gamesSlice";
import {GAMES_PAGE_SIZE} from "../../utils/constants";

const Games = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const gamesLoaded = useAppSelector(selectGamesLoaded);
  const gamesLoading = useAppSelector(selectGamesLoading);
  const gamesError = useAppSelector(selectGamesError);

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