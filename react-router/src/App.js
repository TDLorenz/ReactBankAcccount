import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home'; 
import UserProfile from './components/UserProfile';
import LogIn from './components/Login'; 
import Debits from './components/Debits'
import axios from 'axios'

class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 0, 
      debitsData: [],  
      foundDebits: false, 
      currentUser: {
        userName: 'joe_shmo',
        memberSince: '07/23/96',
      }
    }
  }
  componentDidMount = async () => {
      let linkToAPI = 'https://moj-api.herokuapp.com/debits'; 
      try {
          let response = await axios.get(linkToAPI);
          let debitTotal = response.data.reduce((accum, item) => accum + item.amount, 0)
          this.setState({ debitsData: response.data.reverse(), foundDebits: true, accountBalance: this.state.accountBalance + debitTotal});
      } catch (error) {
          if (error.response) {
              /*
                * The request was made and the server responded with a
                * status code that falls out of the range of 2xx
                */
              console.log(error.response.data); //Not Found
              console.log(error.response.status); //404
              this.setState({ foundDebits: false });
          }
      }
  }

  handleDebitsUpdate = (updateDebits) => {
    const data = this.state.debitsData
    data.push(updateDebits)
    console.log(typeof(updateDebits.amount))
    this.setState({debitsData: data, accountBalance: this.state.accountBalance + parseInt(updateDebits.amount)})
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }
  render() {

    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
      <UserProfile 
      userName={this.state.currentUser.userName} 
      memberSince={this.state.currentUser.memberSince}  
      />
    );
    const LogInComponent = () => (
      <LogIn 
        user={this.state.currentUser} 
        mockLogIn={this.mockLogIn} 
      />
    )
    const DebitComponent = () => (
      <Debits 
        user={this.state.currentUser} 
        accountBalance={this.state.accountBalance} 
        apiData={this.state.debitsData} 
        found={this.state.foundDebits} 
        handleUpdate={this.handleDebitsUpdate}
      />
    ); 
    return (
        <Router>
          <div>
              <Route exact path="/" render={HomeComponent}/>
              <Route exact path="/userProfile" render={UserProfileComponent}/>
              <Route exact path="/login" render={LogInComponent}/>
              <Route exact path="/debits" render={DebitComponent}/>
          </div>
        </Router>
    );
  }
}
export default App;