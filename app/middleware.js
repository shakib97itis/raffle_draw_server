const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const middleware = [
  morgan("dev"),
  cors(),
  express.json(),
  express.urlencoded({ extended: true }),
];

module.exports = middleware;
