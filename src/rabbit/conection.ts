const amqp = require('amqplib');

export async function createConnection() {
  const connection = await amqp.connect('amqp://service-2-env.eba-ghifcebq.us-east-1.elasticbeanstalk.com');
  const channel = await connection.createChannel();
  return { connection, channel };
}

module.exports = { createConnection };
