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
    this.validSateData = [
      {abbrv: "NSW", name: "New South Wales"},
      {abbrv: "WA", name: "Western Australia"},
      {abbrv: "SA", name: "South Australia"},
      {abbrv: "NT", name: "Northen Territory"},
      {abbrv: "VIC", name: "Victoria"},
      {abbrv: "QLD", name: "Queensland"},
      {abbrv: "TAS", name: "Tasmania"},
    ]
  }
  validateObject = (pobox, cState, suburb, apiObj) => {
    //debugger
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
    //debugger
    let validState = this.validSateData.find(vData => 
      vData.abbrv.toLowerCase() == cState.toLowerCase() 
      || vData.name.toLowerCase() == cState.toLowerCase()
    );
    //are we sure, the AustraliPost API will always return the state abbreviation?
    cState = validState.abbrv.toLowerCase();
    let endpoint = `http://localhost:9999/api?q=${suburb}&state=${cState}`;
    fetch(endpoint).then(data => {
      data.json().then(resolved => {
        if(resolved) {
          if(resolved.localities.locality) {
            let localityObjs = resolved.localities.locality;
            //debugger
            if(Array.isArray(localityObjs)) {
              for(let i=0; i < localityObjs.length; i++) {
                //TODO: fix this, the code doesn't handle
                //dealing with an array
                this.validateObject(postcode, cState, suburb, localityObjs[i]);
              }
            } else { //this is probably wrong? we are assuming it's an object
              this.validateObject(postcode, cState, suburb, localityObjs);
            }
          }
        } else {
          alert("Error fetching data");
        }
      }).catch(err => {
        /*this doesn't work? we are not doing proper error checking
        to determine when a network call fails
        */
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