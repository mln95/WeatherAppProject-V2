// to load the entire page first then execute the code
window.onload = function () {
  //initiate the getData function while the needed information are written
  document.getElementById("generate").addEventListener("click", getData);
  async function getData() {
    // Add the actual date in the UI
    let day = new Date();
    let todayDate =
      day.getMonth() + "/" + day.getDate() + "/" + day.getFullYear();
    // const date = document.getElementById("date");
    // date.innerHTML = todayDate;
    // initialize the variable to get user input
    const countryCode = document.getElementById("code").value;
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    // console.log(zip, feelings);
    //get the data from the OpenWeatherMap API
    const api_key = "637664955eb1714dd8cf11f2df257062";
    const api_url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${api_key}&units=imperial`;
    const response = await fetch(api_url);
    const json = await response.json();

    // console.log(json);
    // get the specific data to send through post to the server
    const data = {
      date: todayDate,
      temp: json.main.temp,
      feelings: feelings,
    };
    // console.log(data);
    // send the data to the server through post
    async function sendData(url, dataSend) {
      await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSend),
      });
    }
    sendData("/server", data);
    // get the data from the server
    const url = "/client";
    async function receiveData() {
      const serverResponse = await fetch(url);
      const convertToJson = await serverResponse.json();
      console.log(convertToJson);
      displayUI(convertToJson);
      return convertToJson;
    }
    function displayUI(dataWeather) {
      document.getElementById("date").innerHTML = "Date: " + dataWeather.date;
      document.getElementById("tempFahrenheit").innerHTML =
        "Temperature F: " + Math.round(dataWeather.temp) + "°F";
      document.getElementById("tempCelsius").innerHTML =
        "Temperature C: " +
        Math.round(((dataWeather.temp - 32) * 5) / 9) +
        "°C";
      document.getElementById("content").innerHTML =
        "My feelings : " + dataWeather.feelings;
    }
    receiveData();
  }
};
