const rateLimit = require("express-rate-limit");
const config = require("../config/config");

const limiter = rateLimit({
  windowMs: config.rateLimitWindow,
  max: config.rateLimitMax,
  message: { error: "Too many requests, please try again later." },
});

module.exports = limiter;
