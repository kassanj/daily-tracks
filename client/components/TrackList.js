import React, { Component } from 'react';
import Track from "./Track";

const TrackList = props => {
  const tracks = []

  for (const [index, data] of props.tracks.entries()) {
    tracks.push(<Track key={index} data={data} />)
  }

  return (
    <div>
     {tracks}
    </div>
  );
}

export default TrackList;
