# Daily Tracks

Sometimes discovering music on Spotify can feel overwhelming. Daily Tracks works to appease that overload of information by introducing one track to a curious music consumer, daily. This will allow for a more organic music discovery experience. 

Daily Tracks was built in React/Node. It uses the Spotify API to render tracks and artists. A user can like and unlike a track, which then gets saved into their Spotify Premium account. A user can also play and pause those tracks.

### Getting Started

These instructions will get you a copy of the project up and running on your local machine. After you clone this repo, you must run the command below to update your node dependencies.

`npm install`

To run the application, run the following in your command line.

`npm run dev`



### Credentials

To personalize and use this app, there are a couple of authorization keys that are needed.
Create a new file `.env` and fill out the following alias with your generated keys.

```
CLIENT_SECRET=
DB_USERNAME=
DB_PASSWORD=
PLAYLIST_ID=
```

To generate a `CLIENT_SECRET` key, you must go to Spotify and register an application. 
For `DB_USERNAME` and `DB_PASSWORD`, register at MongoDB and build a new database. 
And finally, `PLAYLIST_ID` comes from the playlist you plan to save a new track to everyday. 


### Built With

- React
- Redux
- Node/Express
- OAuth2
- MongoDB

### Authors

Kassandra Meyer - Initial work

### License

This project is licensed under the MIT License.
