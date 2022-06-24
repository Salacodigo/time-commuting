
import { 
    printTimeDifferenceResults
} from "./UI.js"



// Read form response and calculate time differences
function calculateTimeDifference(informationObject){
    const {
        numberOfDays,
        morningStartTime,
        morningArriveTime,
        nigthStartTime,
        nigthArriveTime
    } = informationObject;

    let morningTime = '00:00';
    let nigthTime = '00:00';

    try {
        morningTime = timeDifference(morningStartTime, morningArriveTime);
        nigthTime = timeDifference(nigthStartTime, nigthArriveTime);
    
    } catch (error) {
        console.error(error);
        return;
    }

    let totalTimePerDay = timeSum({morningTime,
        nigthTime});
    let totalTime = calculateTotalTime(totalTimePerDay, numberOfDays);

    let timesObj = {
        morningTime,
        nigthTime,
        totalTimePerDay,
        totalTime
    }
    
    printTimeDifferenceResults(timesObj);
}

// Slice the text time and build and array to manipulate the numbers
function timeSum(timeValues){
    let result = [0,0];

    for(let time in timeValues){
        let splitTime = timeValues[time].split(':');
        result[0] += Number(splitTime[0]);
        result[1] += Number(splitTime[1]);   
    }

    result[0] = result[0] + Math.floor(result[1] / 60);
    result[1] = result[1] % 60;

    let formatedTimeText = formatTime(result);

    return formatedTimeText;
}

// Return an array with the time format as shown in the UI, with semicolon between time magnitudes
function formatTime(array){
    let resultText = '';
    let arraySize = array.length;

    for( let position = 0; position < arraySize ; position++ ){
        if(position == arraySize -1){
            if(array[position] < 10){
                resultText += `0${array[position]}`;
            } else {
                resultText += `${array[position]}`;
            }
        } else {
            if(array[position] < 10){
                resultText += `0${array[position]}:`;
            } else {
                resultText += `${array[position]}:`;
            }
        }
    }

    return resultText;
}

// Return the time difference between 2 timestamps
function timeDifference(startTime, endTime){

    let startTimeArray = startTime.split(':');
    let endTimeArray = endTime.split(':');

    let differenceCalculated =[]

    if (Number(endTimeArray[1]) - Number(startTimeArray[1]) < 0){
        differenceCalculated[0] = 
            Number(endTimeArray[0]) - startTimeArray[0] - 1,
        differenceCalculated[1] = 
            Number(endTimeArray[1]) + 60 - Number(startTimeArray[1])
    } else {
        differenceCalculated = [
            endTimeArray[0] - startTimeArray[0],
            endTimeArray[1] - startTimeArray[1]
        ]
    }

    let formatedTextTime = formatTime(differenceCalculated);

    return formatedTextTime;
}

// Calculate the total time taking in consideration the number of days
function calculateTotalTime(totalTimePerDay, numberOfDays){
    
    const minutesPerHour = 60;
    const hoursPerDay = 24;
    const daysPerMonth = 30;
    const monthsPerYear = 12;

    let timeSplit = totalTimePerDay.split(':');
    let minutes = 4;
    let hours = 3;
    let days = 2;
    let months = 1;
    let years = 0;

    let result = [0,0,0,0,0] // years, months, days, hours, minutes

    //Total time
    result[minutes] = timeSplit[1] * numberOfDays;
    result[hours] = timeSplit[0] * numberOfDays;

    //Formating time
    result[hours] = result[hours] + Math.floor(result[minutes] / minutesPerHour);
    result[minutes] = result[minutes] % minutesPerHour;
    
    result[days] = result[days] + Math.floor(result[hours] / hoursPerDay);
    result[hours] = result[hours] % hoursPerDay;

    result[months] = result[months] + Math.floor(result[days] / daysPerMonth);
    result[days] = result[days] % daysPerMonth;

    result[years] = result[years] + Math.floor(result[months] / monthsPerYear);
    result[months] = result[months] % monthsPerYear;
    
    let formatedTextTime = formatTime(result);

    return formatedTextTime;
}




export {
    timeSum,
    formatTime,
    calculateTotalTime,
    calculateTimeDifference,
    timeDifference
}