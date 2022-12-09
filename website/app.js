/* Global Variables */
const apiKey = '68571e81f2d8f8769f7fd25e3a09000b';
const zipCode = document.getElementById('zip');
const feeling = document.getElementById('feelings');
const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const contentDiv = document.getElementById('content');
const generateBtn = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();

// add +1 here because JS date start count from 0 to 11
let newDate = d.getMonth()+1+  '/'+ d.getDate()+'/'+ d.getFullYear();


const getData = async  ()=> {
  const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}&appid=${apiKey}&units=imperial`);
  
  try {

    const response = await request.json();
    console.log(response);
    return response;


  } catch(error){

    console.log(error);
  }

};

// default paramter here (url="",data={}) to ensure opening app without crash if there is no arguments.
const postData = async (url = "", data = {}) => {
  const request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    return request;
  } catch (err) {
    console.log(err);
  }
};


// POST route and post function should have the same path, and the same goes with get.
const updatUI = async () => {
 const request = await fetch("/all");

  try {
    const response = await request.json();
    console.log(response);
    dateDiv.innerHTML = `Date: ${response.date}`;
    // round Temp to the nearest integer.
    tempDiv.innerHTML = `Temp: ${Math.round(response.temperature)}`
    contentDiv.innerHTML = `Your feelings: ${response.userResponse}`


  } catch(error){
    console.log("error",error) ;
  }};


const  generateFunction =  () => {
  // only trigger the function if the zip code input isn't empty and included in US according to base URL default country.
  if (!zipCode.value) {
    alert('Please enter zip code!')
  } else {
    getData().then((data) => {
      postData("/", {
        temp: data.main.temp,
        date: newDate,
        feelings: feeling.value
      });
      updatUI();
    });
  }
};

generateBtn.addEventListener("click", generateFunction);
