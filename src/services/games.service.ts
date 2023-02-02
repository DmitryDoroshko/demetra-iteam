import {BASE_API_URL} from "../utils/constants";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IGame} from "../model/games";

/*
const HEADERS = {
  'X-RapidAPI-Key': 'c304863d93msh1d80382c432c850p1ed9e3jsn3d6e6ea38dcb',
  'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
};

export const getGamesByGameName = async (gameName: string) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/search/${gameName}/page/1`, {
      headers: HEADERS
    });
    return response.data;
  } catch (error: any) {
    throw Error(error.message);
  }
};*/


export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL, prepareHeaders: (headers, {getState}) => {
      headers.set("X-RapidAPI-Key", 'c304863d93msh1d80382c432c850p1ed9e3jsn3d6e6ea38dcb');
      headers.set('X-RapidAPI-Host', 'steam2.p.rapidapi.com');
      return headers;
    }}),
  tagTypes: ["Games", "SingleGame"],
  endpoints: (build) => ({
      getGamesByGameName: build.query<IGame[], string>({
        query: (gameName: string) => ({
          url: `/search/${gameName}/page/1`,
        }),
        providesTags: result => ["Games"],
      }),
      getSingleGameByAppId: build.query<IGame, string>({
        query: (appId: string) => ({
          url: `/appDetail/${appId}`,
        }),
        providesTags: result => ["SingleGame"],
      })
  }),
});

export const {useGetGamesByGameNameQuery, useGetSingleGameByAppIdQuery} = gamesApi;

