let MYSELF;
exports.init = function(bot) {
  MYSELF = bot;
};

exports.run = function(msg, args) {
  if (args.length === 0)
    return MYSELF.edit(msg, "You need to provide a file", 1000);

  try {
    require("fs").readFile(`./commands/${args}.js`, "utf-8", (err, data) => {
      if (err) return MYSELF.error(err);
      return msg.edit(
        `**__Overview of ${args}.js__**\n\`\`\`javascript\n${data}\n\`\`\``
      );
    });
  } catch (err) {
    MYSELF.error(err);
    return MYSELF.edit(msg, `Error \n${err}`);
  }
};
