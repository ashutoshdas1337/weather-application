const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        let tempF = data.currentConditions.temp;
        let tempC = Math.round((tempF - 32) * 5 / 9); // Convert to Celsius
        let feelsLikeC = Math.round((data.currentConditions.feelslike - 32) * 5 / 9);
        let condition = data.currentConditions.conditions.toLowerCase();

        // Remove old results before adding new
        document.querySelectorAll(".weather-container").forEach(div => div.remove());

        // Set background based on weather condition
        let bgColor = "#ffffff"; // Default white
        let bgImage = "";
        
        if (condition.includes("cloudy")) {
            bgColor = "#808080"; // Gray for cloudy
            bgImage = "url('https://www.transparenttextures.com/patterns/cloudy-day.png')";
        } else if (condition.includes("clear")) {
            bgColor = "#87CEEB"; // Light blue for clear
            bgImage = "url('https://www.transparenttextures.com/patterns/cubes.png')";
        } else if (condition.includes("sunny")) {
            bgColor = "#FFD700"; // Golden yellow for sunny
            bgImage = "url('https://www.transparenttextures.com/patterns/gplay.png')";
        }

        let newDiv = document.createElement("div");
        newDiv.classList.add("weather-container"); // Add a class for better management
        newDiv.style = `
            max-width: 90%;
            margin: auto;
            padding: 20px;
            border-radius: 10px;
            background-color: ${bgColor};
            background-image: ${bgImage};
            color: black;
            text-align: center;
        `;

        newDiv.innerHTML = `
        <div>
            <!-- Location and Timezone -->
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; padding: 20px;">
                <div>
                    <div style="font-size: 2rem; font-weight: bold;">📍 Location: ${data.resolvedAddress}</div>
                    <div style="font-size: 1.5rem;">⏳ Timezone: ${data.timezone}</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: bold;">📅 ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                </div>
                <div>
                    <div style="font-size: 1.5rem;">🌍 Latitude: ${data.latitude}</div>
                    <div style="font-size: 1.5rem;">🌍 Longitude: ${data.longitude}</div>
                </div>
            </div>

            <!-- Weather Conditions -->
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; margin-top: 20px; text-align: center;">
                <div style="font-size: 1.5rem;">💧 Humidity: ${data.currentConditions.humidity}%</div>
                
                <div>
                    <div style="font-size: 4rem; font-weight: bold;">🌡 ${tempC}°C</div>
                    <div style="font-size: 1.8rem;">${data.currentConditions.conditions}</div>
                    <div style="font-size: 1.5rem;">Feels like ${feelsLikeC}°C</div>
                </div>

                <div style="font-size: 1.5rem;">🌫 Dew Point: ${data.currentConditions.dew}°C</div>
            </div>

            <!-- Sunrise & Sunset -->
            <div style="display: flex; justify-content: space-evenly; margin-top: 30px;">
                <div style="font-size: 1.5rem;">🌅 Sunrise: ${data.currentConditions.sunrise}</div>
                <div style="font-size: 1.5rem;">🌇 Sunset: ${data.currentConditions.sunset}</div>
            </div>

            <!-- Forecast Title -->
            <div style="margin-top: 30px; text-align: center; font-size: 1.8rem; font-weight: bold;">Weather Forecast for the Next 15 Days</div>
        </div>`;

        document.body.appendChild(newDiv);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Button Click Event
let button = document.querySelector("#btn");
button.addEventListener("click", () => {
    let city = prompt("Enter city name:");
    if (!city.trim()) {
        alert("Please enter a valid city name!");
    } else {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city.trim()}?key=QHZ45M7QFM8DY2JUVXDXDFLS3`;
        fetchData(url);
    }
});
