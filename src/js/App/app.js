import { 
    calculateTimeDifference,
} from "./timeOperations.js"

import {
    submitButton,
    resetButton,
    cleanButton,
    overallResultsButton,
    personalResultsButton,

    printName,
    printTimeDifferenceResults,
    printOverallResults,

    showMessage,
    hideMessage,
    
    hideFormUI,
    showFormUI,

    cleanResultsUI,
    cleanPersonalResultsUI,
    cleanOverallResultsUI,

    hideResultsButtonsUI,
    showPersonalResultsUI,
    hidePersonalResultsUI,
    showOverallResultsUI,

    hideCleanButtonUI,
    showCleanButtonUI,
    hideOverallResultsButtonUI,
    showOverallResultsButtonUI,
    hidePersonalResultsButtonUI,
    showPersonalResultsButtonUI
} from "./UI.js"

import { 
    postResponse,
    postForm,
    getResults
} from "../Services/formResponseService.js"
import { 
    textTimeToDateFormat,
    calculateTimeDifference2,
    sumHoursAndMinutes,
    multiplyTime

} from "./dateOperations.js";



//Constants
const inputName = document.getElementById('name');

const inputdaysQuantity = document.getElementById('number-of-days')
const inputMorningStartTime = document.getElementById('morning-start-time');
const inputMorningArriveTime = document.getElementById('morning-arrive-time');
const inputNigthStartTime = document.getElementById('nigth-start-time');
const inputNigthArriveTime = document.getElementById('nigth-arrive-time');

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


let newInformationObject = {
    name: "",
    daysQuantity: 0,
    morningStartTime: "",
    morningArriveTime: "",
    nigthStartTime: "",
    nigthArriveTime: "",
    datemorningStartTime: ""
}

// Event Listeners
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', () => {
        form.addEventListener('submit', submitForm);
        submitButton.addEventListener('click', submitForm);
        resetButton.addEventListener('click', resetForm);
        cleanButton.addEventListener('click', cleanButtonActionUI);
        overallResultsButton.addEventListener('click', overallResults);
        personalResultsButton.addEventListener('click', showPersonalResultsUI)

        writeDefaultValuesInForm();
    })

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

//Date Format Implementing


function submitForm(e){
    e.preventDefault();
    try {
        cleanResultsUI();
    
        informationObject = validateFormValues();

        if(!informationObject){ return }

        newInformationObject = calculateTimeValues(informationObject);
        
        showMessage("Cargando Resultados", divLoading)
        
        // NEW POST
        postForm(newInformationObject)
        .then((res)=>{
            console.log({res, "Respuesta nueva":true});
        })

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
            submitFormUI();
            printName(informationObject);
            calculateTimeDifference(informationObject);
            showPersonalResultsUI();
        })
        
    } catch (error) {
        console.log(error);
    }

}


function validateFormValues(){
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
        return false;
    }

    return informationObject = {
        name,
        daysQuantity,
        morningStartTime,
        morningArriveTime,
        nigthStartTime,
        nigthArriveTime
    }

}

function calculateTimeValues(informationObject){
    const {
        name,
        daysQuantity,
        morningStartTime,
        morningArriveTime,
        nigthStartTime,
        nigthArriveTime
    } = informationObject;

    const myDate = new Date(Date.UTC(2020, 1, 26, 15, 0, 0));

    let dateMorningStartTime = textTimeToDateFormat(morningStartTime);
    let dateMorningArriveTime = textTimeToDateFormat(morningArriveTime);
    let dateNigthStartTime = textTimeToDateFormat(nigthStartTime);
    let dateNigthArriveTime = textTimeToDateFormat(nigthArriveTime);
    let dateMorningDifferenceTime = calculateTimeDifference2(dateMorningStartTime, dateMorningArriveTime);
    let dateNigthDifferenceTime = calculateTimeDifference2(dateNigthStartTime, dateNigthArriveTime);
    let dateTotalDailyTime = sumHoursAndMinutes(dateMorningDifferenceTime, dateNigthDifferenceTime);
    let prueba = multiplyTime(dateTotalDailyTime, daysQuantity);
    console.log({prueba});
    let dateTotalDaysTime = prueba;

    let newInformationObject = {
        name,
        daysQuantity,
        morningStartTime,
        morningArriveTime,
        nigthStartTime,
        nigthArriveTime,

        dateMorningStartTime,
        dateMorningArriveTime,
        dateNigthStartTime,
        dateNigthArriveTime,
        dateMorningDifferenceTime,
        dateNigthDifferenceTime,
        dateTotalDailyTime,
        dateTotalDaysTime

    }

    return newInformationObject;
    
}

function overallResults(){
    try {
        let resultsQuantity = 0;
        let results = {};

        showMessage("Cargando Resultados Globales", divLoading)

        getResults()
        .then((response) => {
            resultsQuantity = response.count;
            results = response.results;
        })
        .then(()=>{
            setTimeout(() => {
                hideMessage(divLoading)
            } , 1500);
        })
        .then(()=>{
            const res = results.map((result) => {
                result = {
                    daysQuantity: result.daysQuantity,
                    name: result.name
                }
                return result;
            });
         
            // cleanResultsUI();
            cleanOverallResultsUI();
            hidePersonalResultsUI();
            hideOverallResultsButtonUI();
            showPersonalResultsButtonUI();
            printOverallResults(resultsQuantity, res);
            showOverallResultsUI();
        })
        
        
    } catch (error) {
        console.log(error);
    }
    //Estructura del objeto
    /*
    daysQuantity: 250
    morningArriveTime: "09:30"
    morningStartTime: "08:00"
    name: "Santiago"
    nigthArriveTime: "18:30"
    nigthStartTime: "17:50"
    _id: 

    */


}


function submitFormUI(){
    hideFormUI();
}


function cleanButtonActionUI(){
    let confirmation = window.confirm("¿Llenar de nuevo el Formulario?");
    console.log({confirmation});
    if (confirmation) {
        showFormUI();
        hideResultsButtonsUI();
        cleanResultsUI();
    }
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