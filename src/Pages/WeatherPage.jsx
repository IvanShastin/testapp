import React, { useState, useEffect } from "react";
import "./WeatherPage.css";

import { getForecastForCity, convertFromKelvinToCelcius } from "../Util";
import Spinner from "../Components/Spinner";
import { APIURL, APIKEY } from "../Util";

export default function WeatherPage() {
  const [city, SetCity] = useState("Dublin");
  const [searching, SetSearching] = useState(false);
  const [weather, SetWeather] = useState(null);
  const [error, SetError] = useState(null);
  const [query, SetQuery] = useState("Dublin");

  useEffect(() => {
    const fetchData = async () => {
      SetSearching(true);
      try {
        const result = await getForecastForCity(query, APIURL, APIKEY);
        SetWeather(result);
        SetError(null);
      } catch (error) {
        console.log(error);
        SetError(error.Error);
        SetWeather(null);
      }
      SetSearching(false);
    };
    fetchData();
  }, [query]);

  return (
    <div className="d-flex flex-column mt-4">
      <div className="row justify-content-center align-self-center w-100">
        <div className="col-sm-6 col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control mr-1"
              placeholder="Search city, e.g Dublin, London, etc"
              aria-label="Search city"
              aria-describedby="button-addon2"
              data-testid="cityInput"
              onChange={e => {
                SetCity(e.target.value);
              }}
            ></input>
            <div className="input-group-append">
              <button
                data-testid="searchButton"
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={() => {
                  SetQuery(city);
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {searching ? (
        <Spinner />
      ) : (
        weather && (
          <div className="row justify-content-center align-self-center w-100">
            <div className="col-sm-6 col-md-8">
              <div className="card weather mt-3">
                <img
                  src="https://images.unsplash.com/photo-1524225754758-2bdf3df6acd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                  className="card-img-top"
                  alt="Dublin"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{city}</h5>
                  <p className="card-text" data-testid="temperature">
                    Temperature: {convertFromKelvinToCelcius(weather.main.temp)}
                    &deg;
                  </p>
                  <p>
                    {weather.weather[0].description}
                    <img
                      src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                      alt=""
                    />
                  </p>
                  <a
                    href="/weather"
                    className="btn btn-lg refreshButton"
                    data-testid="refresh"
                  >
                    Refresh
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      )}
      {error && (
        <div className="row justify-content-center align-self-center w-100">
          <div className="col-sm-6 col-md-8">
            <div className="card weather mt-3">
              <div className="card-body text-center">
                <h5 className="card-title">Error</h5>
                <p className="card-text">{error}</p>
                <a href="/weather" className="btn btn-lg refreshButton">
                  Try again
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
