const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// store persons in memory (will reset when pod restarts)
const persons = [];

app.use(bodyParser.urlencoded({ extended: false }));

// simple HTML form + list
app.get("/", (req, res) => {
  const list = persons
    .map(p => `<li>${p.name} (${p.age})</li>`)
    .join("");

  res.send(`
    <h1>Person Page</h1>
    <form method="POST" action="/person">
      <label>Name: <input name="name" /></label><br/>
      <label>Age: <input name="age" type="number" /></label><br/>
      <button type="submit">Create Person</button>
    </form>
    <h2>Person Lookup</h2>
    <ul>${list}</ul>
  `);
});

// handle person creation
app.post("/person", (req, res) => {
  const { name, age } = req.body;
  if (name) {
    persons.push({ name, age: age || "N/A" });
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`myapp listening on port ${port}`);
});
