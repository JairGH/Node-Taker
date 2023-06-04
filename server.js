const express = require("express");
const path = require("path");
const fs = require("fs");
const { readFromFile, readAndAppend } = require("./fsUtils.js");

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//do i need this?
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

app.post

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
