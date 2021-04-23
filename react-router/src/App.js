import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debit from './components/Debits';
import axios from "axios";
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      accountBalance: -14568.27,
      currentUser: {
        userName: 'joe_shmo',
        memberSince: '07/23/96',
      },
      debits: [],
      credits: []
    }
    this.addDebit = this.addDebit.bind(this)
    this.addCredit = this.addCredit.bind(this)
  }

  async componentDidMount(){
    let debits = await axios.get("https://moj-api.herokuapp.com/debits")
    let credits = await axios.get("https://moj-api.herokuapp.com/credits")
  

  debits = debits.data
  credits = credits.data

  let debitSum = 0, creditSum = 0;
  debits.forEach((debit) => {
    debitSum += debit.amount
  })
  credits.forEach((credit) => {
    creditSum += credit.amount
  })

  const accountBalance = creditSum - debitSum;
  this.setState({debits, credits, accountBalance});
  }





  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  render() {

    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)

    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
          </div>
        </Router>
    );
  }

}

export default App;