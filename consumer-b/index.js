// const morgan = require("morgan");
// const express = require("express");

// const app = express();

// app.use(morgan("dev"));
// app.get("/", function (req, res, next) {
//   return res.send("Service A");
// });

// app.listen(3000, function () {
//   console.log("Service A started");
// });

const amqplib = require("amqplib");

async function start() {
  try {
    console.log("Listening");
    const queueName = "myqueue";
    const conn = await amqplib.connect("amqp://localhost");
    const channel = await conn.createChannel();

    channel.assertQueue(queueName, { durable: false });
    channel.consume(
      queueName,
      (msg) => {
        console.log("Recieved msg at C", msg.content.toString());
        channel.ack(msg);
      },
      {
        noAck: false,
      }
    );

    console.log("Started the consumer");
  } catch (error) {
    console.log(error);
  }
}

start();
