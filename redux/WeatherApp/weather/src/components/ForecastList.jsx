import React from "react";

const ForecastList = ({ data }) => {
    if (!data || !data.list) {
        return <p>Veri bulunamadı</p>;
    }

    const dailyForecast = {};

    data.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString("tr-TR", { weekday: "long" });
        if (!dailyForecast[date] || dailyForecast[date].temp < item.main.temp) {
            dailyForecast[date] = {
                temp: Math.round(item.main.temp),
                weather: item.weather[0].main,
                icon: item.weather[0].icon,
            };
        }
    });

    return (
        <div className="forecast-list">
            {Object.keys(dailyForecast).map((day, index) => (
                <div key={index} className="forecast-item">
                    <p>{day}</p>
                    <img 
                        src={`https://openweathermap.org/img/wn/${dailyForecast[day].icon}@2x.png`} 
                        alt={dailyForecast[day].weather} 
                    />
                    <p>{dailyForecast[day].temp}°C</p>
                    <p>{dailyForecast[day].weather}</p>
                </div>
            ))}
        </div>
    );
};

export default ForecastList;
