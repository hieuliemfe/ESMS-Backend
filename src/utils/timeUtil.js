'use strict'

export const convertToEpochMilis = (epoch) => {
  return epoch * 1000;
}
export const updateEpochMillisTime =
  (date, dayCount, hourCount, minuteCount, secondCount) => {
    let result = new Date(date).getTime();
    //set date
    result += (3600 * 1000 * 24 * dayCount) + (3600 * 1000 * hourCount)
      + (60 * 1000 * minuteCount) + (1000 * secondCount)
    return result;
  }
export const setEpochMillisTime = (time, hours, minutes, seconds, milliseconds) => {
  let result = new Date(time);
  result.setUTCHours(hours);
  result.setUTCMinutes(minutes);
  result.setUTCSeconds(seconds);
  result.setUTCMilliseconds(milliseconds);
  return result;
}
