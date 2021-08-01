import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewCountry = ({ country }) => {
  const [weather, setWeather] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;
  console.log("api", api_key);

  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current", {
        params: {
          access_key: api_key,
          query: country.name,
        },
      })
      .then((response) => setWeather(response.data));
  }, []);

  const ViewWeather = ({weather}) => {
    console.log(weather)
    if (weather.length === 0) {
      return <div></div>
    }
    return (
      <div>
        {console.log(weather)}
        <p>Temperature {weather.current.temperature} Celcius</p>
        <img className="weather" src={weather.current.weather_icons[0]} />
        <p>Wind {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
      </div>
    );
  };

  return (
    <div key={country.alpha2Code}>
      <h2>{country.name}</h2>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li>{language.name}</li>
        ))}
      </ul>
      <img className="image" src={country.flag} />
      <h2>Weather in {country.name}</h2>
      <ViewWeather weather={weather}/>
    </div>
  );
};

export default ViewCountry;
