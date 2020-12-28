"use strict";

exports.run = function(msg, args) {
  if (args.length === 0) return msg.delete();

  try {
    require("fs").readFile(`./commands/${args}.js`, "utf-8", (err, data) => {
      if (err) return console.log(err);

      msg.edit(
        `**__Overview of ${args}.js__**\n\`\`\`javascript\n${data}\n\`\`\``
      );
    });
  } catch (err) {
    return console.log(err);
  }
};

exports.info = {
  name: "debug",
  aliases: ["verbose", "d", "source"]
};
