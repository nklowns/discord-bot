"use strict";

const text_emojis = new Map([
  ["lenny", "( ͡° ͜ʖ ͡°)"],
  ["magic", "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧"],
  ["yay", "( ﾟヮﾟ)"],
  ["smile", "{◕ ◡ ◕}"],
  ["wizard", "(∩´• . •`)⊃━☆ﾟ.*"],
  ["happy", "╰( ◕ ᗜ ◕ )╯"],
  ["party", "(つ°ヮ°)つ"],
  ["dance", "└╏ ･ ᗜ ･ ╏┐"],
  ["disco", "（〜^∇^)〜"],
  ["woahmagic", "(∩｡･ｏ･｡)っ.ﾟ☆`｡"],
  ["rage", "(┛ಠДಠ)┛彡┻━┻"],
  ["excited", "☆*:. o(≧▽≦)o .:*☆"],
  ["music", "(✿ ◕ᗜ◕)━♫.*･｡ﾟ"],
  ["woah", "【 º □ º 】"],
  ["flipparty", "༼ノ◕ヮ◕༽ノ︵┻━┻"],
  ["sad", "(;﹏;)"],
  ["wink", "(^_-)"]
]);

exports.run = function(msg, args) {
  msg.delete();
  let emoji = args[0];

  if (text_emojis.has(emoji)) {
    setTimeout(() => {
      msg.channel.send(text_emojis.get(emoji));
    }, 500);
  }
};

exports.info = {
  name: "emoji",
  aliases: ["e"]
};
