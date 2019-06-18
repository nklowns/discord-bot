let MYSELF;
exports.init = function(bot) {
  MYSELF = bot;
};

exports.run = function(msg, args) {
  let messagecount = parseInt(args, 10);

  msg.channel.fetchMessages({ limit: 100 }).then(messages => {
    let msgArray = messages.array();

    msgArray = msgArray.filter(m => m.author.id === MYSELF.user.id);
    msgArray.length = messagecount + 1;

    msgArray.map(function(m) {
      setInterval(() => m.delete(), 500).catch(console.error);
    });
  });
};
