// src/components/UserProfile.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Styles.css'

class UserProfile extends Component {
  render() {
    return (
      <div className="page">
        <h1>User Profile</h1>
        <div>Username: {this.props.userName}</div>
        <br />
        <div>Member Since: {this.props.memberSince}</div>
        <br />
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default UserProfile;