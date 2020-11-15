'use strict'

import { setEpochMillisTime, updateEpochMillisTime } from '../../utils/timeUtil';
import { shiftStatus } from '../config/statusConfig'

let currentDate = new Date((new Date().getTime() - 7*24*60*60*1000)).toLocaleString("en-US", {timeZone: "UTC"})
console.log(`======== Date : ${currentDate}`)
currentDate = setEpochMillisTime(currentDate, 0, 0, 0, 0);
console.log(`======== Date Epoch: ${currentDate}`)

export default new Array(7).fill(0).map((e, day) => new Array(6).fill(0).map((hours, index) => ({
  employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
  counterId: 1,
  statusId: shiftStatus.INACTIVE,
  shiftTypeId: index + 1,
  shiftDate: updateEpochMillisTime(currentDate, day, 0, 0, 0)
}))).reduce((r, n) => { r.push(...n); return r; }, [])
