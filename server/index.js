"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;
const app = express();

const { connectMongoDB } = require("./configs/mongoDB");
const { getItems } = require("./controllers/getItems");
const { getItem } = require("./controllers/getItem");
const { getUser } = require("./controllers/getUser");
const { getCheckout } = require("./controllers/getCheckout");
const { postCheckout } = require("./controllers/postCheckout");
const { patchUserCartItems } = require("./controllers/patchUserCartItems");

/* Middlewares for the app */
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(morgan("tiny"));
app.use(express.static("./server/assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));

connectMongoDB(); // Connect to MongoDB

/* GET */
app.get("/items", getItems); // Get all the items info depending of some queries
app.get("/item/:itemId", getItem); // Get one item info
app.get("/user/:userId", getUser); // Get the only user from the application
app.get("/checkout/:checkoutId", getCheckout); // Get the checkout info

/* POST */
app.post("/checkout", postCheckout); // Add a new checkout when user paid

/* PATCH */
app.patch("/user/:userId", patchUserCartItems); // Add or remove an item to the user cart

/* Catch all endpoint */
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

app.listen(PORT, () => console.info(`Server listening on port ${PORT}`));
