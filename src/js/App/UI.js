import{
    form,
    cleanHTML
} from './app.js'


//Constants
const submitButton = document.getElementById('submit-btn');
const resetButton = document.getElementById('reset-btn');
const cleanButton = document.getElementById('clean-results-btn');
const overallResultsButton = document.getElementById('overall-results-btn');
const personalResultsButton = document.getElementById('personal-results-btn');

const resultsTitle = document.getElementById('results-title');
const divOverallResults = document.getElementById('overall-results');
const divPersonalResults = document.getElementById('time-results');


// App UI Functions

function printTimeDifferenceResults(timeResultsObj){

    const divPersonalResults = document.getElementById('time-results');

    for (let time in timeResultsObj){
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

        divResult.appendChild(resultText);
        divResult.appendChild(resultMeasure);
        divResult.appendChild(resultValue);

        divPersonalResults.appendChild(divResult);
    }

}

function printName(informationObject){

    const {name, daysQuantity} = informationObject;

    const pName = document.createElement('p');
    pName.classList.add('p-Name');
    pName.innerHTML = `${name}, los tiempos para ${daysQuantity} días son:`;

    divPersonalResults.appendChild(pName);
}

function showMessage(msg, container){
    
    const divMessage = document.createElement('div');
    divMessage.id = 'divMessage';
    divMessage.classList.add('message');
    
    divMessage.innerHTML = `<h3>${msg}</h3>`;
    
    container.appendChild(divMessage);

    return true;
}

function hideMessage(){
    try {
        const divMessage = document.getElementById('divMessage');
        divMessage.remove();
    } catch (error) {
        console.log(error);
    }
}

function hideFormUI(){
    
    form.classList.remove('showing')
    form.classList.add('hidden');

    submitButton.classList.remove('showing')
    submitButton.classList.add('hidden');
    
    resetButton.classList.remove('showing')
    resetButton.classList.add('hidden');
    
    showCleanButtonUI();
    showOverallResultsButtonUI();
    
    resultsTitle.classList.remove('hidden');
    resultsTitle.classList.add('showing');
}

function showFormUI(){
    form.classList.remove('hidden');
    form.classList.add('showing')
    
    resetButton.classList.remove('hidden');
    resetButton.classList.add('showing')

    submitButton.classList.remove('hidden');
    submitButton.classList.add('showing')

    resultsTitle.classList.remove('showing');
    resultsTitle.classList.add('hidden');
}

function hideResultsButtonsUI(){
    hideCleanButtonUI();
    hideOverallResultsButtonUI();
    hidePersonalResultsButtonUI();
}

function hidePersonalResultsButtonUI(){
    personalResultsButton.classList.remove('showing');
    personalResultsButton.classList.add('hidden');
}

function showPersonalResultsButtonUI(){
    personalResultsButton.classList.remove('hidden');
    personalResultsButton.classList.add('showing');
}

function hideCleanButtonUI(){
    cleanButton.classList.remove('showing');
    cleanButton.classList.add('hidden');
}

function showCleanButtonUI(){
    cleanButton.classList.remove('hidden');
    cleanButton.classList.add('showing');
}

function hideOverallResultsButtonUI(){
    overallResultsButton.classList.remove('showing');
    overallResultsButton.classList.add('hidden');
}

function showOverallResultsButtonUI(){
    overallResultsButton.classList.remove('hidden');
    overallResultsButton.classList.add('showing');
}

function printOverallResults(resultsQuantity, resultsObject){

    const divResults = document.createElement('div');

    let resultsObjectHTML = '';
    for(let key in resultsObject){
        let actualObject = resultsObject[key];
        resultsObjectHTML += `
            </br><p>${actualObject.daysQuantity}</p></p>${actualObject.name}</p>
            `;
    }

    divResults.innerHTML = `
        <div>Cálculos realizados con ${resultsQuantity} respuestas:</div>
        </br>
        <div>${resultsObjectHTML}</div>
    `;

    divOverallResults.appendChild(divResults);

}

function cleanResultsUI(){
    cleanPersonalResultsUI();
    cleanOverallResultsUI();
}

function cleanPersonalResultsUI(){
    cleanHTML(divPersonalResults);
}
function cleanOverallResultsUI(){
    cleanHTML(divOverallResults);
}

function hidePersonalResultsUI(){
    resultsTitle.innerHTML = `Resultados globales`;
    divPersonalResults.classList.remove('showing');
    divPersonalResults.classList.add('hidden');
}

function showPersonalResultsUI(){
    hideOverallResultsUI();
    hidePersonalResultsButtonUI();
    showOverallResultsButtonUI();
    resultsTitle.innerHTML = `Resultado Individual`;
    divPersonalResults.classList.remove('hidden');
    divPersonalResults.classList.add('showing');
}

function hideOverallResultsUI(){
    resultsTitle.innerHTML = `Resultado Individual`;
    divOverallResults.classList.remove('showing');
    divOverallResults.classList.add('hidden');
}

function showOverallResultsUI(){
    resultsTitle.innerHTML = `Resultados Globales`;
    divOverallResults.classList.remove('hidden');
    divOverallResults.classList.add('showing');
}


export {
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
    
}