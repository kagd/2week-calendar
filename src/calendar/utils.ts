export function months(year: number){
  return [
    {name: 'Jan', numberOfDays: 31},
    {name: 'Feb', numberOfDays: isLeapYear(year) ? 29 : 28},
    {name: 'Mar', numberOfDays: 31},
    {name: 'Apr', numberOfDays: 30},
    {name: 'May', numberOfDays: 31},
    {name: 'June', numberOfDays: 30},
    {name: 'July', numberOfDays: 31},
    {name: 'Aug', numberOfDays: 31},
    {name: 'Sept', numberOfDays: 30},
    {name: 'Oct', numberOfDays: 31},
    {name: 'Nov', numberOfDays: 30},
    {name: 'Dec', numberOfDays: 31},
  ];
}

const mondayDayOfWeekMapping = [
  // the JS Date API is zero-indexed with 0 being Sunday
  // so in order to support Monday as the display start
  // of the week we need to map the JS Date start of week
  // (0) to be the last in the array instead of first
  1,2,3,4,5,6,0
]

function dayOfWeekIndex(index: number, dayOfWeekIndexArray = mondayDayOfWeekMapping): number {
  return dayOfWeekIndexArray.indexOf(index);
}

function isLeapYear(year: number) {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

/**
 * @description Adds X number of days to the supplied date
 */
export function addDays(date: Date, numToAdd: number): NewDate {
  const dayOfMonth = date.getUTCDate();
  let newDayOfMonth = dayOfMonth + numToAdd;
  let month = date.getUTCMonth();
  let year = date.getUTCFullYear();
  let monthItem = months(year)[month];

  // If new day of the month is greater than the number
  // of days in the month go to next month and adjust
  // the day of the month accordingly.
  if(newDayOfMonth > monthItem.numberOfDays){
    // subtract the previous months days from the new day of month
    newDayOfMonth = newDayOfMonth - monthItem.numberOfDays;
    month++;
    monthItem = months(year)[month]; 
  }

  // if the month is beyond December (zero based month)
  // than change month to January and increment year
  if(month === 12){
    month = 0;
    year++;
    monthItem = months(year)[month];
  }

  return {
    month: month + 1, // non-zero index value
    monthName: monthItem.name,
    dayOfMonth: newDayOfMonth,
    year,
    fullDate: new Date(`${year}-${month + 1}-${newDayOfMonth}`),
  };
}

/**
 * @description Subtracts X days from given date 
 */
export function subtractDays(date: Date, numToSubtract: number ): NewDate{
  const dayOfMonth = date.getUTCDate();
  let newDayOfMonth = dayOfMonth - numToSubtract;
  let month = date.getUTCMonth();
  let year = date.getUTCFullYear();
  let monthItem = months(year)[month];
  let numDays = monthItem.numberOfDays;

  // If the new day of the month is less than the first of the month
  // decrement the month.
  if(newDayOfMonth < 1){
    // order matters here
    month--;

    // If the new month is not a valid month, set the month to December and
    // decrement the year
    if(month < 0){
      month = 11;
      year--;
    }

    monthItem = months(year)[month];
    numDays = monthItem.numberOfDays;
    newDayOfMonth = numDays + newDayOfMonth;
  }

  return {
    month: month + 1, // non-zero index value
    monthName: monthItem.name,
    dayOfMonth: newDayOfMonth,
    year,
    fullDate: new Date(`${year}-${month + 1}-${newDayOfMonth}`),
  };
}

export function getDatesFromRates(rates: Rate[]){
  const startDate = rates[0].transit.minimumPickupDate;
  const dayOfWeek = dayOfWeekIndex(startDate.getUTCDay());
  const isStartOfWeek = dayOfWeek === 0;
  const dates: RateDate[] = [];
  // if day is after the start of the week we have to
  // prepend blank days
  if(!isStartOfWeek){
    // console.log({dayOfWeek})
    for(let i = dayOfWeek; i > 0; i--){
      const {month, dayOfMonth, fullDate, monthName} = subtractDays(startDate, i);
      dates.push({month, dayOfMonth, fullDate, monthName});
    }
  }

  // populate rate days
  rates.forEach(function(rate, i){
    const month = rate.transit.minimumPickupDate.getUTCMonth();
    const dayOfMonth = rate.transit.minimumPickupDate.getUTCDate();
    const monthName = months(rate.transit.minimumPickupDate.getUTCFullYear())[month].name;
    dates.push({month, dayOfMonth, rate, fullDate: rate.transit.minimumPickupDate, monthName});
  });

  const lastRateDate = rates[rates.length - 1].transit.minimumPickupDate;
  const lastRateDayOfWeek = dayOfWeekIndex(lastRateDate.getUTCDay());
  const endsOnSaturday = lastRateDayOfWeek === 6;
  // if the last rate is prior to saturday
  // append blank days to fill out week
  if(!endsOnSaturday){
    for(let i = 1; i <= 6 - lastRateDayOfWeek; i++){
      const {month, dayOfMonth, fullDate, monthName} = addDays(lastRateDate, i);
      dates.push({month, dayOfMonth, fullDate, monthName});
    }
  }

  return dates;
}