import axios from "axios";
import {BASE_API_URL} from "../utils/constants";

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
  } catch(error: any) {
    throw Error(error.message);
  }
};

