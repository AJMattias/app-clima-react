import React, { useState } from 'react'

export const WheatherApp = () => {
    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const apiKey = '02c0e30266c1af50893f6dcde504f6fd'

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)
    const difKelvin= 273.15
    
    const fetchClima = async() => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${apiKey}`)
            const data = await response.json()
            setDataClima(data)
        } catch (error) {
            console.error('Ocurrio el diguiente Error: ', error)
        }
    }
    const handleCambioCiudad =(e) =>{
        setCiudad(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(ciudad.length > 0) fetchClima()
    }

  return (
    <div className="container">
        <h1>Aplicacion del Clima</h1>

        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={ciudad} 
                onChange = {handleCambioCiudad}
            />
            <button type='submit'>Buscar</button>
        </form>

        {
            dataClima && (
                <div> 
                    <h2>{dataClima.name}</h2>
                    <p>Temperatura: {parseInt(dataClima?.main.temp - difKelvin)}°C</p>
                    <p>Condicion Meteorilogica: {dataClima.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
                </div>
            )

        }
    </div>
  )
}
