import refs from "./refs.js";
console.log(refs);

let weather = {
  // apiKey: "API KEY GOES HERE",
  apiKey: `b17a2dddb01d7481fea6373f92c2e546`,
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    refs.city.innerText = "Weather in " + name;
    refs.icon.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    refs.desc.innerText = description;
    refs.temp.innerText = temp + "°C";
    refs.humidity.innerText = "Humidity: " + humidity + "%";
    refs.wind.innerText = "Wind speed: " + speed + " km/h";
    refs.weather.classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(refs.search.value);
  },
};

refs.searchBtn.addEventListener("click", function () {
  weather.search();
});

refs.search.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Kyiv");
