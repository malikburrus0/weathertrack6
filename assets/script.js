const apiKey = "583a0464bcbda43e09b0483daeb2052a";
const main = document.getElementById('main');
const form = document.getElementById('search-form');
const search = document.getElementById('search');
const city = document.getElementById('cityone');
const forecast = document.getElementById('cast');
const temperature = document.getElementById('temp');
const humidity = document.getElementById('humid');
const wind = document.getElementById('wind');
const date = new Date();
const dayonedate = document.getElementById('dayonedate');
const daytwodate = document.getElementById('daytwodate');
const daythreedate = document.getElementById('daythreedate');
const dayfourdate = document.getElementById('dayfourdate');
const dayfivedate = document.getElementById('dayfivedate');
const dayonetemp = document.getElementById('dayonetemp');
const dayonehumid = document.getElementById('dayonehumid');
const dayonewind = document.getElementById('dayonewind');
const daytwotemp = document.getElementById('daytwotemp');
const daytwohumid = document.getElementById('daytwohumid');
const daytwowind = document.getElementById('daytwowind');
const daythreetemp = document.getElementById('daythreetemp');
const daythreehumid = document.getElementById('daythreehumid');
const daythreewind = document.getElementById('daythreewind');
const dayfourtemp = document.getElementById('dayfourtemp');
const dayfourhumid = document.getElementById('dayfourhumid');
const dayfourwind = document.getElementById('dayfourwind');
const dayfivetemp = document.getElementById('dayfivetemp');
const dayfivehumid = document.getElementById('dayfivehumid');
const dayfivewind = document.getElementById('dayfivewind');
const oldcity = document.getElementById('oldcity');


const url = (city) => `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

let pastCityStored =JSON.parse(localStorage.getItem('city'));
let pastCity = pastCityStored || [];





//Create li's dynamically, all should have an A tag inside of them

function formattedDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();

    return month + '/' + day + '/' + year;
}

async function getWeatherByLocation(city) {

    var today = new Date();
        console.log(today);
        
    fetch(url(city))
    .then((response) => response.json())
    .then((data) => {
        
     
     console.log(data);
     console.log(date);
     console.log(Date.now());
    
    
    
    
    

    date.textContent= data.list[0].dt_txt;
    temperature.textContent= data.list[0].main.temp + "°F";
    humidity.textContent= data.list[0].main.humidity + "%";
    wind.textContent= data.list[0].wind.speed + " mph";

    
    dayonedate.textContent= data.list[4].dt_txt;
    dayonetemp.textContent= data.list[4].main.temp + "°F";
    dayonehumid.textContent= data.list[4].main.humidity + "%";
    dayonewind.textContent= data.list[4].wind.speed + " mph";

    
    daytwodate.textContent= data.list[12].dt_txt;
    daytwotemp.textContent= data.list[12].main.temp + "°F";
    daytwohumid.textContent= data.list[12].main.humidity + "%";
    daytwowind.textContent= data.list[12].wind.speed + " mph";

    daythreedate.textContent= data.list[20].dt_txt;
    daythreetemp.textContent= data.list[20].main.temp + "°F";
    daythreehumid.textContent= data.list[20].main.humidity + "%";
    daythreewind.textContent= data.list[20].wind.speed + " mph";

    dayfourdate.textContent= data.list[30].dt_txt;
    dayfourtemp.textContent= data.list[30].main.temp + "°F";
    dayfourhumid.textContent= data.list[30].main.humidity + "%";
    dayfourwind.textContent= data.list[30].wind.speed + " mph";

    dayfivedate.textContent= data.list[35].dt_txt;
    dayfivetemp.textContent= data.list[35].main.temp + "°F";
    dayfivehumid.textContent= data.list[35].main.humidity + "%";
    dayfivewind.textContent= data.list[35].wind.speed + " mph";
    
    
   // addWeatherToPage(data)
    
});
}


function addCity() {
    let input = document.getElementById('searchbar').value
    pastCity.push(input);
    localStorage.setItem('city', JSON.stringify(pastCity));
    console.log(pastCity);
    console.log(input);
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.textContent = input;
    a.setAttribute('href', '#');
    a.setAttribute('onclick', 'getWeatherByLocation(this.textContent)');
    li.appendChild(a);
    oldcity.appendChild(li);
    document.getElementById('searchbar').value = "";
}

function search_weather() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('city');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="list-item";                 
        }
    }
}



function addWeatherToPage(data) {
    const temp = Ktoc(data.main.temp);

    const weather = document.createElement('div')
    weather.classList.add('weather');

    weather.innerHTML = `
          <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
          <small>${data.weather[0].main}</small>
        
          `;

    main.innerHTML = "";
    main.appendChild(weather);
};


function Ktoc(K) {
    return Math.floor(K - 273.15);
}

function formattedDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return month + "/" + day + "/" + year;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }

});