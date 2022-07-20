const url = "http://127.0.0.1:4000"; // Localhost
// const url = "https://time-commuting-backend.herokuapp.com"; // Heroku

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
   getResults,
   postForm
}