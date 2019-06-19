"use strict";

/**
 * Translates seconds into human readable format of seconds, minutes, hours, days, and years
 *
 * @param  {number} seconds The number of seconds to be processed
 * @return {string}         The phrase describing the the amount of time
 */
module.exports = function(seconds) {
  var levels = [
    [Math.floor(seconds / 31536000), "anos"],
    [Math.floor((seconds % 31536000) / 86400), "dias"],
    [Math.floor(((seconds % 31536000) % 86400) / 3600), "horas"],
    [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), "minutos"],
    [(((seconds % 31536000) % 86400) % 3600) % 60, "segundos"]
  ];

  var returntext = "";

  for (var i = 0, max = levels.length; i < max; i++) {
    if (levels[i][0] === 0) continue;
    returntext +=
      " " +
      levels[i][0] +
      " " +
      (levels[i][0] === 1
        ? levels[i][1].substr(0, levels[i][1].length - 1)
        : levels[i][1]);
  }

  return returntext.trim();
};
