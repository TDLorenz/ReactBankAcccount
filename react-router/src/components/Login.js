import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import "./Styles.css"

class LogIn extends Component {
  constructor() {
    super()
    this.state = {
      user: {
        userName: '',
        password: ''
      },
      redirect: false
    }
  }

  handleChange = (e) => {
    const updatedUser = { ...this.state.user }
    const inputField = e.target.name
    const inputValue = e.target.value
    updatedUser[inputField] = inputValue

    this.setState({ user: updatedUser })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.mockLogIn(this.state.user)
    this.setState({ redirect: true })
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/userProfile" />)
    }

    return (
      <div className="page">
        <br />
        <br />
        <h1>User Profile</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="userName">User Name</label>
            &ensp;
            <input type="text" name="userName" onChange={this.handleChange} value={this.state.user.userName} />
          </div>
          <br />
          <div>
            <label htmlFor="password">Password</label>
            &ensp;
            <input type="password" name="password" />
          </div>
          <br />
          <button>Log In</button>
        </form>
        <br />
        <Link to="/">Return to Home</Link>
      </div>
    )
  }
}

export default LogIn