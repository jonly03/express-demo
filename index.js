require("dotenv").config();

const express = require("express");
const cors = require("cors");
const ejs = require("ejs");

// const { MongoClient, ObjectId } = require("mongodb");
const { destinations } = require("./Models/destinations");

// Routes
const { studentsRouter } = require("./Routes/api-routes/students");
const { destinationsRouter } = require("./Routes/api-routes/destinations");

// create an express server from the express function above
const server = express(); // this server is deaf AF. Can't hear ANYTHING. It's locked out of the world

// Tell our server how to process different payloads
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Tell our server about where to find public files
server.use(express.static("Public Files"));

// Configure our server to use ejs as our templating engine
server.set("view engine", "ejs");
server.set("views", "./Views");

// Tell my server to let requests from browsers come through
server.use(cors());

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Listening");
});

server.get("/", (req, res) => {
  res.render("index", { title: "Destination Page", destinations });
  // res.sendFile(`${__dirname}/index.html`);
});

server.use("/students", studentsRouter);
server.use("/destinations", destinationsRouter);

// // MONGODB CONNECTION
// const client = new MongoClient(process.env.MONGODB_CONNECTION_URL);

// client
//   .connect()
//   .then(async () => {
//     // Make the server listen on a port (on our computer)
//     server.listen(PORT, () => {
//       console.log("Server listening...");
//     });

//     const db = client.db("express-demo");
//     const students = db.collection("students");

//     students.insertOne({
//       kajdkjakd: "kdjkajdkjakd",
//       kajdkjakdj: 290,
//       kjakdjkajkdj: "kdjfjheurhjbvnbd",
//     });

//     const allStudents = await students.find().toArray();
//     console.table(allStudents);

//     const detroitBoys = await students
//       .find({ city: "Detroit", interests: "bananas" })
//       .toArray();
//     console.table(detroitBoys);

//     await students.deleteOne({ _id: ObjectId("627052a04eb2229bb037074f") });

//     await students.updateOne(
//       { _id: ObjectId("627052b51845ebba7f561dc5") },
//       {
//         $set: {
//           city: "Boston",
//           interests: ["tacos", "bananas"],
//         },
//       }
//     );

//     const newStudents = await students.find().toArray();
//     console.table(newStudents);

//     // const alotOfStudents = [
//     //   {
//     //     name: "Dao",
//     //     interests: ["tacos"],
//     //     city: "Sac Town",
//     //   },
//     //   {
//     //     name: "Nikko",
//     //     interests: ["bananas"],
//     //     city: "Detroit",
//     //   },
//     //   {
//     //     name: "Will",
//     //     interests: ["camarro", "frontier", "wrangler", "bananas"],
//     //     city: "Detroit",
//     //   },
//     //   {
//     //     name: "Mannie",
//     //     interests: ["soccer", "bananas"],
//     //     city: "Georgia",
//     //   },
//     // ];

//     // students.insertMany(alotOfStudents);

//   })
//   .catch((error) => {
//     console.log(error);
//   });
