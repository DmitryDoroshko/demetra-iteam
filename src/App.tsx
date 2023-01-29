import {ThemeProvider} from 'styled-components';
import {GlobalStyles, ThemeProps} from "./components/styled/Global";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ErrorPage from "./pages/ErrorPage";
import GameSpecificPage from "./pages/GameSpecificPage";

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
    children: [
      {
        path: "game/:slugId",
        element: <GameSpecificPage/>,
        errorElement: <ErrorPage/>
      },
    ],
  },
]);

function App() {
  return (
      <ThemeProvider theme={appTheme}>
        <GlobalStyles colors={appTheme.colors} fontColorMain={appTheme.fontColorMain}/>
        <RouterProvider router={router}/>
      </ThemeProvider>
  );
}

export default App;