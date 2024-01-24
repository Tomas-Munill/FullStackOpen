import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }
  
export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then((response) => {
          const countryData = response.data
          setCountry({
            found: true,
            data: countryData
          })
        })
        .catch(() => {
          setCountry({
            found: false,
            data: {}
          });
        })
    },[name])
    console.log(country)
    return country
  }