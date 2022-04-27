// require express
const express = require("express");

// create an express server from the express function above
const server = express(); // this server is deaf AF. Can't hear ANYTHING. It's locked out of the world

const PORT = 3000;

// Make the server listen on a port (on our computer)
server.listen(PORT, () => {
  console.log("Server listening...");
});

// GET /nelly
server.get("/nelly", (req, res) => {
  res.send("<h1>Hi Nelly! </h1>");
});
