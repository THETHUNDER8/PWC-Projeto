const API_KEY = "&appid=9a69c91bcc707914fff925bc7df54ef3";
const apiWeatherURL_current="https://api.openweathermap.org/data/2.5/weather?";
const apiWeatherURL_forecast="https://api.openweathermap.org/data/2.5/forecast?";
const LIMIT_RESPONSE = "&limit=1";
const units = "&units=metric";
const lang = "&lang=pt";
const CARDMAIN1 = apiWeatherURL_current + "q=Russia"+ units+ API_KEY + lang;
const CARDMAIN2 = apiWeatherURL_current + "q=Nova York"+ units+ API_KEY + lang;
const CARDMAIN3 = apiWeatherURL_current + "q=Lisboa"+ units+ API_KEY + lang;
const CARDMAIN4 = apiWeatherURL_current + "q=Rio de Janeiro"+ units+ API_KEY + lang;
const CARDMAIN5 = apiWeatherURL_current + "q=Tokio"+ units+ API_KEY + lang;
const CARDMAIN6 = apiWeatherURL_current + "q=Nova Delhi"+ units+ API_KEY + lang;


//Função que processa informação relativa as 6 cidades apresentadas no Home
function getCardWeatherData(apiUrl, nameId, countryId, tempId, tempMaxId, tempMinId, feelsLikeId, descriptionId,bgId) {
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
		document.getElementById(bgId).style.color = "white";//como o fundo é preto muda a cor para branco
		break;
		case "Clouds":
		document.getElementById(bgId).style.backgroundImage =
		"url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
		break;
		case "Fog":
		case "Haze":
		case "Mist":
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

//mostra as 6 cidades no home
getCardWeatherData(CARDMAIN1,'name1','country1','temp1','max1','min1','feels_like1','description1','bg1');
getCardWeatherData(CARDMAIN2,'name2','country2','temp2','max2','min2','feels_like2','description2','bg2');
getCardWeatherData(CARDMAIN3,'name3','country3','temp3','max3','min3','feels_like3','description3','bg3');
getCardWeatherData(CARDMAIN4,'name4','country4','temp4','max4','min4','feels_like4','description4','bg4');
getCardWeatherData(CARDMAIN5,'name5','country5','temp5','max5','min5','feels_like5','description5','bg5');
getCardWeatherData(CARDMAIN6,'name6','country6','temp6','max6','min6','feels_like6','description6','bg6');

//pesquisa cidade
$('#btSearch').on('click', function(){
	var search = $('#pesquisa').val();
	var infoFavorito = apiWeatherURL_forecast + "q=" + search + units+ API_KEY + lang;
	let index = 0;
	fetch(infoFavorito)
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		let resultado = document.querySelector("#resultado_Pesquisa");
		resultado.innerHTML = data.list
		.slice(0, 40)
 		.filter((day, index) => index % 8 === 0)
      	.map((day) => {
        if (index <= 40) {
          let dt = new Date(day.dt * 1000); //timestamp * 1000
          return `<div class="col-md-8 col-lg-6 col-xl-4">
          <div class="card shadow-0 border">
           <div class="card-body p-4">
           		<h5 class="card-title p-2">${dt.toDateString()}</h5>
                <div class="d-flex flex-row align-items-center">
                  <img
                  src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
                  class="card-img-top"alt="${day.weather[0].description}"
                />
                </div>
                <h3 id="tempo">${day.weather[0].main}</h3>
                <h2 id="name">${data.city.name}</h2>
                <h4 id="country">${data.city.country}</h4>
                <h6 id="temp">Temperatura:${day.main.temp}&degC</h6>
                <h6><span id="max">Max:${day.main.temp_max}&degC  </span><span id="min">  Min:${day.main.temp_min}&degC</span></h6>
                <h6 id="feels_like">Temperatura aparente:${day.main.feels_like}&degC</h6>
                <h6 id="vento">Vento:${day.wind.speed}m/s</h6>
                <h6 id="humidade">Humidade:${day.main.humidity}%</h6>
                <h6 id="nuvens">Cobertura de nuvens:${day.clouds.all}%</h6>
                <h6 id="PressAtmosferica">Pressão atmosférica:${day.main.pressure}hPa</h6>
                <h6><span id="long">Longitude:${data.city.coord.lon}  </span><span id="lat">  Latitude:${data.city.coord.lat}</span></h6>
                
               </div>
               
           </div>
          </div>`;
        }
      })
      .join(' ');
	});
});

$(carregarFavorito);

function carregarFavorito()
{
    if (typeof(Storage) === "undefined")  // Verifica se o browser suporta local storage
    {
        erroLocalStorage();
        return;
    }

    // Recupera os favoritos guardados na storage
    var favoritos = JSON.parse(localStorage.getItem("favoritos"));

    if ( $("#pesquisaCidade").length) // index.html
    {
        $("#name").val(favoritos.name); // Coloca os favoritos nas respetivas caixas de input
        $("#temp").val(favoritos.temp);
        $("#temp_max").val(favoritos.temp_max);
        $("#temp_min").val(favoritos.temp_min);
        $("#description").val(favoritos.description);
    }
    else if ( $("body#favoritos").length) // Favoritos.html
    {
        $("#favorito").text(" " + favoritos.name + favoritos.temp + favoritos.temp_max + 
        favoritos.temp_min + favoritos.description ); // Coloca o nome no título
    }
}

function submeterFavorito(event)
{
    if (typeof(Storage) !== "undefined") 
    {
        var favoritos = { // Objeto JSON
            "name" : $("#name").val(),
            "temp" : $("#temp").val(),
            "temp_max" : $("#temp_max").val(),
            "temp_min" : $("#temp_min").val(),
            "description" : $("#description").val()

        };

        localStorage.setItem("favoritos", JSON.stringify(favoritos)); // Guarda os favoritos na local storage
    } 
    else 
    {
        erroLocalStorage();
    }
}

function removerFavorito()
{
    localStorage.removeItem("favoritos");
}

function erroLocalStorage()
{
    $( "#error" ).text( "Not valid!" ).show().fadeOut( 1000 );
    event.preventDefault();
}
