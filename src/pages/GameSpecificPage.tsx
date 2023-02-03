import React from "react";
import Layout from "../components/Layout/Layout";
import Game from "../components/Games/Game";
import {useGetSingleGameByAppIdQuery} from "../services/games.service";
import {useParams} from "react-router-dom";

const GameSpecificPage = () => {
  const {appId} = useParams();
  const {
    data: singleGame,
    isLoading: isSingleGameLoading,
    error: isSingleGameError
  } = useGetSingleGameByAppIdQuery(appId?.toString() || "");
  
  let content;

  if (singleGame && !isSingleGameLoading) {
    content = <Game {...singleGame} gameIsFull={true} gameIsSpecific={true}/>;
  }

  if (isSingleGameError) {
    content = <h3>Error loading game with app id {appId}...</h3>;
  }

  if (isSingleGameLoading) {
    content = <h3>Loading game with app id {appId}...</h3>;
  }

  return (
      <Layout>
        <h2 style={{marginBottom: "2rem"}}>Game {singleGame?.title}</h2>
        {content}
      </Layout>
  );
};

export default GameSpecificPage;