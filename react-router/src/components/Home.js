// src/components/Home.js
import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <img src="https://letstalkpayments.com/wp-content/uploads/2016/04/Bank.png" alt="bank" />
        <h1>Bank of React</h1>
        <AccountBalance accountBalance={this.props.accountBalance} />
        <Link to="/UserProfile">User Profile</Link>
        <br />
        <Link to="/Debits">Debits</Link>
        <br />
        <Link to="/Credits">Credits</Link>
        <br />
        <Link to="/Login">Login</Link>
      </div>
    );
  }
}
export default Home;