//Constants
const inputName = document.getElementById('name');
const inputNumberOfDays = document.getElementById('number-of-days')
const inputMorningStartTime = document.getElementById('morning-start-time');
const inputMorningArriveTime = document.getElementById('morning-arrive-time');
const inputNigthStartTime = document.getElementById('nigth-start-time');
const inputNigthArriveTime = document.getElementById('nigth-arrive-time');

const submitButton = document.getElementById('submit-btn');
const cleanButton = document.getElementById('clean-results-btn');


const divResults = document.getElementById('results');

//Object form
let informationObject = {
    name: "",
    numberOfDays: "",
    morningStartTime: "",
    morningArriveTime: "",
    nigthStartTime: "",
    nigthArriveTime: "",
};

// Form
const form = document.getElementById('time-calculus');


// Event Listeners
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', () => {
        form.addEventListener('submit', submitForm)
        writeDefaultValuesInForm();
    })
    cleanButton.addEventListener('click', cleanResults);

}


// Functions

function writeDefaultValuesInForm(){
    inputName.value = "Santiago";
    inputNumberOfDays.value = 1;
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
        return;
    }


    informationObject = {
        name,
        numberOfDays,
        morningStartTime,
        morningArriveTime,
        nigthStartTime,
        nigthArriveTime
    }

    console.log(informationObject)

    calculateTimeDifference(informationObject);
}

//Calculating values
function calculateTimeDifference(informationObject){

    const {
        morningStartTime,
        morningArriveTime,
        nigthStartTime,
        nigthArriveTime
    } = informationObject;
    
    let diferenciaEntreHoras = 0;
    diferenciaEntreHoras = morningArriveTime - morningStartTime;

    console.log({diferenciaEntreHoras});

    let morningTime = '00:20:00';
    let nigthTime = '00:40:00';

    let timeDifferences = {
        morningTime,
        nigthTime
    }
    
    printTimeDifferenceResults(timeDifferences);
}

// Showing results
function printTimeDifferenceResults(timeDifferences){

    const divTimeResults = document.getElementById('time-results');


    for (time in timeDifferences){
        const divResult = document.createElement('div');

        const resultText = document.createElement('p');
        resultText.innerHTML = `Tiempo de viaje: ${time}`;
        
        const resultValue = document.createElement('p');
        resultValue.innerHTML = `${timeDifferences[time]}`;

        divResult.appendChild(resultText);
        divResult.appendChild(resultValue);

        divTimeResults.appendChild(divResult);
    }

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
