const apiKey = '7158ba585e75df234d2eeaee93bcde80'; // Replace with your OpenWeatherMap API key
const weatherInfoDiv = document.getElementById('weather-info');
const searchButton = document.getElementById('search-button');
const locationInput = document.getElementById('location-input');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeatherData(location);
    }
});

function fetchWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => {
            weatherInfoDiv.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
        });
}

function displayWeatherData(data) {
    if (data.cod === 200) {
        const { name, main, weather, wind } = data;
        const temperature = main.temp;
        const description = weather[0].description;
        const humidity = main.humidity;
        const windSpeed = wind.speed;

        weatherInfoDiv.innerHTML = `
            <p><strong>Location:</strong> ${name}</p>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Condition:</strong> ${description}</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        `;
    } else {
        weatherInfoDiv.innerHTML = '<p>Location not found. Please try again.</p>';
    }
}
