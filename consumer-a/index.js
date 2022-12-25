const amqplib = require("amqplib");

const directExchange = "oneListener";
const dispatchExchange = "anyListener";
const broadcastExchange = "allListeners";

async function createConsumer({
  channel,
  queueName,
  exchangeName,
  exchangeType,
}) {
  const q = await channel.assertQueue(queueName);
  await channel.assertExchange(exchangeName, exchangeType, { durable: false });
  await channel.bindQueue(q.queue, exchangeName);

  channel.consume(q.queue, (msg) => {
    const msgString = msg.content.toString();
    console.log(`Message at A, Queue -> ${queueName} : ${msgString}`);
    channel.ack(msg);
  });
}

async function start() {
  try {
    console.log("Consumer A Listening...");
    const conn = await amqplib.connect("amqp://broker");
    const channel = await conn.createChannel();

    await createConsumer({
      channel,
      exchangeType: "fanout",
      exchangeName: broadcastExchange,
      queueName: "broadcastAQueue",
    });

    await createConsumer({
      channel,
      exchangeType: "direct",
      exchangeName: directExchange,
      queueName: "directQueue",
    });

    await createConsumer({
      channel,
      exchangeType: "direct",
      exchangeName: dispatchExchange,
      queueName: "dispatchQueue",
    });
  } catch (error) {
    console.log(error);
  }
}

start();
