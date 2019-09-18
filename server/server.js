const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://kassandram022:apple123@cluster0-diz79.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const tracksController = require('./controllers/tracksController');
const usersController = require('./controllers/usersController');


app.use(bodyParser.json());


app.post('/api/tracks', tracksController.setApiToken, tracksController.getTracks, (req, res) => {
  res.status(200).json(res.locals.tracks);
});

app.post('/api/user', usersController.setApiToken, usersController.getUserInfoFromSpotify, usersController.setUserInfoFromDatabase, (req, res) => {
  res.status(200).json(res.locals);
});

app.post('/api/favs/remove', usersController.setApiToken, usersController.removeFavoriteFromSpotify, usersController.removeFavFromDatabase, (req, res) => {
  res.status(200).json(res.locals.favorites);  // update redux favorites
});

app.post('/api/favs/add', usersController.setApiToken, usersController.addFavoriteToSpotify, usersController.addFavToDatabase, (req, res) => {
  res.status(200).json(res.locals.favorites);
});


// catch-all route handler for any requests to an unknown route
app.use('*', (req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// launch our backend into a port
app.listen(3000, () => console.log(`LISTENING ON PORT 3000`));
