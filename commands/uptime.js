"use strict";

exports.run = function(msg, args) {
  msg.delete();
  const time2Humans = require("../utils/time2humans");

  msg.channel.send("", {
    embed: {
      title: "NKS > ROLLING",
      description: `[${time2Humans(process.uptime())}]`
    }
  });
};

exports.info = {
  name: "uptime",
  aliases: ["up", "info"]
};
