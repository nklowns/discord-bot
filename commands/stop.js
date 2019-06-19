"use strict";

exports.run = function(msg, args) {
  msg.delete().then(() => process.exit(1));
};

exports.info = {
  name: "stop",
  aliases: ["shutdown", "kill"]
};
