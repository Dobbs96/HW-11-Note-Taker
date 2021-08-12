const express = require("express");
const path = require("path");
const fs = require("fs");

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

fs.readFile("db/db.json", (err, data) => {
  if (err) throw err;
  const notes = JSON.parse(data);
  app.get("/api/notes", (req, res) => res.json(notes));

  // POST

  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    notes.push(newNote);
    res.redirect("/");
    update();
  });

  // PUT
  app.put("/api/notes/:id", (req, res) => {});
  // DELETE
  app.delete("/api/notes/:id", (req, res) => {
    //   deletes first not target
    notes.splice(req.params.id, 1);
    res.redirect("/");
    update();
  });
  const update = () => {
    fs.writeFile("db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
      return true;
    });
  };
});
app.listen(PORT, () =>
  console.log(`App listening on PORT http://localhost:${PORT}`)
);
