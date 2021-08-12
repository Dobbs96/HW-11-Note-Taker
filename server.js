const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(`${__dirname}`, "index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(`${__dirname}/public`, "notes.html"))
);

app.get("/api/notes", (req, res) => res.json());

app.listen(PORT, () =>
  console.log(`App listening on PORT http://localhost:${PORT}`)
);
