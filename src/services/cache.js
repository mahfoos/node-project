const Redis = require("ioredis");
const config = require("../config/config");

const redisClient = new Redis(config.REDIS_URL);

async function get(key) {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
}

async function set(key, value, duration) {
  return redisClient
    .set(key, JSON.stringify(value), "EX", duration)
    .then((res) => res === "OK");
}

async function invalidate(key) {
  return redisClient.del(key);
}

module.exports = {
  get,
  set,
  invalidate,
};
