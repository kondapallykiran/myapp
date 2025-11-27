const express = require("express");
const app = express();
const port = 3000;

// Store persons in memory (resets when pod restarts)
const persons = [];

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const listItems = persons
    .map(
      (p) => `
        <li>
          ${p.firstName} ${p.lastName} (${p.age})<br/>
          Phone: ${p.phone}<br/>
          Email: ${p.email}<br/>
          Address: ${p.address}
        </li>
      `
    )
    .join("");

  res.send(`
    <h1>Person Page</h1>
    <form method="POST" action="/person">
      <label>First Name: <input name="firstName" /></label><br/>
      <label>Last Name: <input name="lastName" /></label><br/>
      <label>Age: <input name="age" type="number" /></label><br/>
      <label>Phone: <input name="phone" /></label><br/>
      <label>Email: <input name="email" type="email" /></label><br/>
      <label>Address: <input name="address" /></label><br/>
      <button type="submit">Create Person</button>
    </form>

    <h2>Person Lookup</h2>
    <ul>
      ${listItems || "<li>No persons yet</li>"}
    </ul>
  `);
});

app.post("/person", (req, res) => {
  const { firstName, lastName, age, phone, email, address } = req.body;

  if (firstName || lastName) {
    persons.push({
      firstName: firstName || "",
      lastName: lastName || "",
      age: age || "",
      phone: phone || "",
      email: email || "",
      address: address || ""
    });
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`myapp listening on port ${port}`);
});
