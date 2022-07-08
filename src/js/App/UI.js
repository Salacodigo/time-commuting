import{
    form,
    cleanHTML
} from './app.js'



function printTimeDifferenceResults(timeResultsObj){

    const divTimeResults = document.getElementById('time-results');

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

        divTimeResults.appendChild(divResult);
    }

}

function printName(informationObject){

    const {name, daysQuantity} = informationObject;

    const divTimeResults = document.getElementById('time-results');

    const pName = document.createElement('p');
    pName.classList.add('p-Name');
    pName.innerHTML = `${name}, los tiempos para ${daysQuantity} días son:`;

    divTimeResults.appendChild(pName);
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


export {
    printTimeDifferenceResults,
    printName,
    showMessage,
    hideMessage
}