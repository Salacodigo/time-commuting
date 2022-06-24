import { 
    timeSum,
    formatTime,
    calculateTotalTime,
    calculateTimeDifference,
    timeDifference
} from "./timeOperations.js"

import {
    printName
} from "./UI.js"

import { 
    postResponse,
    getResults
} from "../Services/formResponseService.js"



//Constants
const inputName = document.getElementById('name');

const inputdaysQuantity = document.getElementById('number-of-days')
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
    daysQuantity: "",
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
    inputdaysQuantity.value = 250;
    inputMorningStartTime.value = '08:00';
    inputMorningArriveTime.value = '09:30';
    inputNigthStartTime.value = '17:50';
    inputNigthArriveTime.value = '18:30';

}

async function submitForm(e){
    e.preventDefault();

    cleanResults();


    let informationObject = {};

    const name = inputName.value;
    const daysQuantity = Number(inputdaysQuantity.value);
    const morningStartTime = inputMorningStartTime.value;
    const morningArriveTime = inputMorningArriveTime.value;
    const nigthStartTime = inputNigthStartTime.value;
    const nigthArriveTime = inputNigthArriveTime.value;

    if(
        name == "" ||
        (isNaN(daysQuantity) || daysQuantity <= 0) ||
        morningStartTime == "" ||
        morningArriveTime == "" ||
        nigthStartTime == "" ||
        nigthArriveTime == ""

    ) {
        alert("No ha diligenciado todos los campos del formulario", "error");
        return;
    }

    
    
    informationObject = {
        name,
        daysQuantity,
        morningStartTime,
        morningArriveTime,
        nigthStartTime,
        nigthArriveTime
    }
    
    // await getResults();
    await postResponse(informationObject);
    submitFormActionUI();
    
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
