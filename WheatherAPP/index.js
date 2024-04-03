// const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Bhubaneswar';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'df4ee7ca3emsh9b94130983c5a70p194e76jsn372d397338a6',
// 		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
// 	}
// };

// try {
// 	const response =  fetch(url, options);
// 	const result =  response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }

const inputbox = document.querySelector(".input-box");
const searchbtn = document.getElementById("searchbtn");
const weather_img = document.querySelector(".weather_img");
const temperature = document.querySelector(".temperature");
const Description = document.querySelector(".Description");

const humidity = document.getElementById("humidity");
const Wind_speed = document.getElementById("wind-speed");
const locationnot_found = document.querySelector(".location-not-found");

const weather_body = document.querySelector(".weather_body");

async function checkweather(city) {
	const api_key = "9984ae730449e2bcb7ef63bf1b2bddf0";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

	await fetch(`${url}`)
		.then(Response => {
			if (Response.status === 404) {
				locationnot_found.style.display = "flex";
				weather_body.style.display = "none";
				throw new Error('404 - Not Found');
			}
			if (!Response.ok) {
				throw new Error('Network response was not ok');
			}
			return Response.json(); // Returning the parsed JSON here
		})
		.then((result) => {
			temperature.innerHTML = `${Math.round(result.main.temp - 273.15)}<sup>°C</sup>`;
			Description.innerHTML = `${result.weather[0].description}`;
			humidity.innerHTML = `${result.main.humidity}%`;
			Wind_speed.innerHTML = `${result.wind.speed}km/H`;

			weather_body.style.display = "flex";
			locationnot_found.style.display = "none";

			let data = result.weather[0].main;
			switch (data) {
				case "Clouds":
					weather_img.src = "./cloud.png";
					break;
				case "Clear":
					weather_img.src = "./clear.png";
					break;
				case "Rain":
					weather_img.src = "./rain.png";
					break;
				case "Mist":
					weather_img.src = "./mist.png";
					break;
				case "Snow":
					weather_img.src = "./snow.png";
					break;
				default:
					console.log("Weather condition not handled:", data);
					break;
			}
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		});
}


searchbtn.addEventListener("click", () => {
	checkweather(inputbox.value);
})

