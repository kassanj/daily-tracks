import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MainContainer from "./MainContainer";
import Nav from "./Nav";
import Player from "./Player";


class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (

      <div className="container">
        <Nav />
        <MainContainer />
        <Player />
      </div>
    );
  }
}

export default App;
