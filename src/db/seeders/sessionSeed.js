'use strict'
import { setEpochMillisTime } from '../../utils/timeUtil';

let currentDate = new Date();
console.log(`======== Date : ${currentDate}`)
currentDate = setEpochMillisTime(currentDate, 0, 0, 0, 0);
console.log(`======== Date Epoch: ${currentDate.getTime()}`)
export default [
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    shift_id: 1,
    sessionStart: setEpochMillisTime(currentDate, 7, 5, 0, 0),
    sessionEnd: setEpochMillisTime(currentDate, 7, 40, 0, 0),
    info: JSON.stringify(
      { "total_session_duration": 14801, "emotions_duration": [0, 0, 0, 0, 12642, 0, 0, 0], "emotions_period_count": [0, 0, 0, 0, 1, 0, 0, 0], "negative_emotions_duration": 0, "positive_emotions_duration": 0, "neutral_emotions_duration": 12642, "no_face_detected_duration": 0, "negative_emotions_period_count": 0, "positive_emotions_period_count": 0, "neutral_emotion_period_count": 1, "no_face_detected_period_count": 0, "unidentified_period_duration": 2159, "no_face_detected_warning": 0, "angry_warning": 0, "angry_duration_warning_max": 0, "no_face_detected_duration_warning_max": 0, "emotionless_warning": true, "emotion_level": -1 }
    )
  },
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    shift_id: 1,
    sessionStart: setEpochMillisTime(currentDate, 7, 30, 0, 0),
    sessionEnd: setEpochMillisTime(currentDate, 8, 0, 0, 0),
    info: JSON.stringify(
      { "total_session_duration": 14801, "emotions_duration": [0, 0, 0, 0, 12642, 0, 0, 0], "emotions_period_count": [0, 0, 0, 0, 1, 0, 0, 0], "negative_emotions_duration": 0, "positive_emotions_duration": 0, "neutral_emotions_duration": 12642, "no_face_detected_duration": 0, "negative_emotions_period_count": 0, "positive_emotions_period_count": 0, "neutral_emotion_period_count": 1, "no_face_detected_period_count": 0, "unidentified_period_duration": 2159, "no_face_detected_warning": 0, "angry_warning": 0, "angry_duration_warning_max": 0, "no_face_detected_duration_warning_max": 0, "emotionless_warning": true, "emotion_level": -1 }
    )
  },
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    shift_id: 1,
    sessionStart: setEpochMillisTime(currentDate, 8, 5, 0, 0),
    sessionEnd: setEpochMillisTime(currentDate, 8, 30, 0, 0),
    info: JSON.stringify(
      { "total_session_duration": 14801, "emotions_duration": [0, 0, 0, 0, 12642, 0, 0, 0], "emotions_period_count": [0, 0, 0, 0, 1, 0, 0, 0], "negative_emotions_duration": 0, "positive_emotions_duration": 0, "neutral_emotions_duration": 12642, "no_face_detected_duration": 0, "negative_emotions_period_count": 0, "positive_emotions_period_count": 0, "neutral_emotion_period_count": 1, "no_face_detected_period_count": 0, "unidentified_period_duration": 2159, "no_face_detected_warning": 0, "angry_warning": 0, "angry_duration_warning_max": 0, "no_face_detected_duration_warning_max": 0, "emotionless_warning": true, "emotion_level": -1 }
    )
  },
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    shift_id: 1,
    sessionStart: setEpochMillisTime(currentDate, 8, 45, 0, 0),
    sessionEnd: setEpochMillisTime(currentDate, 9, 0, 0, 0),
    info: JSON.stringify(
      { "total_session_duration": 14801, "emotions_duration": [0, 0, 0, 0, 12642, 0, 0, 0], "emotions_period_count": [0, 0, 0, 0, 1, 0, 0, 0], "negative_emotions_duration": 0, "positive_emotions_duration": 0, "neutral_emotions_duration": 12642, "no_face_detected_duration": 0, "negative_emotions_period_count": 0, "positive_emotions_period_count": 0, "neutral_emotion_period_count": 1, "no_face_detected_period_count": 0, "unidentified_period_duration": 2159, "no_face_detected_warning": 0, "angry_warning": 0, "angry_duration_warning_max": 0, "no_face_detected_duration_warning_max": 0, "emotionless_warning": true, "emotion_level": -1 }
    )
  },
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    shift_id: 1,
    sessionStart: setEpochMillisTime(currentDate, 9, 10, 0, 0),
    sessionEnd: setEpochMillisTime(currentDate, 9, 30, 0, 0),
    info: JSON.stringify(
      { "total_session_duration": 14801, "emotions_duration": [0, 0, 0, 0, 12642, 0, 0, 0], "emotions_period_count": [0, 0, 0, 0, 1, 0, 0, 0], "negative_emotions_duration": 0, "positive_emotions_duration": 0, "neutral_emotions_duration": 12642, "no_face_detected_duration": 0, "negative_emotions_period_count": 0, "positive_emotions_period_count": 0, "neutral_emotion_period_count": 1, "no_face_detected_period_count": 0, "unidentified_period_duration": 2159, "no_face_detected_warning": 0, "angry_warning": 0, "angry_duration_warning_max": 0, "no_face_detected_duration_warning_max": 0, "emotionless_warning": true, "emotion_level": -1 }
    )
  },
]
