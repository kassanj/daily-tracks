import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
const axios = require('axios');


const mapStateToProps = store => ({
   token: store.user.token,
   username: store.user.displayName,
   favorites: store.user.favorites,
});

const mapDispatchToProps = dispatch => ({
  setCurrentTrack: (track) => {
    dispatch(actions.setCurrentTrack(track))
  },
  addFavorites: (trackId, token, username) => {
    dispatch(actions.addFavorites(trackId, token, username))
  },
  removeFavorites: (trackId, token, username) => {
    dispatch(actions.removeFavorites(trackId, token, username))
  },
});


class Track extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isFavorite: false
    }

    this.addFavorites = this.addFavorites.bind(this);
    this.removeFavorites = this.removeFavorites.bind(this);
    this.listenToTrack = this.listenToTrack.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  addFavorites(e, track) {
    e.preventDefault();
    const { token, username, addFavorites } = this.props;
    addFavorites(track, token, username);
  }

  removeFavorites(e, track) {
    e.preventDefault();
    const { token, username, removeFavorites } = this.props;
    removeFavorites(track, token, username);
  }

  listenToTrack(e, track) {
    e.preventDefault();
    this.props.setCurrentTrack(track);
  }

  handleCheck(track) {
    return this.props.favorites.some(item => track.id === item);
  };

  render() {

    const { track, added_at, favorites } = this.props.data;
    const { isFavorite } = this.state;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(added_at).toLocaleDateString('en-US', options);
    const currFav = this.handleCheck(track);

    return (
      <div className="track-container">
       <img src={track.album.images[0].url} width='400px'/>
       <div className="track-info">
         <p className="track-date">{formattedDate}</p>
         <div className="track-info-inner">
           <p className="track-name">{track.name}</p>
           <p className="artist-name">{track.artists[0].name}</p>
         </div>

          <div className='play-button'>
          <span
             className="heart-icon"
             style={{
               display: 'inline-block',
               width: 10,
               cursor: 'pointer',
               color: currFav ? 'red' : 'grey',
             }}
             onClick={(e) => currFav ? this.removeFavorites(e, track.id) : this.addFavorites(e, track.id) }
           >
           <i className="fas fa-heart"></i>
           </span>
            <a href="#" onClick={(e) => {this.listenToTrack(e, track)}}>Play song</a>
          </div>
        </div>
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Track)
