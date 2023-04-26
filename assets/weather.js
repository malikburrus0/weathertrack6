export function  getWeather(lat, lon, timezone) {
  const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${lat},${lon}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return {
        timezone: timezone,
        currently: data.currently,
        daily: data.daily,
      };
    });
}

// Path: assets\weather.js
// Compare this snippet from assets\script.js:

