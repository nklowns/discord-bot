"use strict";

exports.run = function(msg, args) {
  msg.delete();

  msg.channel.send("Ping...").then(message => {
    message.edit(
      `Pong! < ${message.createdTimestamp - msg.createdTimestamp}ms`
    );
  });
};

exports.info = {
  name: "ping",
  aliases: ["pong", "ms"]
};
