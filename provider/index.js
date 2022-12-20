const amqp = require("amqplib");
const morgan = require("morgan");
const express = require("express");

const app = express();

app.use(morgan("dev"));
app.get("/", function (req, res, next) {
  return res.send("Service B");
});

async function startService() {
  try {
    const queueName = "myqueue";
    const conn = await amqp.connect("amqp://localhost");

    const channel = await conn.createChannel("mychannel");
    await channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from("Hi"));
    console.log("Message sent");

    await channel.close();
    await conn.close();

    // app.listen(3001, function () {
    //   console.log("Service B started");
    // });
  } catch (error) {
    console.log(error);
  }
}

startService();
