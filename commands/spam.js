"use strict";

exports.run = function(msg, args) {
  msg.delete();
  const time2Humans = require("../utils/time2humans");

  let token = Math.floor(Math.random() * 90000) + 10000;
  let lenght = parseInt(args[0], 10) || 1;
  let speed = parseInt(args[1], 10) || 60;
  let message = args[2] || "Lorem Ipsum Dolor Sit Amet";

  let channel = msg.channel;

  console.log(
    `Spammer#${token} rodando no [Servidor ${msg.guild.name}] [Canal #${
      msg.channel.name
    }] a cada [${speed} Segundos] por [${lenght} Vezes] demorando [${time2Humans(
      speed * lenght
    )}]`
  );

  let spammerInterval = setInterval(function() {
    lenght--;

    channel.send(message);
    console.log(`Spammer#${token} Faltam ${lenght}`);

    if (lenght == 0) clearInterval(spammerInterval);
  }, speed * 1000); // Seconds to Miliseconds
};

exports.info = {
  name: "spam",
  aliases: ["yell", "loop"]
};
