require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/products",
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  externalApiKey: process.env.EXTERNAL_API_KEY,
  externalApiBaseUrl: process.env.EXTERNAL_API_BASE_URL,
  authToken: process.env.AUTH_TOKEN,
  cacheTTL: parseInt(process.env.CACHE_TTL) || 3600,
  rateLimitWindow: 15 * 60 * 1000,
  rateLimitMax: 100,
};

module.exports = config;
