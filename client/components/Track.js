import  React, { Component } from "react";
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
  updateFavorites: (favs) => {
    dispatch(actions.updateFavorites(favs))
  },
});


class Track extends Component {

  constructor(props) {
    super(props);

    this.saveToFavorites = this.saveToFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
    this.listenToTrack = this.listenToTrack.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
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

  listenToTrack(e, track) {
    e.preventDefault();
    this.props.setCurrentTrack(track);
  }

  handleCheck(track) {
    return this.props.favorites.some(item => track.id === item);
  }

  render() {

    const { track, added_at, favorites } = this.props.data;
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
             onClick={(e) => currFav ? this.removeFromFavorites(e, track.id) : this.saveToFavorites(e, track.id) }
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
