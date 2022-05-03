const { students } = require("../Models/students");

module.exports = {
  getStudentByName: (name) => {
    const student = students[name.toLowerCase()];

    if (student) {
      return student;
    }

    return { error: `Student by the name of ${name} not found` };
  },

  getStudentsByCity: (city) => {
    const filteredStudents = Object.values(students).filter(
      (student) => student.city.toLowerCase() === city.toLowerCase()
    );

    return filteredStudents;
  },

  getStudentsByInterest: (interest) => {
    const filteredStudents = Object.values(students).filter((student) =>
      student.interests.includes(interest.toLowerCase())
    );

    return filteredStudents;
  },
};
