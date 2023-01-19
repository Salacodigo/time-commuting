// const url = "https://time-commuting-backend.herokuapp.com"; // Heroku
const url = process.env.API_URL; // Heroku

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