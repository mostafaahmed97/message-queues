const amqp = require("amqplib");
const morgan = require("morgan");
const express = require("express");

const app = express();

const directExchange = "oneListener";
const dispatchExchange = "anyListener";
const broadcastExchange = "allListeners";

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res, next) {
  return res.send("Event Producer");
});

async function startServer() {
  try {
    const conn = await amqp.connect("amqp://broker");
    const channel = await conn.createChannel("mychannel");

    await Promise.all([
      channel.assertExchange(directExchange, "direct", { durable: false }),
      channel.assertExchange(broadcastExchange, "fanout", { durable: false }),
      channel.assertExchange(dispatchExchange, "direct", { durable: false }),
    ]);

    async function publishMsg(msg, exchangeName) {
      const channel = await conn.createChannel();
      channel.publish(exchangeName, "", Buffer.from(msg));
      console.log("Published message to ", exchangeName);
      await channel.close();
    }

    app.get("/pubsub/:msg", (req, res) => {
      publishMsg(req.params.msg, broadcastExchange);
      return res.send("Sent to all");
    });

    app.get("/direct/:msg", (req, res) => {
      publishMsg(req.params.msg, directExchange);
      return res.send("Sent msg directly");
    });

    app.get("/workqueue/:msg", (req, res) => {
      publishMsg(req.params.msg, dispatchExchange);
      return res.send("Sent msg to any listener");
    });

    app.listen(3000, function () {
      console.log("Producer started");
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
