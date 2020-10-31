'use strict'


export const calculateShiftEmotionLevel = (shiftSessions) => {
  let happyDurationSum = 0, angryDurationSum = 0, neutralDurationSum = 0;
  shiftSessions.forEach(shiftSession => {
    const sessions = shiftSession.Session;
    sessions.forEach(session => {
      if (session.info != undefined) {
        const emotionLevel = JSON.parse(session.info).emotion_level;
        //if the emotion level is negative (-1<=level<0)
        if (emotionLevel >= -1 && emotionLevel < 0) {
          negativeScoreSum += ((2 / (1 + Math.exp(-10 * emotionLevel))) - 1) * emotionLevel;
        }
        //if the emotion level is positive (0<=level<=1)
        if (emotionLevel >= 0 && emotionLevel <= 1) {
          positiveScoreSum += ((2 / (1 + Math.exp(-3.7 * emotionLevel))) - 1) * emotionLevel;
        }
      }
    });
  });
  const shiftEmotionLevel = angryDurationSum / (happyDurationSum + angryDurationSum + neutralDurationSum)
  return shiftEmotionLevel;
}
export const calculateStressLevel = (shiftSessions) => {
  let positiveDurationSum = 0, negativeDurationSum = 0, neutralDurationSum = 0;

  shiftSessions.forEach(session => {
    if (session.info != undefined) {
      const parsedInfo = JSON.parse(session.info)
      positiveDurationSum += parsedInfo.positive_emotions_duration;
      negativeDurationSum += parsedInfo.negative_emotions_duration;
      neutralDurationSum += parsedInfo.neutral_emotions_duration;
    }
  });

  const totalDuration = positiveDurationSum + negativeDurationSum + neutralDurationSum;
  const negativePercent = (negativeDurationSum / totalDuration) * 100;
  // 2 / (1 +exp(-0.06*x)) -1
  const stressLevel = (2 / (1 + Math.exp(-0.06 * negativePercent))) - 1;

  // console.log(`=============positive: ${positiveDurationSum}`)
  // console.log(`=============negative: ${negativeDurationSum}`)
  // console.log(`=============neutral: ${neutralDurationSum}`)
  console.log(`=============stressLevel: ${stressLevel}`)
  return stressLevel;
}

export const getEmotionDurations = (session) => {
  if (session.info != undefined) {

    let emotionDurations = JSON.parse(session.info).emotions_duration;
    let result = {
      "angry": emotionDurations[0],
      "disgusted": emotionDurations[1],
      "fearful": emotionDurations[2],
      "happy": emotionDurations[3],
      "neutral": emotionDurations[4],
      "sad": emotionDurations[5],
      "suprised": emotionDurations[6],
      "noFaceDetected": emotionDurations[7],
    }
    console.log(`=========result:${result}`)
    return result;
  }
}
