var input=document.getElementById("input-search") 
var currentCity="cairo"
var btnSearch=document.getElementById("find-btn")
var allData=document.getElementById("alldata")
var dayWeather=document.getElementById(`day`)
var monthWeather=document.getElementById("month")
var country=document.getElementById("country")
var  weatApi
var temp=document.getElementById("temp")
var describe=document.getElementById("Describe")
var photo=document.getElementById("photo")

var next=document.getElementsByClassName("nextday")
var nextImg=document.getElementsByClassName("nextimg")
var cel=document.getElementsByClassName("cel")
var cel2=document.getElementsByClassName("cel2")
var describeNext=document.getElementsByClassName("Describe2")
var month=["jan","feb","march","april","may","june","July","aug","sep","oct","nov","dec"]

var day=["sunday","monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]


async function getData()
{
    var weather=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4327d16c8cc245358eb121949220402&q=${currentCity}&days=7`)
      weatApi=await weather.json()
     console.log(weatApi)
     displayData()
     nextDay()
}

getData()

function displayData(){
    var getData=new Date()
    dayWeather.innerHTML=day[getData.getDay()]
    monthWeather.innerHTML=`${getData.getDate()} ${month[getData.getMonth()]}`
    country.innerHTML=weatApi.location.name
    temp.innerHTML=weatApi.current.temp_c
    describe.innerHTML=weatApi.current.condition.text
    photo.setAttribute("src" , `https:${weatApi.current.condition.icon}`)
    document.getElementById("extra").innerHTML=weatApi.current.humidity+"%"
document.getElementById("extra2").innerHTML=weatApi.current.wind_kph+"km/h"
document.getElementById("extra3").innerHTML=weatApi.current.wind_dir

}


function nextDay()
{
    for( var i=0;i < next.length; i++)
    {
        next[i].innerHTML=day[new Date(weatApi.forecast.forecastday[i+1].date).getDay()] 
        nextImg[i].setAttribute("src" , `https:${weatApi.forecast.forecastday[i+1].day.condition.icon}`)
        cel[i].innerHTML=weatApi.forecast.forecastday[i+1].day.maxtemp_c
        cel2[i].innerHTML=weatApi.forecast.forecastday[i+1].day.mintemp_c
        describeNext[i].innerHTML=weatApi.forecast.forecastday[i+1].day.condition.text
    }
}
input.addEventListener("keyup" ,function ()
{
    currentCity=input.value
    
    getData()
})