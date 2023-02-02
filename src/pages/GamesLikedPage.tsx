import React from "react";
import Layout from "../components/Layout/Layout";
import {useAppSelector} from "../hooks/redux-hooks";
import {selectLikedGames} from "../store/games/gamesSlice";
import LikedGames from "../components/Games/LikedGames";

const GamesLikedPage = () => {
  const likedGames = useAppSelector(selectLikedGames);

  let likedGamesContent;

  if (likedGames.length > 0) {
    likedGamesContent = <LikedGames likedGames={likedGames}/>;
  } else {
    likedGamesContent = <h3>No liked games...</h3>;
  }

  return (
      <Layout>
        <h2 style={{marginBottom: "2rem"}}>Games Liked Page</h2>
        {likedGamesContent}
      </Layout>
  );
};

export default GamesLikedPage;