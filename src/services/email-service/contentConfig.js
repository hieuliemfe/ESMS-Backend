'use strict'
export const mailTypes = {
  DAY_OFF: 'day_off',
  CHEERING: 'cheering',
  MAKE_APPOINTMENT: 'appointment'
}
export const mailContentsConfig = {
  CHEERING_CONTENT: "In recent days, we have found your behavior to be a bit <b>unstable</b>," +
    " where you would talk to customers with <b>a bit of aggression</b>, " +
    " which can negatively affect the overall look of the customer regarding the company." + "<br />" + "<br />" +
    "But we understand that everyone can have bad days. Therefore, our mood can affect our performance, " +
    " so instead of criticizing you, we want you to cheer up, take breaks when needed, and even talk " +
    " to us about how you are feeling right now. <br/>",

  MAKE_APPOINTMENT_CONTENT: "In recent days, we have found your behavior to be <b>unstable</b>," +
    " where you would talk to customers with <b>moderate levels of aggression</b>," +
    " which can negatively affect the overall look of the customer regarding the company." + "<br />" + "<br />" +
    "So we have decided to arrange a private meeting between you and the manager at: <br />",

  DAY_OFF_CONTENT: "Based on your behaviors during the past few days, we have found that <b>your mental health is declining</b>. <br/> <br/>  " +
    "Mental health is essential to everyone, especially for bank tellers. That's the reason why your manager has decided to let you take a day off. " + "<br />" + "<br />",

  REGARD: "<br/> <i>Best regards, <br/> The ESMS Team <br/></i>"
}
export const mailClosingsConfig = {
  CHERRING_CLOSING: "Don't hesitate to contact us by any means.<br/> ",

  MAKE_APPOINTMENT_CLOSING: "It will be a casual meeting, so relax before coming and remember to be on time!<br/> ",

  DAY_OFF_CLOSING: "Don't worry about your attendance because our team has got you covered. So take your time and rest up.<br/> "
}

export const setAppointmentDate = (appointmentDate) => {
  const date = new Date(appointmentDate);
  let ordinal;
  if (date.getDate() > 3 && date.getDate() < 21) {
    ordinal = 'th';
  } else {
    switch (date.getDate() % 10) {
      case 1: ordinal = "st";
      case 2: ordinal = "nd";
      case 3: ordinal = "rd";
      default: ordinal = "th";
    }
  }
  return "<h3>" +
    date.toLocaleString('en-us', { weekday: 'long' }) + ", " +
    date.toLocaleString('en-us', { month: 'long' }) + " " +
    date.getDate() + "<sup>" + ordinal + "</sup>" + ", " +
    date.getFullYear() + " at " +
    date.toLocaleString('en-us', {
      hour: '2-digit',
      minute: '2-digit'
    }) +
    "</h3>"
}
