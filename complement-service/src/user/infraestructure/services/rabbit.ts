import amqp from 'amqplib';
import { RabbitMQService } from '../../application/services/rabbit';

export class RabbitMQ implements RabbitMQService {
    // Servicio y conexciodn de rabbit
    private connection: amqp.Connection | null = null;

    async connect(): Promise<void> {
        this.connection = await amqp.connect('amqp://https://open-bait-production.up.railway.app');
    }

    async publishMessage(exchange: string, routingKey: string, message: any): Promise<void> {
        if (!this.connection) {
            throw new Error('RabbitMQ connection not established');
        }
        
        const channel = await this.connection.createChannel();
        channel.assertExchange(exchange, 'direct', { durable: false });
        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
        console.log('Mensaje enviado [Y]', message)
    }
}