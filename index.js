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
        <li class="person-card">
          <div class="person-name">
            ${p.firstName} ${p.lastName}
          </div>
<div><strong>Age:</strong> ${p.age || "-"}</div>
          
          <div><strong>Phone:</strong> ${p.phone || "-"}</div>
          <div><strong>Email:</strong> ${p.email || "-"}</div>
          <div><strong>Address:</strong> ${p.address || "-"}</div>
          <div><strong>City:</strong> ${p.city || "-"}</div>
          <div><strong>State:</strong> ${p.state || "-"}</div>
          <div><strong>Zipcode:</strong> ${p.zipcode || "-"}</div>
          <div><strong>Country:</strong> ${p.country || "-"}</div>
        </li>
      `
    )
    .join("");

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Person Page</title>
        <style>
          * {
            box-sizing: border-box;
          }

          body {
            font-family: Arial, Helvetica, sans-serif;
            background: #f4f4f9;
            margin: 0;
            padding: 20px;
          }

          .container {
            max-width: 800px;
            margin: 0 auto;
            background: #ffffff;
            padding: 24px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          }

          h1, h2 {
            margin-top: 0;
            color: #333333;
          }

          form {
            border: 1px solid #dddddd;
            padding: 16px;
            border-radius: 6px;
            background: #fafafa;
            margin-bottom: 24px;
          }

          .form-row {
            margin-bottom: 10px;
            display: flex;
            gap: 8px;
            align-items: center;
          }

          .form-row label {
            min-width: 110px;
            font-weight: bold;
          }

          .form-row input {
            flex: 1;
            padding: 6px 8px;
            border: 1px solid #cccccc;
            border-radius: 4px;
          }

          button {
            margin-top: 8px;
            padding: 8px 16px;
            border-radius: 4px;
            border: none;
            background: #2563eb;
            color: white;
            font-weight: 600;
            cursor: pointer;
          }

          button:hover {
            background: #1d4ed8;
          }

          ul {
            list-style: none;
            padding-left: 0;
          }

          .person-card {
            border: 1px solid #dddddd;
            border-radius: 6px;
            padding: 12px 14px;
            margin-bottom: 10px;
            background: #fcfcfc;
          }

          .person-name {
            font-weight: 700;
            margin-bottom: 6px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Person Page</h1>

          <form method="POST" action="/person">
            <div class="form-row">
              <label>First Name:</label>
              <input name="firstName" />
            </div>
            <div class="form-row">
              <label>Last Name:</label>
              <input name="lastName" />
            </div>
            <div class="form-row">
              <label>Age:</label>
              <input name="age" type="number" />
            </div>
            <div class="form-row">
              <label>Phone:</label>
              <input name="phone" />
            </div>
            <div class="form-row">
              <label>Email:</label>
              <input name="email" type="email" />
            </div>
            <div class="form-row">
              <label>Address:</label>
              <input name="address" />
            </div>
            <div class="form-row">
              <label>City:</label>
              <input name="city" />
            </div>
            <div class="form-row">
              <label>State:</label>
              <input name="state" />
            </div>
            <div class="form-row">
              <label>Zipcode:</label>
              <input name="zipcode" />
            </div>
            <div class="form-row">
              <label>Country:</label>
              <input name="country" />
            </div>
            <button type="submit">Create Person</button>
          </form>

          <h2>Person Lookup</h2>
          <ul>
            ${listItems || "<li>No persons yet</li>"}
          </ul>
        </div>
      </body>
    </html>
  `);
});

app.post("/person", (req, res) => {
  const {
    firstName,
    lastName,
    age,
    phone,
    email,
    address,
    city,
    state,
    zipcode,
    country,
  } = req.body;

  if (firstName || lastName) {
    persons.push({
      firstName: firstName || "",
      lastName: lastName || "",
      age: age || "",
      phone: phone || "",
      email: email || "",
      address: address || "",
      city: city || "",
      state: state || "",
      zipcode: zipcode || "",
      country: country || "",
    });
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`myapp listening on port ${port}`);
});

