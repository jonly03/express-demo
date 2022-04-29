// require express
const express = require("express");

// create an express server from the express function above
const server = express(); // this server is deaf AF. Can't hear ANYTHING. It's locked out of the world

// Tell our server how to process different payloads
server.use(express.json());

const PORT = process.env.PORT || 3000;

// Make the server listen on a port (on our computer)
server.listen(PORT, () => {
  console.log("Server listening...");
});

// CRUD
// CREATE => POST
// READ => GET
// UPDATE => PUT
// DELETE => DELETE

const destinations = [];

const students = {
  dao: {
    name: "Dao",
    interests: ["tacos"],
    city: "Sac Town",
  },
  nikko: {
    name: "Nikko",
    interests: ["bananas"],
    city: "Detroit",
  },
  will: {
    name: "Will",
    interests: ["camarro", "frontier", "wrangler", "bananas"],
    city: "Detroit",
  },
  mannie: {
    name: "Mannie",
    interests: ["soccer", "bananas"],
    city: "Georgia",
  },
};

// GET /students
// ?name=STUDENT_NAME
// ?interest
// ?city
// localhost:3000/students
// localhost:3000/students?name=nikko
// localhost:3000/students?city=detroit&interest=banana
server.get("/students", (req, res) => {
  const { name, interest, city } = req.query;

  if (!name && !interest && !city) {
    return res.send(students);
  }

  if (name) {
    const student = students[name.toLowerCase()];

    if (student) {
      return res.send(student);
    }

    return res
      .status(404)
      .send({ error: `Student by the name of ${name} not found` });
  }

  let filteredStudents = Object.values(students);

  if (interest) {
    filteredStudents = filteredStudents.filter((student) =>
      student.interests.includes(interest.toLowerCase())
    );
  }

  if (city) {
    filteredStudents = filteredStudents.filter(
      (student) => student.city.toLowerCase() === city.toLowerCase()
    );
  }

  return res.send(filteredStudents);
});

// GET /students/city/:myCity
// USING NAMED ROUTE PARAMETERS
// localhost:3000/students/city/detroit
/*
  {
    myCity: detroit
  }
*/

server.get("/students/name/:name", (req, res) => {
  const { name } = req.params;

  if (name) {
    const student = students[name.toLowerCase()];

    if (student) {
      return res.send(student);
    }

    return res
      .status(404)
      .send({ error: `Student by the name of ${name} not found` });
  }
});
server.get("/students/city/:city", (req, res) => {
  const { city } = req.params;

  if (city) {
    const filteredStudents = Object.values(students).filter(
      (student) => student.city.toLowerCase() === city.toLowerCase()
    );

    return res.send(filteredStudents);
  }
});
server.get("/students/interest/:interest", (req, res) => {
  const { interest } = req.params;

  if (interest) {
    const filteredStudents = Object.values(students).filter((student) =>
      student.interests.includes(interest.toLowerCase())
    );

    return res.send(filteredStudents);
  }
});

// CREATE => POST
// POST /destinations
// What is a destination? What makes a destination record?
/*
  - destination name (REQUIRED)
  - location (REQUIRED)
  - photo
  - description
*/
server.post("/destinations", (req, res) => {
  // ONLY grab what I need
  const { destination, location, photo, description } = req.body;

  // VALIDATE that I got what I expected (i.e destination & location are BOTH present and NOT empty strings)
  if (
    !destination ||
    !location ||
    destination.length === 0 ||
    location.length === 0
  ) {
    return res
      .status(400)
      .send({ error: "Destination AND location are BOTH required" });
  }

  // Create the new object to put in my DB
  const newDest = {
    destination,
    location,
    photo: photo && photo.length !== 0 ? photo : "kakdjkajkdjkajkdj",
    description: description ? description : "",
  };

  destinations.push(newDest);

  res.redirect(303, "/destinations"); // => go to a GET /destinations
});

// GET /destinations
server.get("/destinations", (req, res) => {
  res.send(destinations);
});
