import React, { Component } from "react";
import { connect, useSelector } from 'react-redux';
import "./Player.css";
import { authEndpoint, clientId, redirectUri, scopes } from "../utils/config";
import * as actions from '../actions/actions';
const axios = require('axios');
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Player extends Component {

  constructor(props) {
    super(props);

    this.state = {
        duration: 0,
        position: 0,
        deviceId: '',
        isFavorite: false,
    };

    this.addFavorites = this.addFavorites.bind(this);
    this.removeFavorites = this.removeFavorites.bind(this);
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
        name: "Daily Tracks",
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

  onPlayClick(e, status) {
    e.preventDefault();
    this.props.updatePlayStatus(!status);
    this.player.togglePlay();
  }

  addFavorites(e, trackId) {
    e.preventDefault();
    const { token, username, addFavorites } = this.props;
    addFavorites(trackId, token, username);
  }

  removeFavorites(e, trackId) {
    e.preventDefault();
    const { token, username, removeFavorites } = this.props;
    removeFavorites(trackId, token, username);
  }

  handleCheck(trackId) {
    return this.props.favorites.some(item => trackId === item);
  }

  render() {

    const { duration, position, isFavorite } = this.state;
    const { token, artistName, songName, coverArt, isPlaying, trackUri, trackId } = this.props;
    const currFav = this.handleCheck(trackId);

    const progressBarStyles = {
      width: ((position * 1000) * 100 / duration) + '%'
    };

    return (
      <div id="audio-player">
       {token && (
         <div id="audio-navbar">
         <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={100} transitionLeaveTimeout={100}>

           {coverArt && (
             <div id="audio-navbar-inner">
               <div className="progress">
                 <div
                   className="progress__bar"
                   style={progressBarStyles}
                 />
               </div>
                <ul id="player-navigation">
                  <li>
                   <div className="heart-container">
                   <span
                      className="heart-icon fa-lg"
                      style={{
                        display: 'inline-block',
                        width: 10,
                        cursor: 'pointer',
                        color: currFav ? 'red' : 'grey',
                      }}
                      onClick={(e) => currFav ? this.removeFavorites(e, trackId) : this.addFavorites(e, trackId) }
                    >
                    <i className="fas fa-heart"></i>
                  </span>
                  </div>
                  </li>
                  <li className="cover-art-player">
                    <img src={coverArt} width='50px'/>
                  </li>
                  <li id="song-info-container">
                    <div className="song-info song-name">{songName}</div>
                    <div className="song-info artist-name">{artistName}</div>
                  </li>
                  <li id="player-controls">
                    <a href="#" onClick={(e) => this.onPlayClick(e, isPlaying)}>{isPlaying ? <i className="fas fa-pause fa-lg"></i> : <i className="fas fa-play fa-lg"></i>}</a>
                  </li>
                  <li id="social-share" className="social-share">
                    <a href="#">Share on social</a>
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-instagram"></i>
                  </li>
                </ul>
             </div>
           )}
          </ReactCSSTransitionGroup>

         </div>
       )}
      </div>
    );
  }
}


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
  addFavorites: (trackId, token, username) => {
    dispatch(actions.addFavorites(trackId, token, username))
  },
  removeFavorites: (trackId, token, username) => {
    dispatch(actions.removeFavorites(trackId, token, username))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Player)
