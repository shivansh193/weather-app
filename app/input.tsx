"use client"
import React, { useState } from "react";
import Sunny from "../public/Sunny-Bg.jpg";
import Rainy from "../public/rainy-Bg.jpg";
import Default from "../public/default-Bg.jpg";
import Image from "next/image";

const Input = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(Default);
  const [apiKey, setApiKey] = useState("");

  const fetchData = () => {
    const weatherURL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(weatherURL)
      .then((res) => res.json())
      .then((data) => {
        const { condition: { text: weatherText } } = data.current;

        setWeatherData(data);

        if (weatherText.includes("Sunny")) {
          setBackgroundImage(Sunny);
        } else if (weatherText.includes("Rain")) {
          setBackgroundImage(Rainy);
        } else {
          setBackgroundImage(Default);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative">
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="background"
        />
      </div>
      <div className="bg-white bg-opacity-70 p-8 rounded-lg text-center relative z-10">
        <h1 className="text-4xl font-bold mb-4">Weather App</h1>
        <input
          type="text"
          placeholder="Enter API Key"
          value={apiKey}
          onChange={handleApiKeyChange}
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md bg-red-500 text-white w-full"
        />
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={handleInputChange}
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md bg-red-500 text-white w-full"
        />
        <button onClick={fetchData} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Get Weather
        </button>
        {weatherData && (
          <div className="mt-4 text-lg font-semibold text-black"> {/* Changed text color to black */}
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Weather: {weatherData.current.condition.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
