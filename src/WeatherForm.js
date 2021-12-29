import React, { useState } from "react";
import axios from "axios";

export default function WeatherForm() {
  let [city, setCity] = useState(null);
  let [call, setCall] = useState(null);

  function updateCity(event) {
    setCity(event.target.value);
  }

  function apiCall(response) {
    setCall(response.data);
  }

  function WeatherForecast() {
    let apiKey = "339446a70a6285d4da506a17e7465ddf";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(apiCall);
  }

  function submitCity(event) {
    event.preventDefault();
    WeatherForecast();
  }

  let form = (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={submitCity}>
        <input
          type="text"
          placeholder="Enter a city"
          autoComplete="off"
          onChange={updateCity}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );

  if (call === null) {
    return form;
  } else {
    let iconUrl = `http://openweathermap.org/img/wn/${call.weather[0].icon}@2x.png`;
    return (
      <div>
        {form}
        <ul>
          <li>Temperature : {Math.round(call.main.temp)}°C</li>
          <li>Description : {call.weather[0].description.toUpperCase()}</li>
          <li>Humidity : {call.main.humidity}%</li>
          <li>Wind : {call.wind.speed}km/h</li>
          <li>
            <img src={iconUrl} alt="Weather Icon"></img>
          </li>
        </ul>
      </div>
    );
  }
}
