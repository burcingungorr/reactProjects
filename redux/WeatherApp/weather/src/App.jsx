import './App.css'
import WeatherCard from './components/WeatherCard'
import SearchBox from './components/SearchBox'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, fetchForecast } from "./redux/weatherSlice";
import ForecastList from './components/ForecastList';

function App() {
  const [city, setCity] = useState('');

  const dispatch = useDispatch(); //verileri çek
  const weather = useSelector((state) => state.weather.currentWeather);
  const forecast = useSelector((state) => state.weather.forecastData);
  const status = useSelector((state) => state.weather.status); //verileri oku
  const lastSearchedCity = useSelector(state => state.weather.lastSearchedCity);

  const handleSearch = () => {
    dispatch(fetchWeather(city));
    dispatch(fetchForecast(city)); 
  };

  
  useEffect(() => {
    dispatch(fetchWeather(lastSearchedCity));
    dispatch(fetchForecast(lastSearchedCity));
}, [dispatch, lastSearchedCity]);


  return (
    <>
      <div className="container">
        <h1>Hava Durumu</h1>
        <SearchBox city={city} setCity={setCity} onSearch={handleSearch} />
        {status === 'loading' && <p>Yükleniyor...</p>}
        {status === 'failed' && <p>Hata: {status}</p>}
        <div className="weather-card"> 
        {weather && <WeatherCard data={weather} />}
        {forecast && <ForecastList data={forecast} />}
      </div></div>
    </>
  );
}

export default App;
