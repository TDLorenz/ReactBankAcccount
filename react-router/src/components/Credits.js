//Credits
import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Credits extends Component {

    constructor(props) {
        super(props);
        this.state = {
            credit: {
                id: 0, 
                description: '',
                amount: 0,
                date: new Date().toISOString()
            },
        }
    }

    makeCredit = (creditsData, found) => {
        let currData = creditsData; 
        let foundMatch = found; 
        let table = [];
        //found is false when we get 404 error
        if (!foundMatch) {
            table.push(<tr key={-1}><td>No Credits</td></tr>);
            return table;
        } else {
            currData.forEach(credit => {
                let id = credit.id
                let description = credit.description; 
                let amount = credit.amount
                let date = credit.date    
                table.push(
                    <tr className="row" key={id}>
                        <td className="text">Description: {description}</td>
                        <td className="text">Amount: {amount}</td>
                        <td className="text">Date: {date}</td>
                    </tr>
                );
            });
        }
        return table;
    }
  handleChange = (e) => {
    const newCredit = {...this.state.credit}
    const inputField = e.target.name
    const inputValue = e.target.value
    newCredit[inputField] = inputValue
    this.setState({credit: newCredit})
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleUpdate(this.state.credit)
  }

  render() {
    let handleUpdate = this.props.handleUpdate; 
    return (
        <div>
          <h3> Credits </h3>  
          User: {this.props.user.userName}
          <AccountBalance accountBalance={this.props.accountBalance}/>
          <Link to="/">Return to Home</Link>
          <br></br>
          <div className="table">
            <table id="data">
                <tbody>
                    {this.makeCredit(this.props.apiData, this.props.found)}
                </tbody>
            </table>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="description">Enter a description</label>
              <input type="text" name="description" onChange={this.handleChange} value={this.state.credit.description} />
            </div>
            <div>
              <label htmlFor="amount">Enter an amount</label>
              <input type="number" name="amount"onChange={this.handleChange} value={this.state.credit.amount}/>
            </div>
            <button>Add Credit</button>
          </form>
        </div>
    );
  }
}

export default Credits;