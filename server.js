const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
} = require("./public/assets/js/fsUtils.js");

const PORT = process.env.PORT || 3001;
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

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a tip`);

  const { title, text } = req.body;

  if (req.body) {
    const newTip = {
      title,
      text,
      id: uuidv4()
    };

    readAndAppend(newTip, "./db/db.json");
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error("Error in adding tip");
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
