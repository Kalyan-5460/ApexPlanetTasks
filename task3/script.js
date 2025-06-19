function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");

  if (city === "") {
    resultDiv.innerHTML = "❌ Please enter a city name.";
    return;
  }

  const apiKey = "cfe48a7245126131a4ac309b754d03fa"; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then((data) => {
      const name = data.name;
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const humidity = data.main.humidity;
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      resultDiv.innerHTML = `
        <h2>📍 ${name}</h2>
        <img src="${iconUrl}" alt="${desc}" />
        <p>🌡️ Temp: ${temp}°C</p>
        <p>💧 Humidity: ${humidity}%</p>
        <p>🌥️ Condition: ${desc}</p>
      `;
    })
    .catch((error) => {
      resultDiv.innerHTML = `❌ Error: ${error.message}`;
    });
}
