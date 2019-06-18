let MYSELF;
exports.init = function(bot) {
  MYSELF = bot;
};

exports.run = function(msg, args) {
  let token = Math.floor(Math.random() * 90000) + 10000;
  let messagecount = parseInt(args[0], 10);

  console.log(
    `Purger#${token} no [Canal ${
      msg.channel
    }] removendo [${messagecount} Mensagens]`
  );

  msg.channel.fetchMessages({ limit: 100 }).then(messages => {
    let msgArray = messages.array();

    msgArray = msgArray.filter(m => m.author.id === MYSELF.user.id);
    msgArray.length = messagecount + 1;

    msgArray.map(function(m) {
      setTimeout(() => {
        m.delete();
      }, 500);
    });
  });
};
