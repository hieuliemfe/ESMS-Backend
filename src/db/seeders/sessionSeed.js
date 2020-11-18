'use strict'
import { setEpochMillisTime, updateEpochMillisTime } from '../../utils/timeUtil';
const date = new Date();
date.setDate(date.getDate() - 8 * 24 * 60 * 60 * 1000);
let currentDate = date.toLocaleString("en-US", { timeZone: "UTC" });
currentDate = setEpochMillisTime(currentDate, 0, 0, 0, 0);
export default [
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    shift_id: 1,
    sessionStart: updateEpochMillisTime(currentDate, 0, 7, 5, 0),
    sessionEnd: updateEpochMillisTime(currentDate, 0, 7, 40, 0),
    info: JSON.stringify(
      {
        "total_session_duration": 63642,
        "emotions_duration": [3000, 2000, 2000, 300, 5000, 100, 10, 0],
        "emotions_period_count": [0, 0, 0, 0, 1, 0, 0, 0],
        "negative_emotions_duration": 36000,
        "positive_emotions_duration": 15000,
        "neutral_emotions_duration": 12642,
        "no_face_detected_duration": 0,
        "negative_emotions_period_count": 5,
        "positive_emotions_period_count": 3,
        "neutral_emotion_period_count": 1,
        "no_face_detected_period_count": 0,
        "unidentified_period_duration": 2159,
        "no_face_detected_warning": 0,
        "angry_warning": 0,
        "angry_duration_warning_max": 0,
        "no_face_detected_duration_warning_max": 0,
        "emotionless_warning": false,
        "emotion_level": -0.5
      }
    ),
    angryWarningCount: 0
  },
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    shift_id: 1,
    sessionStart: updateEpochMillisTime(currentDate, 0, 7, 50, 0),
    sessionEnd: updateEpochMillisTime(currentDate, 0, 8, 0, 0),
    info: JSON.stringify(
      {
        "total_session_duration": 14801,
        "emotions_duration": [2000, 1000, 3000, 4000, 12642, 6000, 2000, 2500],
        "emotions_period_count": [0, 0, 0, 0, 1, 0, 0, 0],
        "negative_emotions_duration": 30000,
        "positive_emotions_duration": 35000,
        "neutral_emotions_duration": 60000,
        "no_face_detected_duration": 0,
        "negative_emotions_period_count": 0,
        "positive_emotions_period_count": 0,
        "neutral_emotion_period_count": 1,
        "no_face_detected_period_count": 0,
        "unidentified_period_duration": 2159,
        "no_face_detected_warning": 0,
        "angry_warning": 5,
        "angry_duration_warning_max": 0,
        "no_face_detected_duration_warning_max": 0,
        "emotionless_warning": true,
        "emotion_level": -1
      }
    ),
    angryWarningCount: 5
  },
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    shift_id: 1,
    sessionStart: updateEpochMillisTime(currentDate, 0, 8, 5, 0),
    sessionEnd: updateEpochMillisTime(currentDate, 0, 8, 40, 0),
    info: JSON.stringify(
      {
        "total_session_duration": 14801,
        "emotions_duration": [0, 0, 0, 0, 12642, 0, 0, 0],
        "emotions_period_count": [0, 0, 0, 0, 1, 0, 0, 0],
        "negative_emotions_duration": 45644,
        "positive_emotions_duration": 30000,
        "neutral_emotions_duration": 60000,
        "no_face_detected_duration": 0,
        "negative_emotions_period_count": 0,
        "positive_emotions_period_count": 0,
        "neutral_emotion_period_count": 1,
        "no_face_detected_period_count": 0,
        "unidentified_period_duration": 2159,
        "no_face_detected_warning": 0,
        "angry_warning": 4,
        "angry_duration_warning_max": 0,
        "no_face_detected_duration_warning_max": 0,
        "emotionless_warning": true,
        "emotion_level": -0.3
      }
    ),
    angryWarningCount: 4
  },
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    shift_id: 1,
    sessionStart: updateEpochMillisTime(currentDate, 0, 8, 55, 0),
    sessionEnd: updateEpochMillisTime(currentDate, 0, 9, 40, 0),
    info: JSON.stringify(
      {
        "total_session_duration": 14801,
        "emotions_duration": [0, 0, 0, 0, 12642, 0, 0, 0],
        "emotions_period_count": [0, 0, 0, 0, 1, 0, 0, 0],
        "negative_emotions_duration": 10000,
        "positive_emotions_duration": 30000,
        "neutral_emotions_duration": 45000,
        "no_face_detected_duration": 0,
        "negative_emotions_period_count": 0,
        "positive_emotions_period_count": 0,
        "neutral_emotion_period_count": 1,
        "no_face_detected_period_count": 0,
        "unidentified_period_duration": 2159,
        "no_face_detected_warning": 0,
        "angry_warning": 3,
        "angry_duration_warning_max": 0,
        "no_face_detected_duration_warning_max": 0,
        "emotionless_warning": true,
        "emotion_level": -1
      }
    ),
    angryWarningCount: 3
  },
  {
    employeeId: '513a3d36-ff0d-45cb-a052-a554602fe5a0',
    shift_id: 1,
    sessionStart: updateEpochMillisTime(currentDate, 0, 12, 5, 0),
    sessionEnd: updateEpochMillisTime(currentDate, 0, 12, 40, 0),
    info: JSON.stringify(
      {
        "total_session_duration": 14801,
        "emotions_duration": [0, 0, 0, 0, 12642, 0, 0, 0],
        "emotions_period_count": [0, 0, 0, 0, 1, 0, 0, 0],
        "negative_emotions_duration": 11122,
        "positive_emotions_duration": 32145,
        "neutral_emotions_duration": 10000,
        "no_face_detected_duration": 0,
        "negative_emotions_period_count": 0,
        "positive_emotions_period_count": 0,
        "neutral_emotion_period_count": 1,
        "no_face_detected_period_count": 0,
        "unidentified_period_duration": 2159,
        "no_face_detected_warning": 0,
        "angry_warning": 2,
        "angry_duration_warning_max": 0,
        "no_face_detected_duration_warning_max": 0,
        "emotionless_warning": true,
        "emotion_level": 0.6
      }
    ),
    angryWarningCount: 2
  },
]
