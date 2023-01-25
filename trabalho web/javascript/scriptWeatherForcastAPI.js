const API_KEY = "&appid=9a69c91bcc707914fff925bc7df54ef3";
const apiWeatherURL="https://api.openweathermap.org/data/2.5/weather?";
const LIMIT_RESPONSE = "&limit=1";
const units = "&units=metric";
const lang = "&lang=pt";
const CARDMAIN1 = apiWeatherURL + "q=Londres"+ units+ API_KEY + lang;
const CARDMAIN2 = apiWeatherURL + "q=Nova York"+ units+ API_KEY + lang;
const CARDMAIN3 = apiWeatherURL + "q=Lisboa"+ units+ API_KEY + lang;
const CARDMAIN4 = apiWeatherURL + "q=Rio de Janeiro"+ units+ API_KEY + lang;
const CARDMAIN5 = apiWeatherURL + "q=Tokio"+ units+ API_KEY + lang;
const CARDMAIN6 = apiWeatherURL + "q=Nova Delhi"+ units+ API_KEY + lang;

//Função que processa informação relativa as 6 cidades apresentadas no Home
function getWeatherData(apiUrl, nameId, countryId, tempId, tempMaxId, tempMinId, feelsLikeId, descriptionId,bgId) {
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById(nameId).innerHTML = data.name;
        document.getElementById(countryId).innerHTML = data.sys.country; 
        let temperatura = Math.round(data.main.temp);
        document.getElementById(tempId).innerHTML = 'Temperatura atual:'+ temperatura + '°C';
        let temperatura_max = Math.round(data.main.temp_max);
        document.getElementById(tempMaxId).innerHTML = 'Max:'+ temperatura_max + '°C';
        let temperatura_min = Math.round(data.main.temp_min);
        document.getElementById(tempMinId).innerHTML = 'Min:'+ temperatura_min + '°C';
        let feels_like = Math.round(data.main.feels_like);
        document.getElementById(feelsLikeId).innerHTML = 'Temperatura aparente:'+ feels_like + '°C';
        document.getElementById(descriptionId).innerHTML = data.weather[0].description;
        let main = data.weather[0].main;
        backgrounfimg(main,bgId);
    });
};

// Função de Backgrounds relativa as 6 cidades apresentadas no Home
function backgrounfimg(main,bgId){
switch (main) {
case "Snow":
document.getElementById(bgId).style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
break;
case "Clouds":
document.getElementById(bgId).style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
break;
case "Fog":
document.getElementById(bgId).style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
break;
case "Rain":
document.getElementById(bgId).style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
break;
case "Clear":
document.getElementById(bgId).style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
break;
case "Thunderstorm":
document.getElementById(bgId).style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')";
document.getElementById(bgId).style.color = "white";//como o fundo é preto muda a cor para branco
break;
default:
document.getElementById(bgId).style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
break;
};
};

getWeatherData(CARDMAIN1,'name1','country1','temp1','max1','min1','feels_like1','description1','bg1');
getWeatherData(CARDMAIN2,'name2','country2','temp2','max2','min2','feels_like2','description2','bg2');
getWeatherData(CARDMAIN3,'name3','country3','temp3','max3','min3','feels_like3','description3','bg3');
getWeatherData(CARDMAIN4,'name4','country4','temp4','max4','min4','feels_like4','description4','bg4');
getWeatherData(CARDMAIN5,'name5','country5','temp5','max5','min5','feels_like5','description5','bg5');
getWeatherData(CARDMAIN6,'name6','country6','temp6','max6','min6','feels_like6','description6','bg6');


var cloneMedia = $('.media').clone();
$('#btSearch').on('click', function(){

	var search = $('#pesquisa').val();
	$('.panel-title').text('Search results for "'+ search +'"');
	
	$('.media-list').html('');
	var forcast = apiWeatherURL + "q=" + search + units+ API_KEY + lang;

	$.ajax({

		method: "GET",
		url: forcast
	}).done(function( msg ) {
		
		msg.Search.forEach(function(result){
			var liMedia = cloneMedia.clone();

			var posterURL = result.Poster;
			if (posterURL == "N/A" || posterURL == "")
			{
				posterURL = DEFAULT_POSTER;
			}
			var poster = $('#image', liMedia);
			poster.on("error", function(event){
				event.target.src = DEFAULT_POSTER;
			});
			poster.attr("src", posterURL);

			$('.title', liMedia).text(result.Title);
			$('.ano', liMedia).text(result.Year);
			$('.tipo', liMedia).text(result.Type);
			$('.media-list').append(liMedia);	
		});
	});
	fetch(forcast)
.then((response) => response.json())
.then((data) => {
// Weather main data
let main1 = data.weather.main;

console.log(data)
});
});


/*
// API call
let queryUrl = "https://api.openweathermap.org/data/2.5/onecall?";
let lat = "lat=52.229676&";
let lon = "lon=21.012229&";
let apiOptions = "units=metric&exclude=minutely,alerts&";
let apiKey = "appid=dbb76c5d98d5dbafcb94441c6a10236e";
let file = queryUrl + lat + lon + apiOptions + apiKey;

fetch(file)
.then((response) => response.json())
.then((data) => {
// Weather main data
let main = data.current.weather[0].main;
let description = data.current.weather[0].description;
let temp = Math.round(data.current.temp);
let pressure = data.current.pressure;
let humidity = data.current.humidity;
let name = "Warsaw";

document.getElementById("wrapper-description").innerHTML = description;
document.getElementById("wrapper-temp").innerHTML = temp + "°C";
document.getElementById("wrapper-pressure").innerHTML = pressure;
document.getElementById("wrapper-humidity").innerHTML = humidity + "°C";
document.getElementById("wrapper-name").innerHTML = name;

// Weather hourly data
let hourNow = data.hourly[0].temp;
let hour1 = data.hourly[1].temp;
let hour2 = data.hourly[2].temp;
let hour3 = data.hourly[3].temp;
let hour4 = data.hourly[4].temp;
let hour5 = data.hourly[5].temp;

document.getElementById("wrapper-hour-now").innerHTML = hourNow + "°";
document.getElementById("wrapper-hour1").innerHTML = hour1 + "°";
document.getElementById("wrapper-hour2").innerHTML = hour2 + "°";
document.getElementById("wrapper-hour3").innerHTML = hour3 + "°";
document.getElementById("wrapper-hour4").innerHTML = hour4 + "°";
document.getElementById("wrapper-hour5").innerHTML = hour5 + "°";

// Time
let timeNow = new Date().getHours();
let time1 = timeNow + 1;
let time2 = time1 + 1;
let time3 = time2 + 1;
let time4 = time3 + 1;
let time5 = time4 + 1;

document.getElementById("wrapper-time1").innerHTML = time1;
document.getElementById("wrapper-time2").innerHTML = time2;
document.getElementById("wrapper-time3").innerHTML = time3;
document.getElementById("wrapper-time4").innerHTML = time4;
document.getElementById("wrapper-time5").innerHTML = time5;

// Weather daily data
let tomorrowTemp = Math.round(data.daily[0].temp.day);
let dATTemp = Math.round(data.daily[1].temp.day);
let tomorrowMain = data.daily[0].weather[0].main;
let dATTempMain = data.daily[1].weather[0].main;

document.getElementById("wrapper-forecast-temp-today").innerHTML =
temp + "°";
document.getElementById("wrapper-forecast-temp-tomorrow").innerHTML =
tomorrowTemp + "°";
document.getElementById("wrapper-forecast-temp-dAT").innerHTML =
dATTemp + "°";

// Icons
let iconBaseUrl = "http://openweathermap.org/img/wn/";
let iconFormat = ".webp";

// Today
let iconCodeToday = data.current.weather[0].icon;
let iconFullyUrlToday = iconBaseUrl + iconCodeToday + iconFormat;
document.getElementById("wrapper-icon-today").src = iconFullyUrlToday;

// Tomorrow
let iconCodeTomorrow = data.daily[0].weather[0].icon;
let iconFullyUrlTomorrow = iconBaseUrl + iconCodeTomorrow + iconFormat;
document.getElementById(
"wrapper-icon-tomorrow"
).src = iconFullyUrlTomorrow;

// Day after tomorrow
let iconCodeDAT = data.daily[1].weather[0].icon;
let iconFullyUrlDAT = iconBaseUrl + iconCodeDAT + iconFormat;
document.getElementById("wrapper-icon-dAT").src = iconFullyUrlDAT;

// Icons hourly

// Hour now
let iconHourNow = data.hourly[0].weather[0].icon;
let iconFullyUrlHourNow = iconBaseUrl + iconHourNow + iconFormat;
document.getElementById(
"wrapper-icon-hour-now"
).src = iconFullyUrlHourNow;

// Hour1
let iconHour1 = data.hourly[1].weather[0].icon;
let iconFullyUrlHour1 = iconBaseUrl + iconHour1 + iconFormat;
document.getElementById("wrapper-icon-hour1").src = iconFullyUrlHour1;

// Hour2
let iconHour2 = data.hourly[2].weather[0].icon;
let iconFullyUrlHour2 = iconBaseUrl + iconHour2 + iconFormat;
document.getElementById("wrapper-icon-hour2").src = iconFullyUrlHour1;

// Hour3
let iconHour3 = data.hourly[3].weather[0].icon;
let iconFullyUrlHour3 = iconBaseUrl + iconHour3 + iconFormat;
document.getElementById("wrapper-icon-hour3").src = iconFullyUrlHour3;

// Hour4
let iconHour4 = data.hourly[4].weather[0].icon;
let iconFullyUrlHour4 = iconBaseUrl + iconHour4 + iconFormat;
document.getElementById("wrapper-icon-hour4").src = iconFullyUrlHour4;

// Hour5
let iconHour5 = data.hourly[5].weather[0].icon;
let iconFullyUrlHour5 = iconBaseUrl + iconHour5 + iconFormat;
document.getElementById("wrapper-icon-hour5").src = iconFullyUrlHour5;

// Backgrounds
switch (main) {
case "Snow":
document.getElementById("wrapper-bg").style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
break;
case "Clouds":
document.getElementById("wrapper-bg").style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
break;
case "Fog":
document.getElementById("wrapper-bg").style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
break;
case "Rain":
document.getElementById("wrapper-bg").style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
break;
case "Clear":
document.getElementById("wrapper-bg").style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
break;
case "Thunderstorm":
document.getElementById("wrapper-bg").style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')";
break;
default:
document.getElementById("wrapper-bg").style.backgroundImage =
"url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
break;
}
});

/*
var BOOKMARK={};BOOKMARK.max=max_bookmark;BOOKMARK.checkLocalStorage=function(){return typeof(Storage)==="function";};BOOKMARK.storeLocalStorage=function(name,data){if(false==BOOKMARK.checkLocalStorage())
return false;return localStorage.setItem(name,JSON.stringify(data));};BOOKMARK.getLocalStorage=function(name){if(typeof name===undefined)
return false;if(false==BOOKMARK.checkLocalStorage())
return false;if(name in localStorage===false)
return false;return JSON.parse(localStorage[name]);};BOOKMARK.getStored=function(){var bookmarks=BOOKMARK.getLocalStorage("bookmark");if(false==bookmarks)return[];if(typeof(bookmarks)!==typeof([]))return[];else return bookmarks;};BOOKMARK.find=function(id){if(false==BOOKMARK.checkLocalStorage()){return false;}
var stored=BOOKMARK.getStored();var index=stored.indexOf(id);return index;};BOOKMARK.remove=function(id){if(false==BOOKMARK.checkLocalStorage()){return false;}
var stored=BOOKMARK.getStored();var index=stored.indexOf(id);if(index===-1)return true;stored.splice(index,1);BOOKMARK.storeLocalStorage("bookmark",stored);jQuery.post(ajaxurl,{"action":"bookmark_remove","id":id});return true;};BOOKMARK.push=function(id){if(false==BOOKMARK.checkLocalStorage()){alert('Maaf, browser anda tidak mendukung fitur ini.\nGunakan browser google chrome / mozilla');return false;}
if(isNaN(id))return false;var stored=BOOKMARK.getStored();if(stored.length>=BOOKMARK.max){stored=stored.slice(-BOOKMARK.max);BOOKMARK.storeLocalStorage("bookmark",stored);alert("Maaf, anda mencapai batas bookmark, \nsilahkan hapus anime lain dari bookmark");return false;}
if(stored.indexOf(id)!==-1){return true;}
stored.unshift(id);BOOKMARK.storeLocalStorage("bookmark",stored);jQuery.post(ajaxurl,{"action":"bookmark_push","id":id});return true;};BOOKMARK.check=function(){var BMEl=jQuery("div.bookmark[data-id]");if(BMEl.length<1)return false;var id=BMEl.get(0).getAttribute('data-id');if(isNaN(id))return false;var bindex=BOOKMARK.find(id);if(!isNaN(bindex)&&bindex!==-1){BMEl.html('<i class="fas fa-bookmark" aria-hidden="true"></i> Bookmarked');BMEl.addClass('marked');return true;}else{BMEl.html('<i class="far fa-bookmark" aria-hidden="true"></i> Bookmark');BMEl.removeClass('marked');return false;}};BOOKMARK.listener=function(){var BMEl=jQuery("div.bookmark[data-id]");if(BMEl.length<1)return false;BMEl.on('click',function(){var id=this.getAttribute('data-id');if(isNaN(id))return false;if(BOOKMARK.find(id)===-1){BOOKMARK.push(id);}else{BOOKMARK.remove(id);}
BOOKMARK.check();return true;});};

*/