'use strict'

export const calculateShiftEmotionLevel = (shiftSessions) => {
  let positiveScoreSum = 0, negativeScoreSum = 0;
  shiftSessions.forEach(shiftSession => {
    const sessions = shiftSession.Session;
    sessions.forEach(session => {
      const emotionLevel = JSON.parse(session.info).emotion_level;
      //if the emotion level is negative (-1<=level<0)
      if (emotionLevel >= -1 && emotionLevel < 0) {
        negativeScoreSum += ((2 / (1 + Math.exp(-10 * emotionLevel))) - 1) * emotionLevel;
      }
      //if the emotion level is positive (0<=level<=1)
      if (emotionLevel >= 0 && emotionLevel <= 1) {
        positiveScoreSum += ((2 / (1 + Math.exp(-3.7 * emotionLevel))) - 1) * emotionLevel;
      }
    });
  });
  // console.log(`=============positive: ${positiveScoreSum}`)
  // console.log(`=============negative: ${negativeScoreSum}`)
  const totalScoreSum = positiveScoreSum + negativeScoreSum;
  const positivePercent = (positiveScoreSum / totalScoreSum) * 100;
  const negativePercent = (negativeScoreSum / totalScoreSum) * 100;
  // console.log(`=============positive: ${positivePercent}`)
  // console.log(`=============negative: ${negativePercent}`)
  const difference = positivePercent - negativePercent;
  // console.log(`=============difference: ${difference}`)
  //2 / (1 +exp(-0.05*x)) -1
  const shiftEmotionLevel = (2 / (1 + Math.exp(-0.05 * difference))) - 1;
  // console.log(`=============shiftEmo: ${shiftEmotionLevel}`)
  return shiftEmotionLevel;
}