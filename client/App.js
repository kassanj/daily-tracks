import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./Player";
import TrackList from "./TrackList";
const axios = require('axios');

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: null,
      tracks: [],
    };

    this.getAllTracks = this.getAllTracks.bind(this);
  }

  componentDidMount() {
    let access_token = hash.access_token;
    if (access_token) {
      this.setState({
        token: access_token
      });
      this.getAllTracks(access_token);
    }
  }

  getAllTracks(access_token) {
    axios.post('/api/tracks', {
      token: access_token
    })
    .then(response => {
      const tracks = response.data;
      this.setState({
        tracks: tracks
      })
    }).catch(error => {
      console.log(error, '- getAllTracks');
    })
  }

  render() {
    return (
      <div>
        {!this.state.token && (
        <a
          className="btn btn--loginApp-link"
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
          )}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
        </a>
        )}
       {this.state.token && (
         <div>
           <TrackList
              tracks={this.state.tracks}
            />
          </div>
       )}
      </div>
    );
  }
}

export default App;
