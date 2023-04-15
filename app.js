const path = require("path");
const express = require("express");
const { setHeaders } = require("./middlewares/headers");
const { errorHandler } = require("./middlewares/errors");

//*routes import dynamically
const apiChecker = require("./middlewares/apiCheker");
const routes = [
  "articles",
  "auth",
  "category",
  "comments",
  "contact",
  "courses",
  "infos",
  "menus",
  "newsletters",
  "notifications",
  "offs",
  "orders",
  "search",
  "tickets",
  "users",
  "apiKey",
];

const app = express();

//* BodyPaser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

//* CORS Policy Definitions
app.use(setHeaders);

//* Static Folder
app.use(express.static(path.join(__dirname, "public")));

//* uncomment to add ApiKey Generator middleware
// app.use(apiChecker);

//* dynamically import routes and mount them
routes.forEach((route) => {
  const router = require(`./routes/v1/${route}`);
  app.use(`/v1/${route}`, router);
});

//* Error Controller
app.use((req, res) => {
  console.log("this path is not available:", req.path);
  res.status(404).json({ message: "404 OOPS! PATH NOT FOUND" });
});

app.use(errorHandler);

module.exports = app;
