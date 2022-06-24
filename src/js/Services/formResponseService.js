// const url = "http://127.0.0.1:4000"; // Localhost
const url = "https://time-commuting-backend.herokuapp.com"; // Heroku

async function postResponse(informationObject){

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

export {
   postResponse,
   getResults
}