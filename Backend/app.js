// import fs from "node:fs/promises";
// import path from "node:path";
// import bodyParser from "body-parser";
// import express from "express";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const _dirname = path.dirname(__filename);

// const app = express();
// const imageFilePath = path.join(_dirname, "images");
// console.log(`Image file path: ${imageFilePath}`);
// app.use(express.static(imageFilePath));
// app.use(bodyParser.json());

// // CORS

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
//   res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   next();
// });

// app.get("/", (req, res) => {
//   return res.send("hello world!");
// });
// app.get("/places", async (req, res) => {
//   const filePath = path.join(_dirname, "data", "places.json");

//   const fileContent = await fs.readFile(filePath);

//   const placesData = JSON.parse(fileContent);

//   res.status(200).json({ places: placesData });
// });
// //"C:\\Users\\HPOneDrive\\Documents\\Placepickerapp\\backend\\data\\user-places.json"
// app.get("/user-places", async (req, res) => {
//   const fileContent = await fs.readFile(
//     "C:\\Users\\HP\\OneDrive\\Documents\\Placepickerapp\\backend\\data\\user-places.json"
//   );

//   const places = JSON.parse(fileContent);

//   res.status(200).json({ places });
// });

// app.put("/user-places", async (req, res) => {
//   const places = req.body.places;

//   await fs.writeFile(
//     "C:\\Users\\HP\\OneDrive\\Documents\\Placepickerapp\\backend\\data\\user-places.json",
//     JSON.stringify(places)
//   );

//   res.status(200).json({ message: "User places updated!" });
// });

// // 404
// app.use((req, res, next) => {
//   if (req.method === "OPTIONS") {
//     return next();
//   }
//   res.status(404).json({ message: "404 - Not Found" });
// });

// app.listen(3000, function () {
//   console.log(" listening on port 3000");
// });
//second  approach
//import fs from "node:fs/promises";

// import bodyParser from "body-parser";
// import express from "express";
// import { fileURLToPath } from "url";
// import path from "path";

// const __filename = fileURLToPath(import.meta.url); // Get current file path
// const __dirname = path.dirname(__filename);
// const app = express(); //only use when package.json  type is module
const fs = require("fs/promises");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
const data_path = path.join(__dirname, "data");

app.use(express.static(path.join(__dirname, "images")));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/places", async (req, res) => {
  const placepath = path.join(data_path, "places.json");
  console.log(placepath);
  const fileContent = await fs.readFile(placepath, "utf8");
  const placesData = JSON.parse(fileContent);

  res.status(200).json({ places: placesData });
});

app.get("/user-places", async (req, res) => {
  const userplacespath = path.join(data_path, "user-places.json");
  console.log(userplacespath);
  const fileContent = await fs.readFile(userplacespath, "utf-8");

  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

app.put("/user-places", async (req, res) => {
  const userplacespath = path.join(data_path, "user-places.json");
  const places = req.body.places;

  await fs.writeFile(userplacespath, JSON.stringify(places, null, 2));
  res.status(200).json({ message: "User places updated!" });
});
// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
