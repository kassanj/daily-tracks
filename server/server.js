const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const tracksController = require('./controllers/tracksController');
const usersController = require('./controllers/usersController');


app.use(bodyParser.json());


app.post('/api/tracks', tracksController.setApiToken, tracksController.getTracks, (req, res) => {
  res.status(200).json(res.locals.tracks);
});

app.post('/api/user', usersController.setApiToken, usersController.getUserInfoFromSpotify, (req, res) => {
  res.status(200).json(res.locals.user);
});

// app.post('/api/favorites', usersController.getUser, usersController.getFavorites, (req, res) => {
//   res.status(200).json(res.locals.favorites);
// });

// spotifyApi.removeFromMySavedTracks(["3VNWq8rTnQG6fM1eldSpZ0"])
// spotifyApi.addToMySavedTracks(["3VNWq8rTnQG6fM1eldSpZ0"])

// play / pause song
// set up sdk player


// catch-all route handler for any requests to an unknown route
app.use('*', (req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// launch our backend into a port
app.listen(3000, () => console.log(`LISTENING ON PORT 3000`));
