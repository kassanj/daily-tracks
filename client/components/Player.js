import React, { Component } from "react";
import { connect } from 'react-redux';
import "./Player.css";
import { authEndpoint, clientId, redirectUri, scopes } from "../utils/config";

const mapStateToProps = store => ({
   token: store.user.token,
   artistName: store.trackList.currentArtist,
   songName: store.trackList.currentSong,
   coverArt: store.trackList.currentCoverArt,
   trackUri: store.trackList.currentTrackUri,
});

class Player extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: "",
      playing: false,
      position: 0,
      duration: 1,
    };

    // this.playerCheckInterval = null;
  }

  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      window.Spotify = Spotify;
      this.checkForPlayer();
      // this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.trackUri) {
      this.changeCurrentlyPlaying(this.props.trackUri);
    }
  }

  createEventHandlers() {

    this.player.on('initialization_error', e => { console.error(e, ' Init Error'); });

    this.player.on('authentication_error', e => {
      this.setState({ loggedIn: false });
    });

    this.player.on('account_error', e => { console.error(e, ' Account Error'); });
    this.player.on('playback_error', e => { console.error(e, ' Playback Error'); });

    // Playback status updates
    this.player.on('player_state_changed', state => console.log(state) );

    // Ready
    this.player.on('ready', ({ device_id }) => {
      console.log("Let the music play on!");
      this.setState({ deviceId: device_id });
      this.transferPlaybackHere();
    });

    // Not Ready
    this.player.on('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });
  }

  checkForPlayer() {
    const { token } = this.props;

    if (window.Spotify !== null && token) {

      clearInterval(this.playerCheckInterval);

      this.player = new window.Spotify.Player({
        name: "Solo Project Player",
        getOAuthToken: cb => { cb(token); },
      });
      // Set up the player's event handlers
      this.createEventHandlers();
      // Connect!
      this.player.connect();
    }
  }

  transferPlaybackHere() {
    const { token } = this.props;
    const { deviceId } = this.state;

    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "device_ids": [ deviceId ],
        "play": false
      }),
    })
  }

  changeCurrentlyPlaying(trackUri) {

    const { token } = this.props;
    const { deviceId } = this.state;

    fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "device_ids": [ deviceId ],
        "uris": [ trackUri]
      }),
    })
    .then(response => {
      console.log(response);
    });
  }

  onPlayClick() {
    this.player.togglePlay();
  }

  render() {

    const {token, artistName, songName, coverArt} = this.props
    const {playing} = this.state

    return (
      <div className="audio-player">
       {token && (
         <div className="navigation">
           <h1>Audio Player</h1>
           {coverArt && (
             <img src={coverArt} width='300px' height='300px'/>
           )}
           <p>{artistName}</p>
           <p>{songName}</p>
           <button onClick={() => this.onPlayClick()}>{playing ? "Pause" : "Play"}</button>
         </div>
       )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Player)
