const express = require("express");

const { students } = require("../../Models/students");

const {
  getStudentByName,
  getStudentsByCity,
  getStudentsByInterest,
} = require("../../Controllers/students");

const studentsRouter = express.Router();

// CRUD
// CREATE => POST
// READ => GET
// UPDATE => PUT
// DELETE => DELETE

// GET /students
// ?name=STUDENT_NAME
// ?interest
// ?city
// localhost:3000/students
// localhost:3000/students?name=nikko
// localhost:3000/students?city=detroit&interest=banana
studentsRouter.get("/", (req, res) => {
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

studentsRouter.get("/name/:name", (req, res) => {
  // Receive request with its arguments/parameters
  const { name } = req.params;

  // Delegating to controller to run appropriate logic
  const student = getStudentByName(name);

  // Send back response to front-end
  if (student.error) {
    return res.status(404).send(student);
  }

  return res.send(student);
});

studentsRouter.get("/city/:city", (req, res) => {
  // Receive request with its arguments/parameters
  const { city } = req.params;

  // Delegating to controller to run appropriate logic
  const filteredStudents = getStudentsByCity(city);

  // Send back response to front-end
  return res.send(filteredStudents);
});

studentsRouter.get("/interest/:interest", (req, res) => {
  const { interest } = req.params;

  const filteredStudents = getStudentsByInterest(interest);

  return res.send(filteredStudents);
});

module.exports = {
  studentsRouter,
};
