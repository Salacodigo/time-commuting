import { 
    timeSum,
    formatTime,
    calculateTotalTime,
    calculateTimeDifference,
    timeDifference
} from "./timeOperations.js"

import {
    printName,
    showMessage,
    hideMessage
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
const overallResultsButton = document.getElementById('overall-results-btn');

const resultsTitle = document.getElementById('results-title');
const divResults = document.getElementById('results');
const divTimeResults = document.getElementById('time-results');
const divLoading = document.getElementById('loading');

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
        overallResultsButton.addEventListener('click', overallResults)

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
    
    showMessage("Esperando Resultados", divLoading)

    postResponse(informationObject)
    .then((res)=>{
        console.log({res});
    })
    .then(()=>{
        setTimeout(() => {
            hideMessage(divLoading)
        } , 1500);
    })
    .then(()=>{
        submitFormActionUI();
        printName(informationObject);
        calculateTimeDifference(informationObject);
    })
}

async function overallResults(){
    let response = getResults();

    console.log({response})

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
    
    overallResultsButton.classList.remove('hidden');
    overallResultsButton.classList.add('showing');
    
    resultsTitle.classList.remove('hidden');
    resultsTitle.classList.add('showing');
}

function cleanButtonActionUI(){
    form.classList.remove('hidden');
    form.classList.add('showing')

    cleanButton.classList.remove('showing');
    cleanButton.classList.add('hidden');
    
    overallResultsButton.classList.remove('showing');
    overallResultsButton.classList.add('hidden');
    
    resetButton.classList.remove('hidden');
    resetButton.classList.add('showing')

    submitButton.classList.remove('hidden');
    submitButton.classList.add('showing')

    resultsTitle.classList.remove('showing');
    resultsTitle.classList.add('hidden');
    
}

function cleanResults(){
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


export{
    form,
    cleanHTML
}