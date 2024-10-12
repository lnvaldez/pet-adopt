const { connectRabbitMq } = require("./rabbitmq");

exports.consumeMessage = async function (queue, callback, rabbitmqUrl) {
  try {
    const { connection, channel } = await connectRabbitMq(rabbitmqUrl);

    await channel.assertQueue(queue, { durable: true });
    console.log(`Waiting for messages in queue: ${queue}`);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString());
        console.log(`Received message from queue ${queue}: `, message);
        callback(message);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("Error consuming message: ", error);
  }
};
