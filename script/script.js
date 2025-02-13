

async function getWeather() 
{
    const city = document.getElementById('city').value;

    const apiKey = '79b3818649f138eee2afbe3adf249a31';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try 
    {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) 
            {
            document.getElementById('error-message').innerText = 'City not found!';
            document.querySelector('.weather-info').style.display = 'none';
            return;
        }
       

        document.getElementById('error-message').innerText = '';
        document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').innerText = data.main.temp.toFixed(1);
        document.getElementById('temperature').dataset.unit = 'C';
        document.getElementById('humidity').innerText = data.main.humidity;
        document.getElementById('wind-speed').innerText = data.wind.speed;

        
        document.getElementById('country').innerText = data.sys.country;
        document.getElementById('longitude').innerText = data.coord.lon;
        document.getElementById('latitude').innerText = data.coord.lat;
        
        await getStateFromCoordinates(data.coord.lat, data.coord.lon);
        
       
        const weatherMain = data.weather[0].main.toLowerCase();
        const isNight = data.dt > data.sys.sunset;

        
        let weatherSymbol = "❓"; 

        if (weatherMain.includes("clear"))
             {
            weatherSymbol = isNight ? "🌙" : "☀️"; // Night or day
        } else if (weatherMain.includes("cloud")) 
            {
            weatherSymbol = isNight ? "☁️" : "🌥️";
        } else if (weatherMain.includes("rain")) 
            {
            weatherSymbol = isNight ? "🌧️" : "🌦️";
        } else if (weatherMain.includes("thunderstorm"))
             {
            weatherSymbol = "⛈️";
        } else if (weatherMain.includes("snow")) 
            {
            weatherSymbol = "❄️";
        } else if (weatherMain.includes("mist") || weatherMain.includes("fog"))
             {
            weatherSymbol = "🌫️";
        }

        document.getElementById('weather-icon').innerText = weatherSymbol;
       
        // Set Background Images based on weather condition 
        let backgroundUrl = '';

        if (weatherMain.includes("clear")) 
            {
            backgroundUrl = isNight ? "url('/images/clearnight.jpg')" : "url('/images/normal.jpg')";
        } else if (weatherMain.includes("cloud")) 
            {
            backgroundUrl = isNight ? "url('/images/night.jpg')" : "url('/images/sunny.jpg')";
        } else if (weatherMain.includes("rain")) 
            {
            backgroundUrl = isNight ? "url('/images/Rainy.jpg')" : "url('/images/Rainy.jpg')";
        } else if (weatherMain.includes("thunderstorm"))
             {
            backgroundUrl = "url('/images/strom.jpg')";
        } else if (weatherMain.includes("snow")) 
            {
            backgroundUrl = "url('/images/snow.jpg')";
        } else if (weatherMain.includes("mist"))
             {
            backgroundUrl = "url('/images/mist.jpg')";
        } else {
            backgroundUrl = "url('/images/normal.jpg')"; // Default image
        }

        document.body.style.backgroundImage = backgroundUrl;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.transition = 'background 0.5s ease-in-out';

        document.querySelector('.weather-info').style.display = 'block';

    } 
    catch (error) 
    {
        console.error('Error fetching weather data:', error);
        document.getElementById('error-message').innerText = 'Something went wrong!';

    }
}
async function getStateFromCoordinates(lat, lon) {
    const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    try 
    {
        const response = await fetch(geocodeUrl);
        const data = await response.json();

        if (data.address && data.address.state) 
            {
            document.getElementById('state').innerText = data.address.state;
        } else {
            document.getElementById('state').innerText = 'State not found';
        }
    } catch (error) 
    {
        console.error('Error fetching state:', error);
        document.getElementById('state').innerText = 'Error fetching state';
    }
}


function toggleTemperature()
{
const tempElement = document.getElementById('temperature');
const toggleButton = document.getElementById('toggle-temp');
let tempValue = parseFloat(tempElement.innerText);

if (toggleButton.innerText === "°C") 
    {
    tempElement.innerText = ((tempValue * 9/5) + 32).toFixed(2);
    toggleButton.innerText = "°F";
} else 
{
    tempElement.innerText = ((tempValue - 32) * 5/9).toFixed(2);
    toggleButton.innerText = "°C";
}
}
 

