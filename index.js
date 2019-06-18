const fs = require("fs");

const Discord = require("discord.js");
const MYSELF = new Discord.Client(); //https://github.com/Pitu/Kuro

MYSELF.on("ready", () => {
  console.log("MYSELF STARTED!");
  MYSELF.loadCommands();
});

MYSELF.on("disconnect", () => {
  console.log("CLIENT: Disconnected!");
  process.exit();
});

MYSELF.on("message", msg => {
  // if (msg.author.id !== MYSELF.user.id) return;

  if (!msg.content.startsWith("!>")) return;

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

      console.log(`>Module ${name} is ready!`);
    } catch (e) {
      console.log(`<Error in module ${name}:\n${e.stack}`);
    }
  });
};

MYSELF.login(`${process.env.MYSELF_TOKEN}`);

process.on("unhandledRejection", err => {
  console.log(`Uncaught Promise Error:\n${err.stack}`);
});
