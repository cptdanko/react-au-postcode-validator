import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class AddressForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      postcode: 0,
      suburb: '',
      state: ''
    };
  }
  submitHandler = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    let postcode = event.target.postcode.value;
    let cState = event.target.cState.value;
    let suburb = event.target.suburb.value;
    console.log(suburb);
    console.log(cState);
    console.log(postcode);
    console.log(event);
    //make an API call and do some validation 
    //based on responses
  }
  render() {
    return (
      <form className="form" onSubmit={this.submitHandler}>
      <h1> Hi there!!! </h1>
      <p> Please enter the suburb, post code for the state you want to find</p>
      <div className="data">
         <p> Suburb </p>
        <input type="text" name='suburb'/>
      </div>
      <div className="data">
        <p> Post code </p>
        <input type="text" name='postcode'  />
      </div>
      <div className="data">
        <p> State </p>
        <input type="text" name='cState'/>
      </div>
      <div className="center"> 
        <input className="submit" type="submit" value="VALIDATE ADDRESS" />
      </div>
      </form>
    );
  }
}


// ========================================
ReactDOM.render(
  <AddressForm />,
  document.getElementById('root')
);