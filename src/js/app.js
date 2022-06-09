//Constants
const inputName = document.getElementById('name');
const inputNumberOfDays = document.getElementById('number-of-days')
const inputMorningStartTime = document.getElementById('morning-start-time');
const inputMorningArriveTime = document.getElementById('morning-arrive-time');
const inputNigthStartTime = document.getElementById('nigth-start-time');
const inputNigthArriveTime = document.getElementById('nigth-arrive-time');

const submitButton = document.getElementById('submit-btn');
const resetButton = document.getElementById('reset-btn');
const cleanButton = document.getElementById('clean-results-btn');

const resultsTitle = document.getElementById('results-title');
const divResults = document.getElementById('results');

// Form
const form = document.getElementById('time-calculus');


//Object form
let informationObject = {
    name: "",
    numberOfDays: "",
    morningStartTime: "",
    morningArriveTime: "",
    nigthStartTime: "",
    nigthArriveTime: "",
};



// Event Listeners
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', () => {
        form.addEventListener('submit', submitForm);
        submitButton.addEventListener('click', submitForm);
        resetButton.addEventListener('click', resetForm);
        cleanButton.addEventListener('click', cleanButtonActionUI);

        writeDefaultValuesInForm();
    })
    cleanButton.addEventListener('click', cleanResults);

}


// Functions

function writeDefaultValuesInForm(){
    inputName.value = "Santiago";
    inputNumberOfDays.value = 250;
    inputMorningStartTime.value = '08:00';
    inputMorningArriveTime.value = '09:30';
    inputNigthStartTime.value = '17:50';
    inputNigthArriveTime.value = '18:30';

}

function submitForm(e){
    e.preventDefault();

    cleanResults();


    let informationObject = {};

    const name = inputName.value;
    const numberOfDays = Number(inputNumberOfDays.value);
    const morningStartTime = inputMorningStartTime.value;
    const morningArriveTime = inputMorningArriveTime.value;
    const nigthStartTime = inputNigthStartTime.value;
    const nigthArriveTime = inputNigthArriveTime.value;

    if(
        name == "" ||
        (isNaN(numberOfDays) || numberOfDays <= 0) ||
        morningStartTime == "" ||
        morningArriveTime == "" ||
        nigthStartTime == "" ||
        nigthArriveTime == ""

    ) {
        alert("No ha diligenciado todos los campos del formulario", "error");
        return;
    }

    submitFormActionUI();


    informationObject = {
        name,
        numberOfDays,
        morningStartTime,
        morningArriveTime,
        nigthStartTime,
        nigthArriveTime
    }
    printName(informationObject);
    calculateTimeDifference(informationObject);
}

function submitFormActionUI(){
    
    form.classList.remove('showing')
    form.classList.add('hidden');

    submitButton.classList.remove('showing')
    submitButton.classList.add('hidden');
    
    resetButton.classList.remove('showing')
    resetButton.classList.add('hidden');
    
    cleanButton.classList.remove('hidden');
    cleanButton.classList.add('showing');
    
    resultsTitle.classList.remove('hidden');
    resultsTitle.classList.add('showing');
}

function cleanButtonActionUI(){
    form.classList.remove('hidden');
    form.classList.add('showing')

    cleanButton.classList.remove('showing');
    cleanButton.classList.add('hidden');
    
    resetButton.classList.remove('hidden');
    resetButton.classList.add('showing')

    submitButton.classList.remove('hidden');
    submitButton.classList.add('showing')

    resultsTitle.classList.remove('showing');
    resultsTitle.classList.add('hidden');
    
}

//Calculating values
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

function timeSum(timeValues){
    let result = [0,0];

    for(time in timeValues){
        let splitTime = timeValues[time].split(':');
        result[0] += Number(splitTime[0]);
        result[1] += Number(splitTime[1]);   
    }

    result[0] = result[0] + Math.floor(result[1] / 60);
    result[1] = result[1] % 60;

    let formatedTimeText = formatTime(result);

    return formatedTimeText;
}

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

// Showing results
function printTimeDifferenceResults(timeResultsObj){

    const divTimeResults = document.getElementById('time-results');


    for (time in timeResultsObj){
        const divResult = document.createElement('div');
        divResult.classList.add('result-container');

        const resultText = document.createElement('p');
        resultText.classList.add('text-result');
        resultText.innerHTML = `Tiempo de viaje: ${time}`;
        
        const resultMeasure = document.createElement('p')
        resultMeasure.classList.add('text-result-magnitude');
        if(time != 'totalTime'){
            resultMeasure.innerHTML = `[Hours : Minutes]`;
        }else{
            resultMeasure.innerHTML = `[Years : Months : Days : Hours : Minutes]`;
        }

        
        const resultValue = document.createElement('p');
        resultValue.classList.add('numeric-result');
        resultValue.innerHTML = `${timeResultsObj[time]}`;

        //formatTime

        divResult.appendChild(resultText);
        divResult.appendChild(resultMeasure);
        divResult.appendChild(resultValue);

        divTimeResults.appendChild(divResult);
    }

}

function printName(informationObject){

    const {name, numberOfDays} = informationObject;

    const divTimeResults = document.getElementById('time-results');

    const pName = document.createElement('p');
    pName.classList.add('p-Name');
    pName.innerHTML = `${name}, los tiempos para ${numberOfDays} días son:`;

    divTimeResults.appendChild(pName);
}

function cleanResults(){
    const divTimeResults = document.getElementById('time-results');
    cleanHTML(divTimeResults);
}

function resetForm(){
    form.reset();
}

function cleanHTML(container){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}
