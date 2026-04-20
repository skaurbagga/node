/*const Redis = require('ioredis');

const redis = new Redis({
    host: '127.0.0.1',
    port: 6379
});

redis.on('connect', () => console.log('Redis Connected'));

module.exports = redis;*/

const redis = require('redis');

const client = redis.createClient({
    url: 'redis://127.0.0.1:6379'
});

client.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
    await client.connect();
    console.log('Redis Connected');
})();

module.exports = client;