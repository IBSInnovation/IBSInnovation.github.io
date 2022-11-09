export function formatBirthDateToAge(dateString) {
  let birthdateTimeStamp = new Date(dateString);
  let currentDate = new Date();
  // This is the difference in milliseconds
  let diff = currentDate - birthdateTimeStamp;
  // Divide by 1000*60*60*24*365.25
  let currentAge = Math.floor(diff / 31557600000);

  return currentAge;
}
