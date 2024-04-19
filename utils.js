const axios = require("axios");

async function getGeocode(address) {
  const apiKey = "6620ad4048bd7386963403nok96be1a";
  const url = `https://geocode.maps.co/search?api_key=${apiKey}&q=${address}`;
  const response = await axios.get(url);

  if (response.data.length) {
    const data = response.data[0];
    return {
      latitude: data.lat,
      longitude: data.lon,
      location: data.display_name,
    };
  } else {
    throw new Error("No matching location found.");
  }
}

async function getWeather(latitude, longitude) {
  const apiKey = "5247ce7880c546df9d950213241804";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;
  const response = await axios.get(url);

  const data = response.data.current;
  return `${data.condition.text}. Temperature is ${data.temp_c} degrees outside.`;
}

module.exports = { getGeocode, getWeather };
