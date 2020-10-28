'use strict'
import { setEpochMillisTime } from '../../utils/timeUtil';

export default [
    {
        name: 'Morning',
        shiftStart: setEpochMillisTime(0, 7, 0, 0, 0),
        shiftEnd: setEpochMillisTime(0, 12, 0, 0, 0)
    },
    {
        name: 'After-noon',
        shiftStart: setEpochMillisTime(0, 13, 0, 0, 0),
        shiftEnd: setEpochMillisTime(0, 17, 0, 0, 0)

    },
    {
        name: 'Night',
        shiftStart: setEpochMillisTime(0, 18, 0, 0, 0),
        shiftEnd: setEpochMillisTime(0, 23, 0, 0, 0)
    },
]
