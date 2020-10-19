'use strict'

let currentDate = new Date();
import { shiftStatus } from '../config/statusConfig'
export default [
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    counterId: 1,
    statusId: shiftStatus.INACTIVE,
    shiftStart: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + "T08:00:00.000+07:00"),
    shiftEnd: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + "T12:00:00.000+07:00")
  },
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    counterId: 1,
    statusId: shiftStatus.ACTIVE,
    shiftStart: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + "T13:00:00.000+07:00"),
    shiftEnd: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + "T17:00:00.000+07:00")
  },

  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    counterId: 1,
    statusId: shiftStatus.UPCOMING,
    shiftStart: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 1) + "T18:00:00.000+07:00"),
    shiftEnd: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 1) + "T23:00:00.000+07:00")
  },

  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    counterId: 1,
    statusId: shiftStatus.UPCOMING,
    shiftStart: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 1) + "T08:00:00.000+07:00"),
    shiftEnd: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 1) + "T12:00:00.000+07:00")
  },
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    counterId: 1,
    statusId: shiftStatus.UPCOMING,
    shiftStart: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 1) + "T13:00:00.000+07:00"),
    shiftEnd: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 1) + "T17:00:00.000+07:00")
  },
]
