const searchBtn = document.querySelector("#search-button");
const searchFormElement = document.querySelector("#search-form");

async function getWeather() {
  try {
    const response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/saopaulo?unitGroup=metric&key=GWRF6BGAB5VMGKMW7S8VPGMN9"
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Fetch data weather error:", error);
  }
}

async function searchWeather(e) {
  e.preventDefault();

  const searchForm = document.querySelector("#search").value;
  console.log("Valor do input:", searchForm);

  try {
    const response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
        searchForm +
        "?unitGroup=metric&key=GWRF6BGAB5VMGKMW7S8VPGMN9"
    );
    const data = await response.json();
    console.log(data);
    console.log(data.currentConditions.conditions);
    console.log(data.currentConditions.temp);

    const currentWeather = {
      place: data.resolvedAddress,
      conditions: data.currentConditions.conditions,
      temperature: Math.round(data.currentConditions.temp),
      feels: data.currentConditions.feelslike,
      icon: data.currentConditions.icon,
      humidity: data.currentConditions.humidity,
    };
    console.log(currentWeather);

    displayWeather(currentWeather);

    displayGiphy(currentWeather.icon);

    return data;
  } catch (error) {
    "Error to search location weather:", error;
  }
}

// function to display json to dom
function displayWeather(currentWeather) {
  const displayDiv = document.querySelector("#display-div");

  // function to clear dom elements from previous search
  clearDOM();

  const location = document.createElement("p");
  location.textContent = currentWeather.place;
  displayDiv.appendChild(location);
  const conditions = document.createElement("p");
  conditions.textContent = "Conditions: " + currentWeather.conditions;
  displayDiv.appendChild(conditions);
  const temperature = document.createElement("p");
  temperature.textContent =
    "Temperature: " + currentWeather.temperature + " Degrees";
  displayDiv.append(temperature);
  const feelslike = document.createElement("p");
  feelslike.textContent = "Feels like: " + currentWeather.feels + " Degrees";
  displayDiv.appendChild(feelslike);
  const humidity = document.createElement("p");
  humidity.textContent = "Humidity: " + currentWeather.humidity;
  displayDiv.appendChild(humidity);
}

function clearDOM() {
  const nodeList = document.querySelectorAll("p");
  if (nodeList !== null) {
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].remove();
    }
  }
}

async function displayGiphy(icon) {
  // const searchForm = document.querySelector("#search").value;
  // if (searchForm === "") {
  //   searchForm === "random";
  // }
  const img = document.querySelector("img");
  // let searchTerm = icon;

  try {
    const response = await fetch(
      "https://api.giphy.com/v1/gifs/translate?api_key=aomT16zAydIRpBNLEyICwak3iNig8pHF&s=" +
        icon
    );
    console.log("image search...");
    const giphy = await response.json();

    img.style.display = "";
    img.src = giphy.data.images.original.url;
  } catch (error) {
    console.error("Fetch image error:", error);
  }
}

searchBtn.addEventListener("click", searchWeather);

document.addEventListener("DOMContentLoaded", function hideImgFirst() {
  let firstImg = document.querySelector("img");
  firstImg.style.display = "none";
});

getWeather();
