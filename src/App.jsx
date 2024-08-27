// imports
import { CgSearch } from "react-icons/cg";
import { HiLocationMarker } from "react-icons/hi";
import { IoWater } from "react-icons/io5";
import { FiWind } from "react-icons/fi";
import { useState } from "react";
import './App.css'
import img_d from "./img/dia.jpg";
import img_tq from "./img/tarde_sol.jpg";
import img_td from "./img/tarde_dark.jpg";
import img_n from "./img/noite.jpg";

// it's main
function App() {
  //hour, Backgound photo 
  const data_hour = new Date()
  const take_hour = data_hour.getHours()
  if (take_hour <= 12 && take_hour >= 5){
    // day morning
    document.querySelector("body").style.background = `url(${img_d})`
    document.querySelector("body").style.backgroundSize = "cover"
    document.querySelector("body").style.backgroundPosition = 'center'
  }else if(take_hour <= 16 && take_hour >= 13){
    //evening of soul
    document.querySelector("body").style.background = `url(${img_tq})`
    document.querySelector("body").style.backgroundSize = "cover"
    document.querySelector("body").style.backgroundPosition = 'center'
  }else if(take_hour <= 19 && take_hour >= 17){
    // evening dark
    document.querySelector("body").style.background = `url(${img_td})`
    document.querySelector("body").style.backgroundSize = "cover"
    document.querySelector("body").style.backgroundPosition = 'center'
  }else{
    // night
    document.querySelector("body").style.background = `url(${img_n})`
    document.querySelector("body").style.backgroundSize = "cover"
    document.querySelector("body").style.backgroundPosition = 'left'
  }
  // Uso do useStat
  const [cidade, setCity] = useState()
  const handleChange = (event) =>{
    setCity(event.target.value)
  }
  const handleKeydown = (event) =>{
    if (event.key === 'Enter'){
      click()
    }
  }
  // variaveis API
  const apiKey = "3458ccfaa151ce74b3263c7b8e64f53f";
  var datecity = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&inits=metric&appid=${apiKey}&lang=pt_br`
  

  // variaveis id
  var weatherContainer = document.querySelector("#weather-date")
  var countryElement = document.querySelector("#country")
  var weatherIconElement = document.querySelector("#weather-icon")
  var c = document.getElementById("city")
  var temp = document.querySelector("#temperature span")
  var clima = document.querySelector("#description")
  var Humidity = document.querySelector("#humidity span")
  var wind_vell = document.querySelector("#wind span")
  var errorMessageContainer = document.querySelector("#error-message");
  // funçoes 
  async function click() {
    // Variaveis
    const date = await fetch(datecity)
    const date_resposta = await date.json()
    // Condiçoes
    if (cidade == ''  || date_resposta.cod == 404){
      errorMessageContainer.classList.remove("hide");
      weatherContainer.classList.add("hide")
    }else{
      weatherContainer.classList.remove("hide")
      errorMessageContainer.classList.add("hide");
      countryElement.setAttribute("src", `https://flagsapi.com/${date_resposta.sys.country}/shiny/64.png`);
      c.innerHTML = `${cidade}`
      // temp.innerHTML = Number(String(date_resposta.main.temp).slice(0, 2))
      temp.innerHTML = parseInt(date_resposta.main.temp - 274.15)
      clima.innerHTML = date_resposta.weather[0].description;
      weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${date_resposta.weather[0].icon}.png`)
      Humidity.innerHTML = `${date_resposta.main.humidity}%`
      wind_vell.innerHTML = `${date_resposta.wind.speed} km/h`
    }
  }

  // html here
  return (
    <div className='container'>
      <div className="form">
        <h3>Check the weather of a city:</h3>
        <div className="form-input-container">
            <input type="search" placeholder='Search city' maxLength={30} id="city-input" onChange={handleChange} onKeyDown={handleKeydown}/>
            <button id='search' onClick={click}><CgSearch/></button>
        </div>
      </div>

      <div id="weather-date" className="hide">
        <h2><HiLocationMarker/>
        <span id="city"></span>
        <img src="" alt="Bandeira do pais" id="country" />
        </h2>

        <p id="temperature"><span></span>&deg;C</p>

        <div id="description-container">
          <p id="description"></p>
          <img src="" alt="Condição do tempo" id="weather-icon" />
        </div>
        <div id="details-container">
          <p id="humidity" className="humidity">
          <i><IoWater/></i>
            <span></span>
          </p>

          <p id="wind">
            <i><FiWind /></i>
            <span></span>
          </p>
        </div>
      </div>
      <div id="error-message" class="hide">
        <hr/>
        <p>Unable to find the weather for a city with this name.</p>
      </div>
    </div>
  )
}

export default App;
