exports.run = function(msg, args) {
  msg.delete();
  msg.channel.send("", {
    embed: {
      title: "NKS > DEBUG ARGS",
      description: `${alert(args)}`
    }
  });
};
