// src/components/Home.js
import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import { Link } from 'react-router-dom';
import "./Styles.css"

class Home extends Component {
  render() {
    return (
      <div className="page">
        <img src="https://letstalkpayments.com/wp-content/uploads/2016/04/Bank.png" alt="bank" />
        <h1>Bank of React</h1>
        <AccountBalance accountBalance={this.props.accountBalance} />
        <br />
        <Link className="link" to="/UserProfile">User Profile</Link>
        <br />
        <br />
        <Link className="link" to="/Debits">Debits</Link>
        <br />
        <br />
        <Link className="link" to="/Credits">Credits</Link>
        <br />
        <br />
        <Link className="link" to="/Login">Login</Link>
      </div>
    );
  }
}
export default Home;