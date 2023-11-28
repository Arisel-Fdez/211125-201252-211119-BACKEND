const amqp = require('amqplib');

export async function createConnection() {
  const connection = await amqp.connect('amqp://https://open-bait-production.up.railway.app');
  const channel = await connection.createChannel();
  return { connection, channel };
}

module.exports = { createConnection };
