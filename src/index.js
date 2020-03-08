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
    this.postCodeRef = React.createRef();
    this.suburbRef = React.createRef();
    this.stateRef = React.createRef();
  }
  submitHandler = (event) => {
    event.preventDefault();
    let postcode = event.target.postcode.value;
    let cState = event.target.cState.value;
    let suburb = event.target.suburb.value;
    if(suburb.length == 0) {
      alert("No suburb? Please enter a suburb");
      this.suburbRef.current.focus();
      return;
    }
    if(!Number(postcode)) {
      alert("Invalid postcode");
      this.postCodeRef.current.focus();
      return;
    }
    if(cState.length == 0) {
      alert("No Sate? You must enter a state");
      this.stateRef.current.focus();
      return;
    }
    //make an API call and do some validation 
    //based on responses
    //TODO: - incomplete
    const API_KEY = "872608e3-4530-4c6a-a369-052accb03ca8";
    const BASE_PO_URL="https://digitalapi.auspost.com.au/postcode/";
    let targetUrl = BASE_PO_URL + `search?q=${suburb}&state=${cState}`;
      
    fetch(targetUrl, { 
      method: 'post', 
      headers: new Headers({
       'AUTH-KEY': API_KEY,
     }), 
    });
  }
  render() {
    return (
      <form className="form" onSubmit={this.submitHandler}>
      <h1> Hi there!!! </h1>
      <p> Please enter the suburb, post code for the state you want to find</p>
      <div className="data">
         <p> Suburb </p>
        <input type="text" 
        name='suburb'
        ref={this.suburbRef}  />
      </div>
      <div className="data">
        <p> Post code </p>
        <input type="text" 
        name='postcode'
        ref={this.postCodeRef}  />
      </div>
      <div className="data">
        <p> State </p>
        <input type="text" 
        name='cState'
        ref={this.stateRef}  />
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