const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello from myapp running on AKS! 🚀");
});

app.listen(port, () => {
  console.log(`myapp listening on port ${port}`);
});
