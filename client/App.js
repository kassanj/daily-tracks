import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import fetch from 'isomorphic-fetch';

function Index() {
  return <div>
          <h2>Plant Feed</h2>
          <p>Filters</p>
         </div>;
}

function Favorites() {
  return <div>
          <h2>Favorites</h2>
          <p>Here is a list of my favorites</p>
         </div>;
}

function Users() {
  return <div>
          <h2>Users</h2>
          <p>List of users and their favorites.</p>
          <p>Current plants they own.</p>
         </div>;
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playlist: [],
      artist: '',
      leaders: null,
    };

  }

  componentDidMount() {
    // uncomment the below for proxy challenge
    fetch('/api/playlists')
      .then(response => response.json())
      .then(leaders => this.setState({ artist: leaders.body.name }));
  }

  render() {
    return (
      <div>
        <div>Leaders:</div>
        <div>{this.state.artist}</div>
      </div>
    );
  }
}

export default App;
