'use strict';

//Dependencies
//Require triggers the dotenv mode nodule to export to this file in the form of an object. the config method then establishes the user environment by parsing variables from the .env file.
require('dotenv').config();

//Simililary to the example above this next line exports the express module to this file and stores it in a variable express.
const express = require('express');

//cors is a node module to prevent cross-origin scripting
const cors = require('cors');



//Setup app
const app = express();
//Cors must be INVOKED
app.use(cors());


//Routes
app.get('/', (request,response) => response.send('You made it!'));
app.get('/location', locationRouter);
app.get('/weather', weatherRouter)
app.get('*', errorHandler);
// Helper Functions
function locationRouter(request, response){
  const city = request.query.data;
  const geoData = require('./data/geo.json');
  const locationData = new Location(city, geoData);
  response.status(200).send(locationData);
}

function Location(city, geoData){
  const cityData = geoData.results[0];

  this.search_query = city;
  this.formatted_query = cityData.formatted_address;
  this.latitude = cityData.geometry.location.lat;
  this.longitude = cityData.geometry.location.lng;
}

function weatherRouter(req, res){
  const darkSkyData = require('./data/darksky.json');
  const forecast = new Weather(darkSkyData);
  res.status(200).send(forecast);
}

function Weather(weatherData){
  let weatherArr = weatherData.daily.data.map( dailyforecast => {
    let newTime = new Date(dailyforecast.time * 1000).toDateString();
    return dailyforecast = {
      forecast: dailyforecast.summary,
      time: newTime
    }
  });
  return weatherArr;
}

function errorHandler(req, res){
  res.status(500).send('Sorry, something went wrong');
}

//Start listening, think about this like an event listener(the whole server code) attached to the port
//A node http.Server is returned
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
