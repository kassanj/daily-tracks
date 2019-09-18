import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions/actions';


const mapStateToProps = store => ({
   token: store.user.token,
});

const mapDispatchToProps = dispatch => ({
  setCurrentTrack: (track) => {
    dispatch(actions.setCurrentTrack(track))
  },
});


class Track extends Component {

  constructor(props) {
    super(props);

    this.saveToFavorites = this.saveToFavorites.bind(this);
    this.listenToTrack = this.listenToTrack.bind(this);
  }

  saveToFavorites(e, track) {
    e.preventDefault();
    console.log(this.props.token)
    console.log(trackId, 'clicked')
    // this.props.setCurrentTrack(track);
  }

  listenToTrack(e, track) {
    e.preventDefault();
    this.props.setCurrentTrack(track);
  }

  render() {

    const { track, added_at } = this.props.data;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(added_at).toLocaleDateString('en-US', options);

    return (
      <div className="track-container">
       <img src={track.album.images[0].url} width='300px' height='300px'/>
       <p>{formattedDate}</p>
       <p>{track.name}</p>
       <p>{track.id}</p>
       <a href="#" onClick={(e) => {this.saveToFavorites(e, track.id)}}>Save</a>
       <a href="#" onClick={(e) => {this.listenToTrack(e, track)}}>Play track</a>
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Track)
