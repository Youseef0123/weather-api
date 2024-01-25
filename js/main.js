let nameToday=document.getElementById("name-today");
let dateToday=document.getElementById("date-today");
let dayNumToday=document.getElementById("today-date-day-num");
let monthDateToday=document.getElementById("today-date-month");
let nameCountry=document.getElementById("name-country");
let tempToday=document.getElementById("temp-today");
let imgWeather=document.getElementById("img-weather");
let textWeather=document.getElementById("text-weather");
let humidity=document.getElementById("humidity");
let wind=document.getElementById("wind");
let windDirection=document.getElementById("wind-direction")
let iconToday=document.getElementById("icon-today")
// 

let nextDayName=document.getElementsByClassName("next-day-name");
let nextMaxTemp=document.getElementsByClassName("next-max-temp");
let nextMinTemp=document.getElementsByClassName("next-min-temp");
let nextConditionText = document.getElementsByClassName("next-condition-text")
let nextConditionImg=document.getElementsByClassName("next-condition-img")

// 
let searchInpu=document.getElementById("search");

// 

async function getWeatherData(city){

let wetherResponse= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=caa4de045e34432c9ea173737242001&q=${city}&days=3`)
let weatherData= await wetherResponse.json()

return weatherData;
}

//start displaytodaydata
function displayWeather(data){
   let todayDate=new Date();
   nameToday.innerHTML=todayDate.toLocaleDateString("en-US",{weekday:"long"})
   dayNumToday.innerHTML=todayDate.getDate();
   monthDateToday.innerHTML=todayDate.toLocaleDateString("en-US",{month:"long"})
nameCountry.innerHTML= data.location.name;
tempToday.innerHTML=data.current.temp_c;
imgWeather.setAttribute("src","https:"+data.current.condition.icon)

textWeather.innerHTML=data.current.condition.text;
humidity.innerHTML=data.current.humidity +"%";
wind.innerHTML=data.current.wind_kph + " km/s";
windDirection.innerHTML=data.current.wind_dir;

}
// end displaytodaydata


// start tomorrow
function displayTomorrow(data){
let forecastData=data.forecast.forecastday ;

for(var i =0 ; i<2 ;i++ ){
    let todayDate=new Date(forecastData[i+1].date);
    
    nextDayName[i].innerHTML=todayDate.toLocaleDateString("en-US",{weekday:"long"})
nextMaxTemp[i].innerHTML=forecastData[i+1].day.maxtemp_c;
nextMinTemp[i].innerHTML=forecastData[i+1].day.mintemp_c;
nextConditionImg[i].setAttribute("src","https:"+forecastData[i+1].day.condition.icon)
nextConditionText[i].innerHTML=forecastData[i+1].day.condition.text;

}


}


// end tomorrow
async function startApp(city="cairo"){

    let weatherData=await getWeatherData(city);
 displayWeather(weatherData)
 displayTomorrow(weatherData)
}
startApp()
// 



searchInpu.addEventListener("input",function(){
    startApp(searchInpu.value)

})