import React from "react";
import Layout from "../components/Layout/Layout";
import Game from "../components/Games/Game";
import mockGame from "../assets/mockGame.png";

const GameSpecificPage = () => {
  const game = {
    appId: "9999",
    gameIsLiked: true,
    released: "21 Aug, 2012",
    url: "https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/?snr=1_7_7_151_150_1",
    imgUrl: mockGame,
    gameIsFull: true,
    reviewSummary: "Very Positive<br>88% of the 6,888,645 user reviews for this game are positive.",
    title: "Counter-Strike: Global Offensive",
    price: " Free to Play ",
  };

  return (
      <Layout>
        <Game {...game}/>
      </Layout>
  );
};

export default GameSpecificPage;