# Messaging Queues Using RabbitMQ & Nodejs

A messaging queue is a component that enables event driven communication between components in a system.

Their use cases include

- Decouple system components
- Offloading intensive workloads
- Notify components of a system about a change
- Performing time insensitive actions while not blocking a system (sending email,notifications, etc...)

and many others.

## How it works

A message queue generally consists of the following parts:

- **Event Producers**, processes that generate events
- **Event Consumers**, processes that handle events
- **Message Queues**, groupings of events that are awaiting delivery to consumers
- **Message Brokers**, co-ordinates message delivery from queues to consumers & handles retries, delivery acknowledgments, etc...
