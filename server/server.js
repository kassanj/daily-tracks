const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Spotify = require('spotify-web-api-node');

// app.use(cors());
// const router = express.Router();
// const logger = require('morgan');
// const cors = require('cors');

// bodyParser, parses the request body to be a readable json format
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const spotify = new Spotify({
  id: 'ed1772750e46412fb4cbc82dc12748f7',
  secret: '8c8a7dc1eb6045febb34290bed411a7a',
});

spotify.setAccessToken('BQAvSBPHeWlAm9ZhRCWs11wMWpUukUeXhqNhQFjSvyHBO9yDHEkophoHNQCBnqzBXZK_AKjwtlx2Mqj8QiXWBa0NGd1kSS9ti5aA_R3jwwAyWGVkT5HMSzwL6Lj6IHc58vAyh92ZX5pQDC5ELh7SkDswTOIiZuGTyFj-l_l4U_2qGIWjBXzK');

const leaderList = [
  { name: 'Anna', id: 'a0' },
  { name: 'Ben', id: 'b0' },
];

app.get('/api/leaders', (req, res) => {
  res.send(leaderList);
});


app.get('/api/playlists', async (req,res) => {
  try {
    const result = await spotify.getArtist('2hazSY4Ef3aB9ATXW7F5w3')
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err)
  }
});


// getPlants
// getPlant  :plant_id

// getFavorites :user_id
// addFavorite  :user_id, :plant_id
// removeFavorite  :user_id, :plant_id

// login
// addUser
// authenticate

// append /api for our http requests
// app.use('/api', router);

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
