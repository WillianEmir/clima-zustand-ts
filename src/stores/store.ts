import { create } from "zustand";
import { Search, Weather } from "../types/indes";
import axios from "axios";
import { SchemaWeather } from "../schemas";

type WeatherState = {
  weather: Weather;
  loading: boolean;
  notFound: boolean;
  fetchWeather: (search: Search) => Promise<void>;
};

const initialState = {
  name: "",
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
};

export const useWeather = create<WeatherState>((set) => ({
  weather: initialState,
  loading: false,
  notFound: false,
  fetchWeather: async (search: Search) => {
    const appId = import.meta.env.VITE_API_KEY;
    set(() => ({
      loading: true,
      weather: initialState,
    }));

    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;

      const { data } = await axios(geoUrl);

      // Comprobar si existe la ciduad
      if (!data[0]) {
        set(() => ({ notFound: true }));
        return;
      }

      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      // Zod
      const { data: weatherResult } = await axios(weatherUrl);
      const result = SchemaWeather.safeParse(weatherResult);
      if (result.success) {
        set(() => ({ notFound: false, weather: result.data }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      set(() => ({ loading: false }));
    }
  },
}));
