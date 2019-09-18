import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./Player";
import TrackList from "./TrackList";
const axios = require('axios');
import { connect } from 'react-redux';
import * as actions from './actions/actions';


const mapStateToProps = store => ({
   token: store.user.token,
   tracks: store.trackList.tracks
});

const mapDispatchToProps = dispatch => ({
  setNewToken: (newToken) => {
    dispatch(actions.setNewToken(newToken))
  },
  setTrackList: (tracks) => {
    dispatch(actions.setTrackList(tracks))
  }
});

class App extends Component {

  constructor(props) {
    super(props);

    this.getAllTracks = this.getAllTracks.bind(this);
  }

  componentDidMount() {
    let access_token = hash.access_token;
    if (access_token) {
      this.props.setNewToken(access_token);
      this.getAllTracks(access_token);
    }
  }

  getAllTracks(access_token) {
    axios.post('/api/tracks', {
      token: access_token
    })
    .then(response => {
      const tracks = response.data;
      this.props.setTrackList(tracks);
    }).catch(error => {
      console.log(error, '- getAllTracks');
    })
  }

  render() {

    const {token, tracks} = this.props

    return (
      <div>
        {!token && (
        <a
          className="btn btn--loginApp-link"
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
          )}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
        </a>
        )}
       {token && (
         <div>
           <TrackList
              tracks={tracks}
            />
          </div>
       )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
