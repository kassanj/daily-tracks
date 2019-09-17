import React, { Component } from "react";

class Track extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, trackId) {
    e.preventDefault();
    console.log(this.state.token)
    console.log(trackId, 'clicked')
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

       <a href="#" onClick={(e) => {this.handleClick(e, track.id)}}>Save</a>
      </div>
    )
  }

}

export default Track;
