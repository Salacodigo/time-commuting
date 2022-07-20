const url = "http://127.0.0.1:4000"; // Localhost
// const url = "https://time-commuting-backend.herokuapp.com"; // Heroku

async function postResponse(informationObject){

  /*
  Prueba

  const mydate = new Date(Date.UTC(2020, 1, 26, 15, 0, 0));
 
  informationObject = {
    daysQuantity: 500,
    morningArriveTime: "04:55",
    morningStartTime: "05:44",
    name: "Alvarez",
    nigthArriveTime: "13:33",
    nigthStartTime: "14:11",
    datemorningStartTime: mydate
  }
  

  */

  let request = await fetch(`${url}/api/form/results`,
  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(informationObject)
  });
  let response = await request.json();

  return response;

}

async function getResults(){

  let request = await fetch(`${url}/api/form/results`);
  let response = await request.json()
  return response

}

async function postForm(newInformationObject){

  let request = await fetch(`${url}/api/form/results`,
  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newInformationObject)
  });
  let response = await request.json();

  return response;

}

export {
   postResponse,
   getResults,
   postForm
}


/*

let newInformationObject = {
    name: "Alvarez",
    daysQuantity: 500,
    morningStartTime: "05:44",
    morningArriveTime: "04:55",
    nigthStartTime: "14:11",
    nigthArriveTime: "13:33",
    datemorningStartTime: mydate
}
*/