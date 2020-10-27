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
    shiftStart: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate()) + "T18:00:00.000+07:00"),
    shiftEnd: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate()) + "T23:00:00.000+07:00")
  },
  //tomorrow:
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

  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    counterId: 1,
    statusId: shiftStatus.UPCOMING,
    shiftStart: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 1) + "T18:00:00.000+07:00"),
    shiftEnd: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 1) + "T23:00:00.000+07:00")
  },
  //next 2 days
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    counterId: 1,
    statusId: shiftStatus.UPCOMING,
    shiftStart: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 2) + "T08:00:00.000+07:00"),
    shiftEnd: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 2) + "T12:00:00.000+07:00")
  },
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    counterId: 1,
    statusId: shiftStatus.UPCOMING,
    shiftStart: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 2) + "T13:00:00.000+07:00"),
    shiftEnd: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 2) + "T17:00:00.000+07:00")
  },

  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    counterId: 1,
    statusId: shiftStatus.UPCOMING,
    shiftStart: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 2) + "T18:00:00.000+07:00"),
    shiftEnd: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 2) + "T23:00:00.000+07:00")
  },
  //next 4 days
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    counterId: 1,
    statusId: shiftStatus.UPCOMING,
    shiftStart: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 3) + "T08:00:00.000+07:00"),
    shiftEnd: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 3) + "T12:00:00.000+07:00")
  },
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    counterId: 1,
    statusId: shiftStatus.UPCOMING,
    shiftStart: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 3) + "T13:00:00.000+07:00"),
    shiftEnd: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 3) + "T17:00:00.000+07:00")
  },

  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    counterId: 1,
    statusId: shiftStatus.UPCOMING,
    shiftStart: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 3) + "T18:00:00.000+07:00"),
    shiftEnd: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 3) + "T23:00:00.000+07:00")
  },
  //next 4 days
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    counterId: 1,
    statusId: shiftStatus.UPCOMING,
    shiftStart: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 4) + "T08:00:00.000+07:00"),
    shiftEnd: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 4) + "T12:00:00.000+07:00")
  },
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    counterId: 1,
    statusId: shiftStatus.UPCOMING,
    shiftStart: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 4) + "T13:00:00.000+07:00"),
    shiftEnd: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 4) + "T17:00:00.000+07:00")
  },

  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    counterId: 1,
    statusId: shiftStatus.UPCOMING,
    shiftStart: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 4) + "T18:00:00.000+07:00"),
    shiftEnd: new Date("2020-" + (currentDate.getMonth() + 1) + "-" + (currentDate.getDate() + 4) + "T23:00:00.000+07:00")
  },
]
