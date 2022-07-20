function textTimeToDateFormat(textHoursMinutes){
    let textSplited = textHoursMinutes.split(':');
    let hours = Number(textSplited[0]);
    let minutes = Number(textSplited[1]);

    let newDate = new Date(Date.UTC( 2000, 1, 1, hours, minutes)); //{ 'Wed Jan 31 1900 23:58:44 GMT-0456 (Colombia Standard Time)' }
    
    return newDate;
}

function calculateTimeDifference2(startTime, finalTime){
    let timeDifference = null;
    
    let hoursDifference = finalTime.getUTCHours() - startTime.getUTCHours();
    let minutesDifference = finalTime.getUTCMinutes() - startTime.getUTCMinutes();

    // Correction when finalTime has more minutes than startTime
    if(minutesDifference < 0){
        minutesDifference += 60;
        hoursDifference -= 1;
    }

    //Saving the diference as a Date format
    //year 2010 works as a flag to identify dates storing differences
    timeDifference = new Date( Date.UTC(2010, 1, 1, hoursDifference, minutesDifference));

    return timeDifference;
}

/* 
    Sum 2 times to obtain total time per day
*/
function sumHoursAndMinutes( date1, date2){
    let totalTime = null;

    let hourDate1 = date1.getUTCHours();
    let minDate1 = date1.getUTCMinutes();

    let hourDate2 = date2.getUTCHours();
    let minDate2 = date2.getUTCMinutes();
    
    // SUM
    let totalHours = hourDate1 + hourDate2;
    let totalMinutes = minDate1 + minDate2;

    if(totalMinutes >= 60){
        totalHours +=1;
        totalMinutes -= 60;
    }

    totalTime = new Date( Date.UTC(2000, 1, 1, totalHours, totalMinutes)); 

    return totalTime;
}


/*
 Multiply time range and days quantity
*/
function multiplyTime(date, daysQuantity){
    
    const minutesPerHour = 60;
    const hoursPerDay = 24;
    const daysPerMonth = 30;
    const monthsPerYear = 12;

    let totalTime = {};
    
    let initHour = date.getUTCHours();
    let initMinutes = date.getUTCMinutes();
    
    // Initial values multiplied by quantity of days
    let minutes = initMinutes * daysQuantity;
    let hours = initHour * daysQuantity;
    
    // calculus of total minutes and the equivalent in hours without the remainder
    let minutesToHours = Math.floor( minutes / minutesPerHour );
    let totalMinutes =  minutes % minutesPerHour;
    
    // calculus of total hours and the equivalent in days without the remainder
    let hoursToDays = Math.floor( (hours + minutesToHours) / hoursPerDay);
    let totalHours = (hours + minutesToHours) % hoursPerDay;
    
    // calculus of total days and the equivalent in Months without the remainder
    let daysToMonths = Math.floor( hoursToDays / daysPerMonth);
    let totalDays = hoursToDays % daysPerMonth;
    
    // calculus of total months and the equivalent in years without the remainder
    let monthsToYears = Math.floor( daysToMonths / monthsPerYear);
    let totalMonths = daysToMonths % monthsPerYear;

    // calculus of total years
    let totalYears = monthsToYears;

    totalTime = {
        totalYears, 
        totalMonths, 
        totalDays, 
        totalHours, 
        totalMinutes
    }
    console.log(totalTime);
    console.log({totalTime});
    return totalTime;
}


export {
    textTimeToDateFormat,
    calculateTimeDifference2,
    sumHoursAndMinutes,
    multiplyTime

}