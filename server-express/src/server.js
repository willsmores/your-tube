require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

// serve static files from ../build (needed for React)
const cwd = process.cwd();
const public = path.join(cwd, "..", "public");
console.log("public dir: ", public);
app.use(express.static(public));

// Separate routes for each resource here
const userApiRoutes = require("../routes/users-api");
const playlistApiRoutes = require("../routes/playlists-api");

// Mount the resource routes here
app.use("/api/users", userApiRoutes);
app.use("/api/playlists", playlistApiRoutes);

// Do Not make a route for "/" or it will override public

app.get("/api/status", (req, res) => {
  res.json({ version: "1.01" });
});

app.use(function (req, res) {
  res.status(404);
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
