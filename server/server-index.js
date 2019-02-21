const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "../client/dist")));

app.listen(4800, () => {
  console.log("dev server running for careers page on port 4800");
})