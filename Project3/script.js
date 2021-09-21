function showWarning(msg) {
  document.querySelector(".aviso").innerHTML = msg;
}

function showInfo(json) {
  showWarning("");
  let windDirection = "";
  document.querySelector(".resultado").style.display = "block";
  document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`;
  document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`;
  document.querySelector(".tempDesc").innerHTML = `${json.tempDesc}`;
  document.querySelector(
    ".ventoInfo"
  ).innerHTML = `${json.windSpeed} <span>km/h</span>`;
  document
    .querySelector(".temp img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );
  document.querySelector(".ventoPonto").style.transform = `rotate(${
    json.windAngle - 90
  }deg)`;

  if (json.windAngle > -30 && json.windAngle < 30) {
    windDirection = "norte";
  } else if (json.windAngle > 30 && json.windAngle <= 120) {
    windDirection = "leste";
  } else if (json.windAngle > 120 && json.windAngle <= 220) {
    windDirection = "sul";
  } else if (json.windAngle > 220 && json.windAngle <= 320) {
    windDirection = "oeste";
  } else if (json.windAngle > 320) {
    windDirection = "norte";
  }
  document.querySelector(".ventoDesc").innerHTML = windDirection;
}

function clearInfo() {
  showWarning("");
  document.querySelector(".resultado").style.display = "none";
}

document.querySelector(".busca").addEventListener("submit", async (event) => {
  event.preventDefault();
  let input = document.querySelector("#searchInput").value;
  if (input !== "") {
    showWarning("Carregando");
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=b9862ff2acfea82de01e3b9bb12bf70f&units=metric&lang=pt_br`;
    let results = await fetch(url);
    let json = await results.json();
    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        tempDesc: json.weather[0].description,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      clearInfo();
      showWarning("Não encontramos esta localização");
    }
  } else {
    clearInfo();
  }
});
