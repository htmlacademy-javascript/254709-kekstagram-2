const getHours = (timeString) => Number(timeString.split(':')[0]);
const getMinutes = (timeString) => Number(timeString.split(':')[0]);

const isWithinWorkingHours = (workdayStart, workdayEnd, meetingStart, meetingLength) => {

  // Получаем часы и минуты начала рабочего дня
  let workdayStartHours = getHours(workdayStart);
  let workdayStartMinutes = getMinutes(workdayStart);

  // Получаем часы и минуты конца рабочего дня
  let workdayEndHours = getHours(workdayEnd);
  let workdayEndMinutes = getMinutes(workdayEnd);

// Получаем часы и минуты начала встречи
  let meetingStartHours = getHours(meetingStart);
  let meetingStartMinutes = getMinutes(meetingStart);

// Получаем часы и минуты конца встречи
  let meetingEndHours = meetingStartHours + Math.floor(meetingLength / 60);
  let meetingEndMinutes = meetingStartMinutes + (meetingLength - meetingEndHours * 60);
  if (meetingEndMinutes >= 60) {
    meetingEndHours += 1;
    meetingEndMinutes -= 60;
  };

  // Проверяем начало и конец встречи на выход за рабочий день
  if ((workdayStartHours > meetingStartHours) || (workdayStartHours === meetingStartHours && workdayStartMinutes > meetingStartMinutes) || (workdayEndHours < meetingEndHours) || (workdayEndHours === meetingEndHours && workdayEndMinutes < meetingEndMinutes)) {
    return false
  };
  return true;
};

console.log(isWithinWorkingHours('08:00', '17:30', '14:00', 90));
console.log(isWithinWorkingHours('8:0', '10:0', '8:0', 120));
console.log(isWithinWorkingHours('08:00', '14:30', '14:00', 90));
console.log(isWithinWorkingHours('14:00', '17:30', '08:0', 90));
console.log(isWithinWorkingHours('8:00', '17:30', '08:00', 900));
