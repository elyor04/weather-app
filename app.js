const express = require("express");
const { getGeocode, getWeather } = require("./utils.js");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Weather App!");
});

app.get("/weather", async (req, res) => {
  try {
    const address = req.query.address;
    if (!address) throw new Error("Please provide an address.");

    const { latitude, longitude, location } = await getGeocode(address);
    const weather = await getWeather(latitude, longitude);
    res.send({ location, weather });

  } catch (err) {
    res.send({ error: err.message });
  }
});

app.get("*", (req, res) => {
  res.send("Page not found");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
