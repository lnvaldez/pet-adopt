const { connectRabbitMq } = require("./rabbitmq");

exports.publishMessage = async function (queue, message, rabbitmqUrl) {
  try {
    const { connection, channel } = await connectRabbitMq(rabbitmqUrl);

    await channel.assertQueue(queue, { durable: true });
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    console.log(`Message sent to queue ${queue}`, message);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Error publishing mesage:", error);
  }
};
