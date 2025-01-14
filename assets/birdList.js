var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content')
const audioElement = new Audio("XC700147 - Egyptian Goose - Alopochen aegyptiaca (6).mp3")
var countryName = document.getElementById('country-name');
var temp = document.getElementById('temp');
var condition = document.getElementById('condition');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var icon = document.getElementById('icon');
// var url = "xeno-canto.org/sounds/uploaded/LESINAMNUB/XC684991--Delicate_Prinia_Al_Wukair_Farm_Qatar_Y_Abboushi.mp3"
// new Audio (url)
// console.log(url);

function printResults(resultObj) {
  console.log(resultObj);

  // set up `<div>` to hold result content
  var resultCard = document.createElement('div');
  resultCard.classList.add('card');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.en;

  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    '<strong>Date:</strong> ' + resultObj.date + '<br/>';



  var linkButtonEl = document.createElement('a');
  var dataSonoSmall = resultObj.sono.small
  console.log(dataSonoSmall);
  var fileName = resultObj["file-name"]
  console.log(fileName);


  var alphaNum = resultObj.sono.small.split("uploaded/")[1].split("/ffts")[0];
  console.log(alphaNum);

  var url = `https://xeno-canto.org/sounds/uploaded/${alphaNum}/${fileName}`
  var audio = new Audio(url);
  
  linkButtonEl.textContent = 'Play Clip';
  linkButtonEl.classList.add('btn', 'btn-dark');
  linkButtonEl.addEventListener('click', function() {
    if (audio.paused) {
      audio.play();
      linkButtonEl.textContent = 'Pause Clip';
    } else {
      audio.pause();
      linkButtonEl.textContent = 'Play Clip';
    }
  });

  resultBody.append(titleEl, bodyContentEl, linkButtonEl);
  resultContentEl.append(resultCard);
}


function getParams() {
    // Get the search params out of the URL and the Query itself
    var countryParam = document.location.search.split(':').pop();
    // Returns the country the user selected on homepage
    console.log(countryParam);
    // Passes the country value into the searchApi function
    searchApi(countryParam);
    weather(countryParam);
}


  function searchApi(countryParam) {
    // Takes the country the user selected and adds it into the URL to query the right country via the API, then fetches and returns the response
    var cntQueryUrl = 'https://xeno-canto.org/api/2/recordings?query=cnt:';
    if (countryParam) {
        // Limiting our query to country and only page 1
        cntQueryUrl = 'https://xeno-canto.org/api/2/recordings?query=cnt:' + countryParam + "&page=1";
        // Write the country that the user selected to the 2nd HTML page
        resultTextEl.textContent = decodeURIComponent(countryParam);
    }
    // Logging for testing
    console.log(cntQueryUrl);

    fetch(cntQueryUrl)
        .then(function(response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (birdData) {
        // Logging for testing again
        console.log(birdData);

        for (var i = 0; i <= 40; i++) {
            printResults(birdData.recordings[i]);
        }
})
}
getParams();

//Weather API 
function weather(countryParam) {
    var countryParam = document.location.search.split(':').pop();
    var weatherApiKey = "d02feca2db0e95acf19c297c2c394117";
    if (countryParam) {
        // Limiting our query to country and only page 1
    var requestWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${countryParam}&appid=${weatherApiKey}&units=imperial`
}
    fetch(requestWeatherURL)
    .then(function (response) {
    console.log(response);
    return response.json(); 
    })
    .then(function (data) {
    console.log(data);
    
    for (let i = document.images.length; i--> 0;) {
        document.images[i].parentNode.removeChild(document.images[i]);
    }
    var iconCode = data.weather[0].icon;
    var image = document.createElement("img");
    image.setAttribute("src", "https://openweathermap.org/img/wn/" + iconCode + ".png");
    icon.append(image)
    countryName.textContent = `${data.name}`;
    temp.textContent = `Temperature: ${data.main.temp} °F`;
    condition.textContent = `Condition: ${data.weather[0].description}`;
    wind.textContent = `Wind Speed: ${data.wind.speed} MPH`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;        
    })
}
weather()
