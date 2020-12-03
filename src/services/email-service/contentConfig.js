'use strict'
export const mailTypes = {
  DAY_OFF: 'day_off',
  CHEERING: 'cheering',
  MAKE_APPOINTMENT: 'appointment',
  SUSPENSION: 'suspension'
}
export const mailContentsConfig = {
  CHEERING: "In recent days, we have found your behavior to be a bit <b>unstable</b>," +
    " where you would talk to customers with <b>a bit of aggression</b>, " +
    " which can negatively affect the overall look of the customer regarding the company." + "<br />" + "<br />" +
    "But we understand that everyone can have bad days. Therefore, our mood can affect our performance, " +
    " so instead of criticizing you, we want you to cheer up, take breaks when needed, and even talk " +
    " to us about how you are feeling right now. <br/>",

  MAKE_APPOINTMENT: "In recent days, we have found your behavior to be <b>unstable</b>," +
    " where you would talk to customers with <b>moderate levels of aggression</b>," +
    " which can negatively affect the overall look of the customer regarding the company." + "<br />" + "<br />" +
    "So we have decided to arrange a private meeting between you and the manager on: <br />",
  
  SUSPENSION: "In recent days, we have found your behavior to be <b>inappropriate</b>," +
    " your behavior toward customers were <b>aggressive</b>," +
    " which can negatively affect the overall look of the customer regarding the company." + "<br />" + "<br />" +
    "So we have decided that you should stop working and relax until: <br />",

  DAY_OFF: "Based on your behaviors during the past few days, we have found that <b>your mental health is declining</b>. <br/> <br/>  " +
    "Mental health is essential to everyone, especially for bank tellers. That's the reason why your manager has decided to let you take a day off. " + "<br />" + "<br />",

  STRESS_RELIEVING: "Based on your behaviors during your shift, we have found that you have been stressing out a lot." +
    " If your stress came from working at our company, we are sorry that you must endure that emotion. " + "<br />" + "<br />" +
    " We think that this video can help you relax a bit and relieve your stress." + "<br />" + "<br />"
  ,
  REGARD: "<br/> <i>Best regards, <br/> The ESMS Team <br/></i>"
}
export const mailClosingsConfig = {
  CHERRING: "Don't hesitate to contact us by any means.<br/> ",

  MAKE_APPOINTMENT: "It will be a casual meeting, so relax before coming and remember to be on time!<br/> ",

  SUSPENSION: "Please takes time to relax and watch some relax videos and guideline.<br/> ",

  DAY_OFF: "Don't worry about your attendance because our team has got you covered. So take your time and rest up.<br/> ",

  STRESS_RELIEVING: "If your feel like your emotion is still at rock-bottom, don't hesitate to contact with us." +
    " We will help you as much as we can.<br/> "
}

export const setAppointmentDate = (appointmentDate) => {
  const date = new Date(appointmentDate);
  const moment = require('moment-timezone');
  return "<h3>" + moment(date).tz("Asia/Ho_Chi_Minh").format("dddd, MMMM Do, YYYY [at] h:mm A") + "</h3"
  // let ordinal;
  // if (date.getDate() > 3 && date.getDate() < 21) {
  //   ordinal = 'th';
  // } else {
  //   switch (date.getDate() % 10) {
  //     case 1: ordinal = "st";
  //     case 2: ordinal = "nd";
  //     case 3: ordinal = "rd";
  //     default: ordinal = "th";
  //   }
  // }
  // return "<h3>" +
  //   date.toLocaleString('en-us', { weekday: 'long' }) + ", " +
  //   date.toLocaleString('en-us', { month: 'long' }) + " " +
  //   date.getDate() + "<sup>" + ordinal + "</sup>" + ", " +
  //   date.getFullYear() + " at " +
  //   date.toLocaleString('en-us', {
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   }) +
  //   "</h3>"
}

export const setVideoFrame = (videoUrl) => {
  return '<a href = "' + videoUrl + '"><button style="background-color:#4CAF50; color:white; padding:15px 32px; border:none;font-size:20px">View video</button></a><br/><br/>';
}