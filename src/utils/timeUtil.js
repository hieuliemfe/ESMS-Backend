'use strict'

export const convertToEpochMilis = (epoch) => {
  return epoch * 1000;
}
export const setEpochTime = (time, hours, minutes, seconds, milliseconds) => {
  let result = new Date(time);
  result.setHours(hours);
  result.setMinutes(minutes);
  result.setSeconds(seconds);
  result.setMilliseconds(milliseconds);
  return result;
}
