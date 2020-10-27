'use strict'

import { setEpochTime } from '../../utils/timeUtil';
import { shiftStatus } from '../config/statusConfig'

let currentDate = new Date();
console.log(`======== Date : ${currentDate}`)
currentDate = setEpochTime(currentDate, 0, 0, 0, 0);
console.log(`======== Date Epoch: ${currentDate.getTime()}`)

function addEpochDaysAndHours(date, dayCount, hoursCount) {
  let result = new Date(date).getTime();
  //set date
  result += (3600 * 1000 * 24 * dayCount) + (3600 * 1000 * hoursCount)
  return result;
}

export default new Array(7).fill(0).map((e, day) => [[7, 12], [13, 17], [18, 23]].map(hours => ({
  employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
  counterId: 1,
  statusId: shiftStatus.UPCOMING,
  //shiftStart: currentDate | 07:00:00
  //shiftEnd: currentDate | 12:00:00
  shiftStart: addEpochDaysAndHours(currentDate, day, hours[0]),
  shiftEnd: addEpochDaysAndHours(currentDate, day, hours[1])
}))).reduce((r, n) => { r.push(...n); return r; }, [])
