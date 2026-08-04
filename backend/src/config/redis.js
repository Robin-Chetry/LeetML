const { createClient } = require("redis");

const redisClient = createClient({
  username: "default",
  password: process.env.REDIS_PASS,
  socket: {
    host: "redis-10764.crce292.ap-south-1-2.ec2.cloud.redislabs.com",
    port: 10764,

    reconnectStrategy: (retries) => {
      if (retries > 10) {
        return new Error("Redis reconnect failed");
      }
      return Math.min(retries * 100, 3000);
    },
  },
});

redisClient.on("connect", () => {
  console.log("Redis connecting...");
});

redisClient.on("ready", () => {
  console.log("Redis connected");
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err.message);
});

redisClient.on("end", () => {
  console.log("Redis connection closed");
});

module.exports = redisClient;