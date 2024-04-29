const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api/data", (req, res) => {
  res.json({ message: "The Node server is up running" });
});

app.get("/api/data2", (req, res) => {
  res.json({ message: "I am testing the Node server." });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
