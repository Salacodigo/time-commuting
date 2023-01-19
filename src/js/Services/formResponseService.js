const url = 'https://backend-time-commuting.vercel.app'; // Vercel

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