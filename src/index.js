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
    let endpoint = `http://localhost:9999/api?q=${suburb}&state=${cState}`;
    
    fetch(endpoint).then(data => {
      data.json().then(resolved => {
        console.log(resolved.localities);
        console.log(resolved.localities.locality);
        console.log(resolved);
      });
     })
  }
  render() {
    return (
      <form className="form" onSubmit={this.submitHandler}>
      <h1> Hi there!!! </h1>
      <p> Please fill in the form below...</p>
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
      <div> 
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