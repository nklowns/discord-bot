exports.run = function(msg, args) {
  let lenght = args[0] || 1;
  let speed = args[1] || 60;
  let message = args[2] || "Lorem Ipsum Dolor Sit Amet";

  let channel = msg.channel;
  let spamInterval = setInterval(function() {
    if (lenght > 0) {
      while (lenght--) {
        channel.send(message);
      }
    } else {
      clearInterval(spamInterval);
    }
  }, speed * 1000); // Seconds to Miliseconds
};
