const express = require("express");
const axios = require("axios");

const { destinations } = require("../../Models/destinations");

const { validateUserInput } = require("../../Middlewares/validateDestinations");

const destinationsRouter = express.Router();

// CREATE => POST
// POST /destinations
// What is a destination? What makes a destination record?
/*
  - destination name (REQUIRED)
  - location (REQUIRED)
  - description
*/

destinationsRouter.post("/", validateUserInput, async (req, res) => {
  // ONLY grab what I need
  const { destination, location, description } = req.body;

  // Create the Unsplash APIURL with the API_KEY and the location & destination passed in as the query
  const UnsplashApiUrl = `https://api.unsplash.com/search/photos?query=${destination} ${location}&client_id=${process.env.UNSPLASH_API_KEY}`;

  // Use either Axios or node-fetch to get the photos
  const { data } = await axios.get(UnsplashApiUrl);

  // Get a random photo from data.results
  const photos = data.results;
  const randIdx = Math.floor(Math.random() * photos.length);

  // Create the new object to put in my DB
  const newDest = {
    destination,
    location,
    photo: photos[randIdx].urls.small,
    description: description ? description : "",
  };

  destinations.push(newDest);

  res.redirect(303, "/destinations"); // => go to a GET /destinations
});

// GET /destinations
destinationsRouter.get("/", (req, res) => {
  res.render("index", { title: "Destination Page", destinations });
  // res.send(destinations);
});

module.exports = {
  destinationsRouter,
};
