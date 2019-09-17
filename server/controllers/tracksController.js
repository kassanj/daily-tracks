const fetch = require('node-fetch');
const SpotifyWebApi = require('spotify-web-api-node');

const tracksController = {};

tracksController.setApiToken = (req, res, next) => {

  const spotifyApi = new SpotifyWebApi({
    clientId: 'ed1772750e46412fb4cbc82dc12748f7',
    clientSecret: '8c8a7dc1eb6045febb34290bed411a7a',
  });

  spotifyApi.setAccessToken(req.body.token);

  res.locals.spotify = spotifyApi;
  next();
}

tracksController.getTracks = (req, res, next) => {

  const { spotify } = res.locals;

  spotify.getPlaylistTracks('1Mw7lF4WaEWWgAgziZXKSF')
  .then(data => {
    res.locals.tracks = data.body.items.sort((a,b) => {
      return new Date(b.added_at) - new Date(a.added_at);
    })
    next();
  })
  .catch(err => {
    res.status(400).send(err)
  });

};


module.exports = tracksController;
