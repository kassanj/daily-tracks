const fetch = require('node-fetch');
const SpotifyWebApi = require('spotify-web-api-node');

const usersController = {};

usersController.setApiToken = (req, res, next) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: 'ed1772750e46412fb4cbc82dc12748f7',
    clientSecret: '8c8a7dc1eb6045febb34290bed411a7a',
  });

  spotifyApi.setAccessToken(req.body.token);

  res.locals.spotify = spotifyApi;
  next();
}

usersController.getUserInfoFromSpotify = (req, res, next) => {

  const { spotify } = res.locals;

  spotify.getMe()
  .then(data => {
    res.locals.user = data.body;
    next();
  })
  .catch(err => {
    res.status(400).send(err)
  });

};


usersController.createUser = (req, res, next) => {

// Create new user
//

};


module.exports = usersController;
