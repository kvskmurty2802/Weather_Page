import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import search_logo from "../public/search.png";
import clear_sky from "../public/clear_sky.png"; 
import humidty_logo from "../public/Humidity.png";
import weather_logo from "../public/wind.png"; 

export default function App() {
  const [weatherData, setWeatherData] = useState(false);
  const inputref= useRef();
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;
      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
        alert(data.message);
        console.error("City Not Found");
      };
      console.log(data);
      const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("City not Found");
      console.log(error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <>
    <div className="heading">Weather </div>
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Enter City Name" ref={inputref}/>
        <img src={search_logo} alt="search" onClick={()=>search(inputref.current.value)}/>
      </div>
      {weatherData && (
        <>
          <img
            src={weatherData.icon}
            alt=""
            className="weather-icon"
            onError={(e) => {
              e.target.src = clear_sky;
            }}
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidty_logo} alt="humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={weather_logo} alt="wind" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
}
