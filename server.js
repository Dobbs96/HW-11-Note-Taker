const express = require("express");

const app = express();

const PORT = 8080;

app.get("/api/notes", (req, res) => res.json(notes));

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
