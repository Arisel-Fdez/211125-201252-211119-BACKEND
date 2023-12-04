import amqp from 'amqplib';

export async function setupRabbitMQ() {
    const connection = await amqp.connect('amqp://service-2-env.eba-ghifcebq.us-east-1.elasticbeanstalk.com');
    const channel = await connection.createChannel();

    const queueName = 'inventory-queue';
    const exchangeName = 'orders-exchange';
    const routingKey = 'order.paid';
    await channel.assertQueue(queueName);
    await channel.bindQueue(queueName, exchangeName, routingKey);

    return { connection, channel, queueName };
}