import React, { Component } from "react";
import { connect } from 'react-redux';
import { authEndpoint, clientId, redirectUri, scopes } from "../utils/config";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const mapStateToProps = store => ({
   token: store.user.token,
   displayName: store.user.displayName,
   profileImg: store.user.profileImg
});

class Nav extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {displayName, profileImg, token} = this.props

    return (

      <div id="navigation">
      <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={200} transitionLeaveTimeout={700}>
       {profileImg && (
         <div id="navbar">
           <ul className="left page-options">
              <li> > Home </li>
              <li> > Favorites</li>
              <li> > Mixtapes</li>
              <li> > Blog</li>
           </ul>
           <div className="logo"> Daily /\ Tracks </div>
           <ul className="right account-details">
             <li><img src={profileImg} width="20px"/></li>
             <li>{displayName}</li>
           </ul>
         </div>
       )}
       </ReactCSSTransitionGroup>
      </div>

    );
  }
}

export default connect(mapStateToProps)(Nav)
