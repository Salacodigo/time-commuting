//Constants
const inputName = document.getElementById('name');
const inputFirstWorkDay = document.getElementById('first-workday');
const inputFinalWorkday = document.getElementById('final-workday');
const inputMorningStartTime = document.getElementById('morning-start-time');
const inputMorningArriveTime = document.getElementById('morning-arrive-time');
const inputNigthStartTime = document.getElementById('nigth-start-time');
const inputNigthArriveTime = document.getElementById('nigth-arrive-time');

const submitButton = document.getElementById('')

const divResults = document.getElementById('results');

//Object form
let informationObject = {
    name: "",
    startDay: "",
    finalDay: "",
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

}


// Functions

function writeDefaultValuesInForm(){
    inputName.value = "Santiago";
    inputFirstWorkDay.value = '2022-06-05';
    inputFinalWorkday.value = '2022-06-06';
    
    inputMorningStartTime.value = '08:00';
    inputMorningArriveTime.value = '09:30';
    inputNigthStartTime.value = '17:50';
    inputNigthArriveTime.value = '18:30';

}

function submitForm(e){
    e.preventDefault();
    let informationObject = {};

    const name = inputName.value;
    const firstWorkDay = inputFirstWorkDay.value;
    const fiinalWorkday  = inputFinalWorkday.value;
    const morningStartTime = inputMorningStartTime.value;
    const morningArriveTime = inputMorningArriveTime.value;
    const nigthStartTime = inputNigthStartTime.value;
    const nigthArriveTime = inputNigthArriveTime.value;


    informationObject = {
        name,
        firstWorkDay,
        fiinalWorkday,
        morningStartTime,
        morningArriveTime,
        nigthStartTime,
        nigthArriveTime
    }

    console.log(informationObject)

    calculateTimeDifference();
}

function calculateTimeDifference(){
    console.log("Calculando...");

}