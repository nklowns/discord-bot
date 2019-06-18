exports.run = function(msg, args) {
  msg.delete();
  let token = Math.floor(Math.random() * 90000) + 10000;
  let lenght = parseInt(args[0], 10) || 1;
  let speed = parseInt(args[1], 10) || 60;
  let message = args[2] || "Lorem Ipsum Dolor Sit Amet";

  let channel = msg.channel;

  console.log(
    `Spammer#${token} no [Canal ${channel}] a cada [${speed} Segundos] por [${lenght} Vezes]`
  );

  let spammerInterval = setInterval(function() {
    lenght--;

    channel.send(message);
    console.log(`Spammer#${token} Faltam ${lenght}`);

    if (lenght == 0) clearInterval(spammerInterval);
  }, speed * 1000); // Seconds to Miliseconds
};
