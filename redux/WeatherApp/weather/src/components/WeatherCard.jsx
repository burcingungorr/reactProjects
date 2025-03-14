import React from "react";
import "../index.css";

const WeatherCard = ({ data }) => {
    return (
        <div className="weather-card">
            <h2>{data.name}, {data.sys.country}</h2>
            <div className="day"> 
            <img 
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
                alt={data.weather[0].main} 
            />   
            <p>{data.main.temp} °C</p>
            </div>

            <p>{data.weather[0].main}</p>
    
        </div>
    );
};

export default WeatherCard;
