window.addEventListener('DOMContentLoaded', () => {
  const buttonrr = document.getElementById("woo");
    buttonrr.addEventListener("click", function() {
      window.location.href = "../../index.html";
    }); 
  
  const date = new Date();
  let currHours = date.getHours();
  const output__name = document.getElementById('output__name'),
        output__wind = document.getElementById('output__wind'),
        output__sunrise = document.getElementById('output__sunrise'),
        output__sunset = document.getElementById('output__sunset'),
        output__visibility = document.getElementById('output__visibility'),
        output__weather = document.getElementById('output__weather'),
        output__feels_like = document.getElementById('output__feels_like'),
        output__humidity = document.getElementById('output__humidity'),
        output__pressure = document.getElementById('output__pressure'),
        output__temp = document.getElementById('output__temp'),
        output__temp_max = document.getElementById('output__temp_max'),
        output__temp_min = document.getElementById('output__temp_min'),
        weatherImg = document.getElementById('weatherImg'),
        sun = document.querySelector('.over_item_sun');
  // Получение геолокации
  async function geo () {
    const ipResponse = await fetch('https://api.ipify.org?format=json' );
    const ipData = await ipResponse.json();
    const ip = ipData.ip;
    const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const locationData = await locationResponse.json();
    const latitude = locationData.latitude;
    const longitude = locationData.longitude;
    getWeatherData(latitude, longitude)
  }
    geo()
  let nightLengthString;
  let nightLengthNow;
  async function getWeatherData(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bd81a51054627cf63889ac4264a3e9ac&units=metric&lang=en`);
    if (response.ok) {
      const data = await response.json();
      let currentDescr = data.weather[0].description
      output__name.textContent = `${data.name}`;
      output__wind.textContent = `${Math.round(data.wind.speed)}km/h`;
      output__sunrise.textContent = `${new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
      output__sunset.textContent = `${new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
      output__visibility.textContent = `Visibility ${data.visibility / 100}%`;
      output__weather.textContent = `${currentDescr.charAt(0).toUpperCase() + currentDescr.slice(1)}`;
      output__feels_like.textContent = `Feels like ${Math.round(data.main.feels_like)}°`;
      output__humidity.textContent = `${data.main.humidity}%`;
      output__pressure.textContent = `Atmosphere pressure ${data.main.pressure * 0.75}`;
      output__temp.textContent = `${Math.round(data.main.temp)}°`;
      output__temp_max.textContent = `Ожидается ${data.main.temp_max} °C`;
      output__temp_min.textContent = `Минимально ${data.main.temp_min} °C`;
      let sunriseNight =  new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {day: '2-digit',hour: '2-digit', minute:'2-digit'})
      let sunsetNight = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {day: '2-digit',hour: '2-digit', minute:'2-digit'})
      getNightHours(sunriseNight, sunsetNight)
      sunAnim ()
      getIcons()
    } else {
      console.error('Ошибка загрузки данных:', response.status);
    } 
  }; 
  function parseTimeString(timeString) {
    // Разбиваем строку на часы, минуты и секунды
    const [date, hours, minutes, seconds] = timeString.split(':');
    // Создаем новую дату, используя текущую дату и время из строки
    const now = new Date();
    const dates = new Date(now.getFullYear(), now.getMonth(), date, hours, minutes, seconds);
    return dates;
  } 
  
  function getNightHours(sunriseNight, sunsetNight) {
    sunriseNight = `${sunriseNight.replace(/,/, ':').replace(/\s/, '')}:00`
    sunsetNight = `${sunsetNight.replace(/,/, ':').replace(/\s/, '')}:00`
    let dateNow = new Date()
    dateNow = `${dateNow.getDate()}:${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`
    const sunriseDate = parseTimeString(sunriseNight);
    const sunsetDate = parseTimeString(sunsetNight);
    
    if (sunsetDate < sunriseDate) {
      sunsetDate.setDate(sunsetDate.getDate() + 1);
    }
    const nightLengthMs =  sunriseDate.getTime() - sunsetDate.getTime();
    const nightLength = new Date(nightLengthMs);
    const nightHours = nightLength.getUTCHours();
    
    nightLengthString = nightHours; // длина ночи

    let now = new Date();



    if (now >= sunsetDate || now <= sunriseDate) {
      const diffMs = now.getTime() - sunsetDate.getTime();
      const diffDate = new Date(diffMs);
      const hours = diffDate.getUTCHours();
      nightLengthNow = hours
      console.log("Сейчас ночь, прошло " + nightLengthNow + ' часа');
    } else {
      console.log("Сейчас еще день");
    }
  }

  function clickHandler() {
    sunAnim();
  }

  sun.addEventListener('click', clickHandler)

  function sunAnim () {
    let sunset, sunrise, nowPos, sunriseMin, sunsetMin;
    sunset = output__sunset.textContent.slice(0, 2);
    sunrise = output__sunrise.textContent.slice(0, 2);
    sunriseMin = output__sunrise.textContent.slice(3);
    sunsetMin = output__sunset.textContent.slice(3);
    sunrise[0] == '0' ? sunrise = output__sunrise.textContent.slice(1, 2) : sunrise;
    sunset[0] == '0' ? sunset = output__sunset.textContent.slice(1, 2) : sunset;
    +sunriseMin >= 30 ? sunrise = +sunrise+1 : sunriseMin;
    +sunsetMin >= 30 ? sunset = +sunset+1 : sunsetMin;
    nowPos = Math.round(((currHours - sunrise) / (sunset - sunrise)) * 100); 
    
    
    if (currHours <= sunrise || currHours >= sunset) {
      sun.removeEventListener('click', clickHandler)
      sun.src = 'img/moon.svg'
      nowPos = Math.round((nightLengthNow / nightLengthString) * 100)
      let a;
      a = output__sunrise.textContent
      output__sunrise.textContent = output__sunset.textContent
      output__sunset.textContent = a
      
    }   
    let centerX = 145;
    let centerY = 130;
    let radius = 150;
    let speed = 0.0008;
    let animationId;
    let angleStart = Math.PI;
    let angleEnd = Math.PI + (nowPos / 100) * Math.PI;
    sun.style.display = 'block';
    function animate() {
      const angleDelta = angleEnd - angleStart;
      const elapsedTime = performance.now() - startTime;
      const angle = angleStart + angleDelta * Math.sin(speed * elapsedTime);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      sun.style.left = x + 'px';
      sun.style.top = y + 'px';
      if (angle.toFixed(3) >= angleEnd.toFixed(3)) {
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(animate);
      }
    }
    let startTime = performance.now();
    animate();
  }

  function getIcons () {
    console.log(output__weather.textContent)
    weatherImg.src = `img/${output__weather.textContent}.svg`
  }
  
});

