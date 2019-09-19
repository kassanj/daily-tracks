import React, { Component } from "react";
import { connect } from 'react-redux';
import "./Player.css";
import { authEndpoint, clientId, redirectUri, scopes } from "../utils/config";
import * as actions from '../actions/actions';
const axios = require('axios');


const mapStateToProps = store => ({
   token: store.user.token,
   username: store.user.displayName,
   trackId: store.trackList.currentTrackId,
   artistName: store.trackList.currentArtist,
   songName: store.trackList.currentSong,
   coverArt: store.trackList.currentCoverArt,
   trackUri: store.trackList.currentTrackUri,
   isPlaying: store.trackList.isPlaying,
   favorites: store.user.favorites,
});


const mapDispatchToProps = dispatch => ({
  updatePlayStatus: (status) => {
    dispatch(actions.updatePlayStatus(status))
  },
  updateFavorites: (favs) => {
    dispatch(actions.updateFavorites(favs))
  },
});


class Player extends Component {

  constructor(props) {
    super(props);

    this.state = {
        duration: 0,
        position: 0,
        deviceId: '',
    };

    this.saveToFavorites = this.saveToFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
    this.handleCheck = this.handleCheck.bind(this)
  }

  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      window.Spotify = Spotify;
      this.checkForPlayer();
      this.setState({
        position: setInterval(() => {
          if (this.props.isPlaying) {
            this.myInterval = this.setState({ position: this.state.position += 1 })
          }
        }, 1000)
      })
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.trackUri !== this.props.trackUri) {
      this.changeCurrentlyPlaying(this.props.trackUri);
      this.setState({ position: 0 });
    }
  }


  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  createEventHandlers() {
    this.player.on('initialization_error', e => { console.error(e, ' Init Error'); });
    this.player.on('authentication_error', e => { console.error(e, ' Auth Error'); });
    this.player.on('account_error', e => { console.error(e, ' Account Error'); });
    this.player.on('playback_error', e => { console.error(e, ' Playback Error'); });

    // Playback status updates
    this.player.on('player_state_changed', ({ duration, paused }) => {
      if (!paused !== this.props.isPlaying ) {
        this.props.updatePlayStatus(!paused);
      }
      if (!paused) {
        this.setState({ duration: duration });
      }

    });

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
        "uris": [ trackUri ]
      }),
    })
  }

  onPlayClick(status) {
    this.props.updatePlayStatus(!status);
    this.player.togglePlay();
  }

  saveToFavorites(e, track) {
    e.preventDefault();

    axios.post('/api/favs/add', {
      token: this.props.token,
      trackId: track,
      username: this.props.username,
    })
    .then(response => {
      const favs = response.data;
      console.log(favs, " ADDED + UPDATED");
      this.props.updateFavorites(favs);
    }).catch(error => {
      console.log(error, '- saveToFavorites');
    })
  }

  removeFromFavorites(e, track) {
    e.preventDefault();

    axios.post('/api/favs/remove', {
      token: this.props.token,
      trackId: track,
      username: this.props.username,
    })
    .then(response => {
      const favs = response.data;
      console.log(favs, " REMOVED + UPDATED");
      this.props.updateFavorites(favs);
    }).catch(error => {
      console.log(error, '- removeFromFavorites');
    })
  }

  handleCheck(track) {
    return this.props.favorites.some(item => track === item);
  }

  render() {

    const { duration, position } = this.state;
    const { token, artistName, songName, coverArt, isPlaying, trackUri, trackId } = this.props;
    const currFav = this.handleCheck(trackId);

    const progressBarStyles = {
      width: ((position * 1000) * 100 / duration) + '%'
    };

    return (
      <div className="audio-player">
       {token && (
         <div className="navigation">
           <h1>Audio Player</h1>
           {coverArt && (
             <div>
                <img src={coverArt} width='300px' height='300px'/>
                <p>{artistName}</p>
                <p>{songName}</p>
                <p>{trackUri}</p>
                <p>{duration}</p>
                <p>{position}</p>
                <p>{(position * 1000) * 100 / duration }</p>
                <div className="progress">
                 <div
                   className="progress__bar"
                   style={progressBarStyles}
                 />
               </div>
                <button onClick={() => this.onPlayClick(isPlaying)}>{isPlaying ? "Pause" : "Play"}</button>
                <span
                   style={{
                     display: 'inline-block',
                     width: 10,
                     cursor: 'pointer',
                     color: currFav ? 'red' : 'grey',
                   }}
                   onClick={(e) => currFav ? this.removeFromFavorites(e, trackId) : this.saveToFavorites(e, trackId) }
                 >
                 <i className="fas fa-heart"></i>
               </span>
             </div>
           )}
         </div>
       )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
