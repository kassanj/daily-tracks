import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { authEndpoint, clientId, redirectUri, scopes } from "../utils/config";
import hash from "../utils/hash";
import TrackList from "./TrackList";
const axios = require('axios');
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



const mapStateToProps = store => ({
   displayName: store.user.displayName,
   token: store.user.token,
   tracks: store.trackList.tracks,
   favorites: store.user.favorites
});

const mapDispatchToProps = dispatch => ({
  setNewToken: (newToken) => {
    dispatch(actions.setNewToken(newToken))
  },
  setTrackList: (tracks) => {
    dispatch(actions.setTrackList(tracks))
  },
  setCurrentUserInfo: (userInfo) => {
    dispatch(actions.setUserInfo(userInfo))
  },
});


class MainContainer extends Component {

  constructor(props) {
    super(props);

    this.getAllTracks = this.getAllTracks.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.getFavorites = this.getFavorites.bind(this);

  }

  componentDidMount() {
    const access_token = hash.access_token;
    if (access_token) {
      this.props.setNewToken(access_token);
      this.setUserInfo(access_token);
      this.getAllTracks(access_token);
    }
  }

  getAllTracks(access_token) {
    axios.post('/api/tracks', {
      token: access_token
    })
    .then(response => {
      const tracks = response.data;
      // console.log(tracks);
      this.props.setTrackList(tracks);
    }).catch(error => {
      console.log(error, '- getAllTracks');
    })
  }

  setUserInfo(access_token) {
    axios.post('/api/user', {
      token: access_token
    })
    .then(response => {
      const user = response.data;
      this.props.setCurrentUserInfo(user);
    }).catch(error => {
      console.log(error, '- setUserInfo');
    })
  }

  getFavorites() {
    axios.post('/api/favorites', {
      // name: this.props.displayName;
    })
    .then(response => {
      const favorites = response.data;
      // this.props.setUserFavorites(favorites);
    }).catch(error => {
      console.log(error, '- setUserFavorites');
    })
  }


  render() {

    const {token, tracks, favorites, displayName} = this.props

    return (
      <div id="track-feed">
        {!token && (
        <div className="logged-out-container">
          <div className="logo">Daily /\ Tracks</div>
          <div className="spotify-link">
            <i class="fab fa-spotify"></i><a
              className="login-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
               Login to Spotify
            </a>
          </div>
         </div>
        )}
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={200} transitionLeaveTimeout={700}>
         {displayName && (
          <TrackList
            tracks={tracks} favorites={favorites}
          />
         )}
         </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
