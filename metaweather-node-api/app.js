const express = require('express');
const app = express();
const fetch = require('node-fetch');
var cors = require('cors')
app.use(cors());

app.get('/', async (req, res) => {
    const apiURL = "https://www.metaweather.com/api/location/742676/";
    let forecast = [];
    try {
        const response = await fetch(apiURL, { headers: { 'Content-Type': 'application/json' }});
        const jsonResponse = await response.json();
        for( let i = 0; i < jsonResponse.consolidated_weather.length; i++) {

            forecast.push({
                date: new Date(jsonResponse.consolidated_weather[i].applicable_date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: undefined,
                  }),
                icon: 'https://www.metaweather.com/static/img/weather/' + jsonResponse.consolidated_weather[i].weather_state_abbr + '.svg',
                maxTemp: Math.trunc(jsonResponse.consolidated_weather[i].max_temp),
                minTemp: Math.trunc(jsonResponse.consolidated_weather[i].min_temp),
            });
        }
        res.send(forecast);
    }
    catch (e){
        console.log(e);
    }
});

app.listen(3000, (req, res) => {
    console.log('Express API is running at port 3000')
})