# Weather App for traveling

The user can provide a travel destination (city and country) and date to see the estimated weather on that particular date. Additional informationa about the country will be displayed, too, as well as a few pictures of the location. Recent searches are shown on the left hand side, but can be collapsed on big screens.

## Used Technologies / Frameworks

The following technologies / frameworks were used:

- JavaScript
- Node.js
- Express
- Webpack
- Jest
- API: Restcountries, Pixabay, Geonames, Darksky

## Description

Clicking on the button will evaluate the input. If the input is complete, the first async call will get all the API information (key, url, username, etc.). These are passed to the following API calls. A call to the Geonames API will return coordinates for the desired location which are passed on for the Darksky API call. An empty array in the data array (src/server/index.js) will also be created. Darksky, Restcountries and Pixabay API calls will pass data to the newly created serverside array.
After the chain of API calls, the content of the data array will be called and displayed.

## To run the project

Project code is available at https://github.com/stadler-pt/travelweather

To start the project locally node.js has to be installed.

$ git clone https://github.com/stadler-pt/travelweather travel

$ cd travel

$ npm install

$ npm run build-prod

$ npm run start

Project will run at localhost:7000

Development mode can be entered with
$ npm run build-dev
(node server needs to run for API calls)
