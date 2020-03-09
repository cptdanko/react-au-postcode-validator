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
  validateObject = (pobox, cState, suburb, apiObj) => {
    if(apiObj.location.toLowerCase() === suburb
        && apiObj.postcode === pobox
        && apiObj.state.toLowerCase() === cState) {
        alert(`Great!!! The post code: ${pobox} is correct for ${suburb} and it's in the state: ${cState.toUpperCase()} `);
    } else if(apiObj.location.toLowerCase() === suburb &&
              apiObj.postcode != pobox) {
        alert(`This  ${pobox} is not the postcode for the suburb: ${suburb}`);
    } else if(apiObj.location.toLowerCase() === suburb 
        && apiObj.state.toLowerCase() !== cState) {
        alert(`The suburb (${suburb}) is not part of the state: ${cState}`);
    }
  }
  submitHandler = (event) => {
    event.preventDefault();
    let postcode = event.target.postcode.value;
    let cState = event.target.cState.value.toLowerCase();
    let suburb = event.target.suburb.value.toLowerCase();
    if(suburb.length == 0) {
      alert("No suburb? Please enter a suburb");
      this.suburbRef.current.focus();
      return;
    }
    postcode = Number(postcode);
    if(!postcode) {
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
        if(resolved) {
          if(resolved.localities.locality) {
            let localityObjs = resolved.localities.locality;
            debugger
            if(Array.isArray(localityObjs)) {
              for(let i=0; i < localityObjs.length; i++) {
                this.validateObject(postcode, cState, suburb, localityObjs[i]);
              }
            } else {
              console.log("response is object");
              this.validateObject(postcode, cState, suburb, localityObjs);
            }
          }
        }
      }).catch(err => {
        console.log(err);
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