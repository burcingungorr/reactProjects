import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = '9431897fb057078b257402b73e12883b';

export const fetchWeather = createAsyncThunk("weather/fetchWeather", async (city) => {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    return response.data;
});

export const fetchForecast = createAsyncThunk("weather/fetchForecast", async (city) => {
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    return response.data;
});

const weatherSlice = createSlice({
    name: "weather",
    initialState: {
        currentWeather: null,
        forecastData: null,
        status: "idle",
        error: null,
        lastSearchedCity: "Istanbul"
    },
    reducers: {
        setLastSearchedCity: (state, action) => {
            state.lastSearchedCity = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => { 
                state.status = "loading"; 
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentWeather = action.payload;
                state.lastSearchedCity = action.payload.name;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // 5 günlük tahmin
            .addCase(fetchForecast.pending, (state) => { 
                state.status = "loading"; 
            })
            .addCase(fetchForecast.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.forecastData = action.payload;
            })
            .addCase(fetchForecast.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});
export const { setLastSearchedCity } = weatherSlice.actions;

export default weatherSlice.reducer;
