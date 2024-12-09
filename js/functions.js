const getTime = (timeString) => [Number(timeString.split(':')[0]), Number(timeString.split(':')[1])];

const isWithinWorkingHours = (workdayStart, workdayEnd, meetingStart, meetingLength) => {

  const workdayStartTime = getTime(workdayStart);
  const workdayEndTime = getTime(workdayEnd);
  const meetingStartTime = getTime(meetingStart);
  const meetingDuration = [Math.floor(meetingLength / 60), meetingLength - Math.floor(meetingLength / 60) * 60]
  const meetingEndTime = [meetingStartTime[0] + meetingDuration[0], meetingStartTime[1] + meetingDuration[1]]
  if (meetingEndTime[1] >= 60) {
    meetingEndTime[0] += 1;
    meetingEndTime[1] -= 60;
  };
  if (
    (workdayStartTime[0] > meetingStartTime[0]) ||
    (workdayStartTime[0] === meetingStartTime[0] && workdayStartTime[1] > meetingStartTime[1]) ||
    (workdayEndTime[0] < meetingEndTime[0]) ||
    (workdayEndTime[0] === meetingEndTime[0] && workdayEndTime[1] < meetingEndTime[1])) {
    return false
  };
  return true;
};

console.log(isWithinWorkingHours('08:00', '17:30', '14:00', 90));
console.log(isWithinWorkingHours('8:0', '10:0', '8:0', 120));
console.log(isWithinWorkingHours('08:00', '14:30', '14:00', 90));
console.log(isWithinWorkingHours('14:00', '17:30', '08:0', 90));
console.log(isWithinWorkingHours('8:00', '17:30', '08:00', 900));
