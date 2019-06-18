exports.run = function(msg, args) {
  msg.delete();

  console.log(args);
  console.log(JSON.stringify(args));
};
