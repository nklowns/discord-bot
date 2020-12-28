"use strict";

const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const Discord = require("discord.js");
const MYSELF = new Discord.Client(); //https://github.com/Pitu/Kuro

MYSELF.on("ready", () => {
  console.log("MYSELF: Started!");

  MYSELF.loadCommands();
});

MYSELF.on("reconnecting", () => {
  console.log("MYSELF: Reconnecting!");
});

MYSELF.on("disconnect", () => {
  console.log("MYSELF: Disconnected!");

  process.exit();
});

MYSELF.on("message", msg => {
  if (msg.author.id !== MYSELF.user.id) return;

  if (!msg.content.startsWith(">")) return;

  // Get all the arguments
  let tmp = msg.content.substring(1, msg.length).split("<");

  // Store all the args
  let args = [];
  for (let i = 1; i < tmp.length; i++) {
    args.push(tmp[i]);
  }

  // Store the command separately
  let command = MYSELF.handleCommand(tmp[0]);
  if (typeof command === "object" && command.hasOwnProperty("run"))
    return command.run(msg, args);

  return msg.delete();
});

MYSELF.loadCommands = function() {
  MYSELF.commands = {};

  fs.readdirSync("./commands/").forEach(file => {
    let basename = path.basename(file);
    if (!basename.endsWith(".js")) return;

    delete require.cache[require.resolve(`./commands/${file}`)];

    // Command Setup
    try {
      let command = require(`./commands/${file}`);
      if (!command.hasOwnProperty("info"))
        throw new Error("Undefined Command Info!");
      if (command.hasOwnProperty("init")) command.init(MYSELF);

      MYSELF.commands[basename] = command;
      console.log(`Module ${basename} has been ready!`);
    } catch (e) {
      console.log(`Error on module ${basename}:\n${e.stack}`);
    }
  });
};

MYSELF.handleCommand = function(type) {
  let cmd = _.find(MYSELF.commands, function(c) {
    return (
      (c.info.aliases instanceof Array && c.info.aliases.indexOf(type) > -1) ||
      c.info.name === type
    );
  });

  return cmd;
};

MYSELF.login(`${process.env.MYSELF_TOKEN}`);

process.on("unhandledRejection", err => {
  console.log(`Uncaught Promise Error:\n${err.stack}`);
});
