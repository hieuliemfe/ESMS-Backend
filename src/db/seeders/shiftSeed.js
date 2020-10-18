'use strict'

let currentDate = new Date();
currentDate.setHours(currentDate.getHours() + 7);

export default [
    {
        employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
        counterId: 1,
        shiftStart: currentDate,
        shiftEnd: new Date("2020-10-16T00:00:00.000+07:00")

    },
    {
        employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
        counterId: 1,
        shiftStart: new Date(2020, 9, 16, 15),
        shiftEnd: new Date(2020, 9, 17, 0)

    },
    {
        employeeId: 'ef71e125-37b5-4a5f-87e1-fdda43a4ccb2',
        counterId: 2,

    },
    {
        employeeId: 'ef71e125-37b5-4a5f-87e1-fdda43a4ccb2',
        counterId: 4,
        
    },
]
