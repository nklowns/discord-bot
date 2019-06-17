const fs = require("fs");

const Discord = require("discord.js");
const MYSELF = new Discord.Client();

MYSELF.on("ready", () => {
  console.log("MYSELF STARTED!");
  MYSELF.loadCommands();
});

MYSELF.on("message", msg => {
  if (msg.author.id !== MYSELF.user.id) return;

  if (!msg.content.startsWith("[MYSELF]>")) return;

  // Get all the arguments
  let tmp = msg.content.substring(6, msg.length).split("<");

  // Store the command separately
  let cmd = tmp[0];

  // Store all the args
  let args = [];
  for (let i = 1; i < tmp.length; i++) {
    args.push(tmp[i]);
  }

  if (MYSELF.modules.hasOwnProperty(cmd))
    return MYSELF.modules[cmd].run(msg, args);

  return msg.delete();
});

MYSELF.loadCommands = function() {
  MYSELF.modules = {};

  fs.readdirSync("./commands/").forEach(file => {
    let name = file.slice(0, -3);

    delete require.cache[require.resolve(`./commands/${file}`)];

    try {
      MYSELF.modules[name] = require(`./commands/${file}`);
      if (MYSELF.modules[name].hasOwnProperty("init")) {
        MYSELF.modules[name].init(MYSELF);
      }

      MYSELF.log(`>Module ${name} is ready!`);
    } catch (e) {
      MYSELF.error(`<Error in module ${name}:\n${e.stack}`);
    }
  });
};

MYSELF.edit = function(msg, content, timeout = 3000) {
  if (timeout === 0) return msg.edit(content).catch(console.error);

  return msg.edit(content).then(() => {
    setTimeout(() => msg.delete().catch(console.error), timeout);
  });
};

MYSELF.login(process.env.MYSELF_TOKEN);
