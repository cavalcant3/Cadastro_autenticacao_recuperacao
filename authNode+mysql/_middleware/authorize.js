const jwt = require("express-jwt");
const { secret } = require("config.json");
const db = require("_helpers/db");

module.exports = authorize;
