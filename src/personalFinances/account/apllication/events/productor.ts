// productor.ts

import * as amqp from 'amqplib';

export async function enviarMensaje(datos: any) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const cola = 'mi_cola';

  await channel.assertQueue(cola, { durable: false });

  const mensaje = JSON.stringify(datos);
  channel.sendToQueue(cola, Buffer.from(mensaje));

  console.log(`[x] Mensaje enviado: ${mensaje}`);
  
  // Cierre de conexión después de enviar el mensaje
  setTimeout(() => {
    connection.close();
  }, 500);
}
