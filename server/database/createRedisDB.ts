const redis = require('ioredis');

const redisClient = new redis({
	port: process.env.REDIS_PORT, // 6379
	host: process.env.REDIS_HOST, // 'redis'
});

export default redisClient;
