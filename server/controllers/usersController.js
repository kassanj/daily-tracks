const fetch = require('node-fetch');
const SpotifyWebApi = require('spotify-web-api-node');
const User = require('../models/userModel');

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

usersController.setUserInfoFromDatabase = (req, res, next) => {

    const { display_name } = res.locals.user;

    User.findOneAndUpdate({ username: display_name }, {}, {upsert: true, new: true}, (err, user) => {
      if (err) return res.json({ success: false, error: err });
      res.locals.favorites = user.favorites;
      next();
    })
};

usersController.addFavoriteToSpotify = (req, res, next) => {

  const { spotify } = res.locals;

  spotify.addToMySavedTracks([req.body.trackId])
  .then(data => {
    console.log('Added track!');
    next();
  })
  .catch(err => {
    res.status(400).send(err)
  });
};

usersController.removeFavoriteFromSpotify = (req, res, next) => {

  const { spotify } = res.locals;

  spotify.removeFromMySavedTracks([req.body.trackId])
  .then(data => {
    console.log('Removed track!');
    next();
  })
  .catch(err => {
    res.status(400).send(err)
  });
};

usersController.addFavToDatabase = (req, res, next) => {

  const { username, trackId } = req.body;

  User.findOne({ username: username }, function (err, user) {
    if (err) return res.json({ success: false, error: err });
    else if (user) {
      // Find the delete uid in the favorites array
      const uid = user.favorites ? user.favorites.indexOf(trackId) : -1;

      if (uid === -1) {
        // Remove it from the array.
        user.favorites.push(trackId);
        // Save the user object
        user.save(error => {
          if (error) return res.json({ success: false, error: error });
          else {
            res.locals.favorites = user.favorites;
            next();
          }
        });
        return;
      }
    }
    res.status(404).send('Not Found - Already Added'); // fix error handling
  })
};

usersController.removeFavFromDatabase = (req, res, next) => {

  const { username, trackId } = req.body;

  User.findOne({ username: username }, function (err, user) {
    if (err) return res.json({ success: false, error: err });
    else if (user) {
      // Find the delete uid in the favorites array
      const uid = user.favorites ? user.favorites.indexOf(trackId) : -1;

      if (uid !== -1) {
        // Remove it from the array.
        user.favorites.splice(uid, 1);
        // Save the user object
        user.save(error => {
          if (error) return res.json({ success: false, error: error })
          else {
            res.locals.favorites = user.favorites;
            next();
          }
        });
        return;
      }
    }
    // Send 404 not found
    res.status(404).send('Not Found - Nothing to Remove'); // fix error handling
  });
};


module.exports = usersController;
