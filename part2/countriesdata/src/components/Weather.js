import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Weather = ({city}) => {
    const [weather, setWeather] = useState({
        current: {
            temperature: 0,
            weather_descriptions: [],
            weather_icons: [],
            wind_dir: '',
            wind_speed: 0
        },
        location: {
            name: ''
        }
    });

    useEffect(()=>{
        axios
        .get(
            `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${city}`
        )
        .then(response => {
            setWeather(response.data);
        });
    }, [city]);

    return(
        <div>
            <h2>Weather in { weather.location.name }</h2>
            <div><strong>temperature: </strong> {weather.current.temperature} Celcius</div>
            <img src={weather.current.weather_icons[0]} alt={'icon of ' + weather.current.weather_descriptions} />
            <div><strong>wind: </strong>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
        </div>
    );
}

export default Weather;