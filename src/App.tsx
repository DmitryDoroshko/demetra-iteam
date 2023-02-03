import {ThemeProvider} from 'styled-components';
import {GlobalStyles, ThemeProps} from "./components/styled/Global";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ErrorPage from "./pages/ErrorPage";
import GameSpecificPage from "./pages/GameSpecificPage";
import GamesLikedPage from "./pages/GamesLikedPage";
import {useEffect} from "react";
import {useAppDispatch} from "./hooks/redux-hooks";
import {setLikedGames} from "./store/games/gamesSlice";
import {getLikedGamesFromLocalStorage} from "./utils/local-storage-helpers";

const appTheme: ThemeProps = {
  colors: {
    body: '#171A21',
  },
  fontColorMain: "#ffffff",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "games/*",
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <MainPage/>
      },
      {
        path: ":appId",
        element: <GameSpecificPage/>
      },
      {
        path: "liked",
        element: <GamesLikedPage/>
      }
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} replace/>
  }
], { basename: "/demetra-iteam"});

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const likedGamesFromLocalStorage = getLikedGamesFromLocalStorage();
    dispatch(setLikedGames(likedGamesFromLocalStorage));
  }, []);

  return (
      <ThemeProvider theme={appTheme}>
        <GlobalStyles colors={appTheme.colors} fontColorMain={appTheme.fontColorMain}/>
        <RouterProvider router={router}/>
      </ThemeProvider>
  );
}

export default App;