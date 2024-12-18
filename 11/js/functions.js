// const isWithinWorkingHours = (workdayStart, workdayEnd, meetingStart, meetingLength) => {
//   const convertToMinutes = (timeString) => {
//       const [hours, minutes] = timeString.split(':');
//       return (Number(hours) * 60) + Number(minutes)
//   };
//   const workdayStartMinutes = convertToMinutes(workdayStart);
//   const workdayEndMinutes = convertToMinutes(workdayEnd);
//   const meetingStartMinutes = convertToMinutes(meetingStart);
//   const meetingEndMinutes = meetingStartMinutes + meetingLength;
//   return meetingStartMinutes >= workdayStartMinutes && meetingEndMinutes <= workdayEndMinutes
// };

// console.log(isWithinWorkingHours('08:00', '17:30', '14:00', 90));
// console.log(isWithinWorkingHours('8:0', '10:0', '8:0', 120));
// console.log(isWithinWorkingHours('08:00', '14:30', '14:00', 90));
// console.log(isWithinWorkingHours('14:00', '17:30', '08:0', 90));
// console.log(isWithinWorkingHours('8:00', '17:30', '08:00', 900));
