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
      <form onSubmit={this.submitHandler}>
      <h1> Hi there!!! </h1>
      <p> Please enter the suburt, post code for the state you wish to find</p>
      <p> Suburb </p>
      <input type="text" name='suburb'/>
      <p> Post code </p>
      <input type="text" name='postcode'  />
      <p> State </p>
      <input type="text" name='cState'/>
      <div> 
        <input type="submit" value="Validate address " />
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