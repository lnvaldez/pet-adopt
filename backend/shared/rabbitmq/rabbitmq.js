const amqp = require("amqplib");

exports.connectRabbitMq = async function (rabbitmqUrl) {
  try {
    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");
    return { connection, channel };
  } catch (error) {
    console.error("Error connecting to RabbitMQ: ", error);
    throw error;
  }
};
