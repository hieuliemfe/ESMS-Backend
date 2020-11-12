'use strict'
import { setEpochMillisTime } from '../../utils/timeUtil';

export default [
    {
        name: 'Shift 1',
        shiftStart: setEpochMillisTime(0, 17, 0, 0, 0),
        shiftEnd: setEpochMillisTime(0, 21, 0, 0, 0)
    },
    {
        name: 'Shift 2',
        shiftStart: setEpochMillisTime(0, 21, 0, 0, 0),
        shiftEnd: setEpochMillisTime(0, 1, 0, 0, 0)

    },
    {
        name: 'Shift 3',
        shiftStart: setEpochMillisTime(0, 1, 0, 0, 0),
        shiftEnd: setEpochMillisTime(0, 5, 0, 0, 0)

    },
    {
        name: 'Shift 4',
        shiftStart: setEpochMillisTime(0, 5, 0, 0, 0),
        shiftEnd: setEpochMillisTime(0, 9, 0, 0, 0)

    },
    {
        name: 'Shift 5',
        shiftStart: setEpochMillisTime(0, 9, 0, 0, 0),
        shiftEnd: setEpochMillisTime(0, 13, 0, 0, 0)

    },
    {
        name: 'Shift 6',
        shiftStart: setEpochMillisTime(0, 13, 0, 0, 0),
        shiftEnd: setEpochMillisTime(0, 17, 0, 0, 0)

    },
]
