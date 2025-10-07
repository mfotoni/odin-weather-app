const searchBtn = document.querySelector("#search-button");

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

    return data;
  } catch (error) {
    "Error to search location weather:", error;
  }
}

searchBtn.addEventListener("click", searchWeather);
getWeather();
