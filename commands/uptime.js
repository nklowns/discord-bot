exports.run = function(msg) {
  msg.channel.send("[MYSELF]<").then(message => {
    message.edit("", {
      embed: {
        title: "NKS",
        description: `${secondsToString(process.uptime())}`
      }
    });
  });
};

function secondsToString(seconds) {
  seconds = Math.trunc(seconds);
  let numdays = Math.floor((seconds % 31536000) / 86400);
  let numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
  let numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  let numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
  return `${numdays}:${numhours}:${numminutes}:${numseconds}`;
}
