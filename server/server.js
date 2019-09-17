const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const tracksController = require('./controllers/tracksController');

app.use(bodyParser.json());


app.post('/api/tracks', tracksController.setApiToken, tracksController.getTracks, (req, res) => {
  res.status(200).json(res.locals.tracks);
});


// app.use('/dist', express.static(path.join(__dirname, '../dist')));

// serve index.html on the route '/'
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index.html'));
// });

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// launch our backend into a port
app.listen(3000, () => console.log(`LISTENING ON PORT 3000`));
