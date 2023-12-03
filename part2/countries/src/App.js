import React, { useEffect, useState } from 'react';
import axios from 'axios'

const App = () => {
  const [ filter, setFilter ] = useState('');
  const [ countries, setCountries ] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data)
      })
  },[])


  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleShowCountry = (event) => {
      // previousElementSilbing -> obtiene el elemento html hermano anterior al target (button)
      setFilter(event.target.previousElementSibling.textContent)
  }

  return (
    <div>
      <Filter filter={filter} handlerFilterChange={handleFilterChange}/>
      <Countries filter={filter} countries={countries} handleShowCountry={handleShowCountry}/>
    </div>
  );
};

const Filter = ({ filter, handlerFilterChange }) => {
  return (
    <div>
      find countries <input value={filter} onChange={handlerFilterChange}></input> 
    </div>
  );
}

const Countries = ({ countries, filter, handleShowCountry }) => {

  const paisesEncontrados = countries
    .filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()));
  console.log(paisesEncontrados)
  if (paisesEncontrados.length > 10) {
    // más de 10 paises que coinciden con la consulta
    return (
      <p>To many matches, specify another filter</p>
    );
  }
  else {
    if (paisesEncontrados.length === 1) {
      // solo hay un país que coincide con la consulta
      return (
        <Country country={paisesEncontrados[0]}/>
      );
    }
    else{
      if (paisesEncontrados.length === 0) {
        // ningun país coincide con la consulta
        return (
          <p>There are no countries with that filter</p>
        );
      }
      else {
        // hay diez o menos países que coinciden con la consulta, pero más de uno
        
        return (
          <ul>
            {paisesEncontrados.map(c => 
              <div key={c.name.common}>
                <li>{c.name.common}</li>
                <button type='button' onClick={handleShowCountry}>Show</button>
              </div>)}
          </ul>
        );
      }
    }
  }
}

const Country = ({ country }) => {
  return (
    <>
      <BasicCountryData name={country.name.common} capital={country.capital} population={country.population}/>
      <Languages languages={country.languages}/>
      <Flag image={country.flags.png}/>
      <Weather capital={country.capital} coordenadas={country.capitalInfo.latlng}/>
    </>
  );
};

const BasicCountryData = ( {name, capital, population}) => {
  return (
    <>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
    </>
  )
};

const Languages = ({ languages }) => {
  
  const arrayLanguages = [];
  for (const key in languages) {
    if (Object.hasOwnProperty.call(languages, key)) {
      const element = languages[key];
      arrayLanguages.push(element)
    }}
  
  return (
    <>
      <h2>languages</h2>
      <ul>
        {
          arrayLanguages.map(language => <li key={language}>{language}</li>)
        }
      </ul>
    </>
  )
};

const Flag = ( {image} ) => {
  return (
    <>
      <img src={image} alt='country flag'></img>
    </>
  )
};

const Weather = ({ capital, coordenadas }) => {
  const [ weather, setWeather] = useState(null);

  useEffect(() => {
    axios
    .get(`http://api.weatherunlocked.com/api/current/${coordenadas[0]},${coordenadas[1]}?app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_API_KEY}`)
    .then((response) => {
      setWeather(response.data)
    }).catch(() => console.error("Error al consultar el clima ..."))
    },[coordenadas])

  // Verificar si weather no es null antes de intentar acceder a sus propiedades
  if (!weather) {
    return <p>Loading weather...</p>;
  }

  console.log(weather)
  return (
    <>
      <h2>Weather in {capital}</h2>
      <p>temperature: {weather.temp_c} Celcius</p>
      <img src="" alt={'weather icon ' + weather.wx_desc} ></img>
      <p>wind: {weather.windspd_mph} mph direction {weather.winddir_compass}</p>
    </>
  );
}

export default App;