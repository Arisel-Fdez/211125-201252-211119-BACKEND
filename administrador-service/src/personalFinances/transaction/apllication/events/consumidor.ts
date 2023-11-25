import amqp from 'amqplib';
import signale from 'signale';

export async function recibirMensaje(): Promise<any> {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const cola = 'mi_cola';

  await channel.assertQueue(cola, { durable: false });
  console.log(`[*] Esperando mensajes en la cola: ${cola}`);

  return new Promise((resolve, reject) => {
    channel.consume(cola, (mensaje) => {
      if (!mensaje) {
        signale.log("Error en el mensaje");
        return null
      }

      const contenido = mensaje.content.toString();
      const contenidoJSON = JSON.parse(contenido);

      signale.log(`[x] Mensaje recibido: `, contenidoJSON);
      resolve(contenidoJSON);
    }, { noAck: false });
  });
}
