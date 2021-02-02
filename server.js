// empty object to act as a endpoint for all routes

let projectData = {};

// require express to run the server
const express = require("express");
const port = 3000;

// instance of the app
const app = express();

// require dependencies

const cors = require("cors");
const bodyParser = require("body-parser");

// cross origin allowance

app.use(cors());

// middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//main project folder
app.use(express.static("public"));

// server listening

app.listen(port, () => {
  console.log(`The server is working on port number ${port}`);
});

//get the data send by the client

app.post("/server", request);

function request(req, res) {
  projectData = req.body;
  res.send("The data has been received");
  // console.log(dataProject);
}

app.get("/client", response);

function response(req, res) {
  res.send(projectData);
}
