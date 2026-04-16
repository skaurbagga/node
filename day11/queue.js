const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis();

const myQueue = new Queue('task-queue', {
    connection
});

module.exports = { myQueue, connection };