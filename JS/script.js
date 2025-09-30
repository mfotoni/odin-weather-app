const searchBtn = document.querySelector("#search-button");

async function getWeather() {
  try {
    const response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/saopaulo?key=GWRF6BGAB5VMGKMW7S8VPGMN9"
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Fetch data weather error:", error);
  }
}

getWeather();

async function searchWeather() {
  const searchForm = document.querySelector("#search").value;
  try {
    const response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
        searchForm +
        "?key=GWRF6BGAB5VMGKMW7S8VPGMN9"
    );
    const data = await response.json();
  } catch (error) {}
}

searchBtn.addEventListener("click", searchWeather);
