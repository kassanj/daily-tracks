import React, { Component } from "react";
import { connect } from 'react-redux';
import { authEndpoint, clientId, redirectUri, scopes } from "../utils/config";


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
      <div className="main-container">
       {token && (
         <div className="navigation">
           <h1>Header Links</h1>
           <p>{displayName}</p>
           <img src={profileImg} width="40px"/>
         </div>
       )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Nav)
