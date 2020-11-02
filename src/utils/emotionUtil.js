'use strict'

import stressLevelsConfig from '../configurations/stressLevels.json';
import negativeLevelConfig from '../configurations/negativeLevels.json';

export const calculateShiftEmotionLevel = (shiftSessions) => {
  let negativeEmotionTypes = negativeLevelConfig.negative_emotion_level_types;
  let typeCount = Array.from({ length: negativeEmotionTypes.length }, () => 0)
  shiftSessions.forEach(shiftSession => {
    const sessions = shiftSession.Session;
    sessions.forEach(session => {
      if (session.info != undefined) {
        const parsedInfo = JSON.parse(session.info)
        let totalSessionDuration = parsedInfo.total_session_duration;
        let angryPercentage = parsedInfo.emotions_duration[0] / totalSessionDuration;
        //if there's angry emotion found
        if (angryPercentage != 0) {
          let type = getSessionType(angryPercentage);
          typeCount[type] = typeCount[type] + 1;
        }
      }
    });
  });
  return typeCount
}

export const getSessionType = (angryPercentage) => {
  let negativeEmotionTypes = negativeLevelConfig.negative_emotion_level_types;
  for (var i = 0; i < negativeEmotionTypes.length; i++) {
    if (angryPercentage <= negativeEmotionTypes[i].value && angryPercentage > (negativeEmotionTypes[i + 1] == undefined ? 0 : negativeEmotionTypes[i + 1].value)) {
      console.log(`ANGRYPERCENTAGE:${angryPercentage}`)
      console.log(`=======================emotionType:${negativeEmotionTypes[i].type}`)
      return negativeEmotionTypes[i].type;
    }
  }
}

export const getTypeWarning = (typeCount) => {
  let negativeEmotionTypes = negativeLevelConfig.negative_emotion_level_types;
  for (var i = 0; i < typeCount.length; i++) {
    for (var j = 0; j < negativeEmotionTypes.length; j++) {
      if (typeCount[i] <= negativeEmotionTypes[j].limit) {
        return {
          warning: `There are ${typeCount[i]} sessions of this bank teller in which percentage of negative emotions is ${negativeEmotionTypes[j].value * 100}%.`,
          suggestedAction: `${negativeEmotionTypes[j].action}`
        }
      }
    }
  }
}

export const getEmotionSolution = (emotionLevel) => {
  let solutions = negativeLevelConfig.negative_levels
  for (var i = 0; i < solutions.length; i++) {
    if (stressLevel > solutions[i].value && stressLevel <= (solutions[i + 1] == undefined ? 1 : solutions[i + 1].value)) {
      return solutions[i]
    }
  }
  return null;
}

//sterss-related functions
export const calculateStressLevel = (shiftSessions) => {
  let angryDurationSum = 0, happyDurationSum = 0;
  let totalSessionDuration = 0;
  shiftSessions.forEach(session => {
    if (session.info != undefined) {
      const parsedInfo = JSON.parse(session.info)
      totalSessionDuration += parsedInfo.emotions_duration.reduce((a, b) => a + b, 0);
      angryDurationSum += parsedInfo.emotions_duration[0];
      happyDurationSum += parsedInfo.emotions_duration[3];
    }
  });
  const stressLevel = (angryDurationSum / totalSessionDuration);
  console.log(`=============stressLevel: ${stressLevel}`)
  return stressLevel;
}

export const getStressSolution = (stressLevel) => {
  let solutions = stressLevelsConfig.stress_levels
  for (var i = 0; i < solutions.length; i++) {
    if (stressLevel > solutions[i].value && stressLevel <= (solutions[i + 1] == undefined ? 1 : solutions[i + 1].value)) {
      return solutions[i]
    }
  }
  return null;
}

// export const getEmotionDurations = (session) => {
//   if (session.info != undefined) {

//     let emotionDurations = JSON.parse(session.info).emotions_duration;
//     let result = {
//       "angry": emotionDurations[0],
//       "disgusted": emotionDurations[1],
//       "fearful": emotionDurations[2],
//       "happy": emotionDurations[3],
//       "neutral": emotionDurations[4],
//       "sad": emotionDurations[5],
//       "suprised": emotionDurations[6],
//       "noFaceDetected": emotionDurations[7],
//     }
//     console.log(`=========result:${result}`)
//     return result;
//   }
// }

// export const calculateShiftEmotionLevel_OLD = (shiftSessions) => {
//   let positiveScoreSum = 0, negativeScoreSum = 0;
//   shiftSessions.forEach(shiftSession => {
//     const sessions = shiftSession.Session;
//     sessions.forEach(session => {
//       const emotionLevel = JSON.parse(session.info).emotion_level;
//       //if the emotion level is negative (-1<=level<0)
//       if (emotionLevel >= -1 && emotionLevel < 0) {
//         negativeScoreSum += ((2 / (1 + Math.exp(-10 * emotionLevel))) - 1) * emotionLevel;
//       }
//       //if the emotion level is positive (0<=level<=1)
//       if (emotionLevel >= 0 && emotionLevel <= 1) {
//         positiveScoreSum += ((2 / (1 + Math.exp(-3.7 * emotionLevel))) - 1) * emotionLevel;
//       }
//     });
//   });

//   const totalScoreSum = positiveScoreSum + negativeScoreSum;
//   const positivePercent = (positiveScoreSum / totalScoreSum) * 100;
//   const negativePercent = (negativeScoreSum / totalScoreSum) * 100;
//   const difference = positivePercent - negativePercent;
//   //2 / (1 +exp(-0.05*x)) -1
//   const shiftEmotionLevel = (2 / (1 + Math.exp(-0.05 * difference))) - 1;
//   return shiftEmotionLevel;
// }
