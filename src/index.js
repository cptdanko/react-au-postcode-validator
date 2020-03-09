import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class AddressForm extends React.Component {
  API_CHECK_RESULT_ENUM = {
    ALL_MATCHES: "1",
    POBOX_SUBURB_MISMATCH: "2",
    SUBURB_STATE_MISMATCH:"3"
  };
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
    //NT is not a state, yes but going to leave it here in either case
    this.validSateData = [
      {abbrv: "NSW", name: "New South Wales"},
      {abbrv: "WA", name: "Western Australia"},
      {abbrv: "SA", name: "South Australia"},
      {abbrv: "NT", name: "Northen Territory"},
      {abbrv: "VIC", name: "Victoria"},
      {abbrv: "QLD", name: "Queensland"},
      {abbrv: "TAS", name: "Tasmania"},
    ];
  }
  validateObject = (pobox, cState, suburb, apiObj) => {
    //debugger
    if(apiObj.location.toLowerCase() === suburb
        && apiObj.postcode === pobox
        && apiObj.state.toLowerCase() === cState) {
        //alert(`Great!!! The post code: ${pobox} is correct for ${suburb} and it's in the state: ${cState.toUpperCase()} `);
        return this.API_CHECK_RESULT_ENUM.ALL_MATCHES;
    } else if(apiObj.state.toLowerCase() === cState
            && apiObj.location.toLowerCase() === suburb) {
        return this.API_CHECK_RESULT_ENUM.POBOX_SUBURB_MISMATCH;
    } else if(apiObj.location.toLowerCase() === suburb 
           && apiObj.postcode === pobox) {
        return this.API_CHECK_RESULT_ENUM.SUBURB_STATE_MISMATCH;
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
    let validState = this.validSateData.find(vData => 
      vData.abbrv.toLowerCase() == cState.toLowerCase() 
      || vData.name.toLowerCase() == cState.toLowerCase()
    );
    if(!validState) {
      let stateArr = this.validSateData.map(data => `${data.abbrv} or ${data.name}`);
      alert(`The state you entered is invalid. Try entering \n ${stateArr.join("\n")}`);
      this.stateRef.current.focus();
      return;
    }
    //are we sure, the AustraliPost API will always return the state abbreviation?
    cState = validState.abbrv.toLowerCase();
    let endpoint = `http://localhost:9999/api?q=${suburb}&state=${cState}`;
    //this entire solution is bad and borders on unreadable
    //could be improved with time
    //debugger
    fetch(endpoint).then(data => {
      data.json().then(resolved => {
        if(resolved) {
          if(resolved.localities.locality) {
            let localityObjs = resolved.localities.locality;
            //debugger
            let resultCheck = this.API_CHECK_RESULT_ENUM.ALL_MATCHES;
            if(Array.isArray(localityObjs)) {
              //debugger
              for(let i=0; i < localityObjs.length; i++) {
                if(this.validateObject(postcode, cState, suburb, localityObjs[i])) {
                  resultCheck = this.validateObject(postcode, cState, suburb, localityObjs[i]);
                  if(resultCheck === this.API_CHECK_RESULT_ENUM.ALL_MATCHES) {
                    //a really really bad way to break out of a loop
                    //written here due to lack of time
                    //and unfamalarity with AU_POST API
                    //may as well write 'goto' statements
                    i = localityObjs.length - 1;
                  }
                }
              }
            } else { //this is wrong? we are assuming it's an object
                resultCheck = this.validateObject(postcode, cState, suburb, localityObjs);
            }
            switch(resultCheck) {
              case this.API_CHECK_RESULT_ENUM.ALL_MATCHES:
                alert(`Great!!! The post code: ${postcode} is correct for ${suburb} and it's in the state: ${cState.toUpperCase()} `);
                break;
              case this.API_CHECK_RESULT_ENUM.SUBURB_STATE_MISMATCH:
                alert(`The suburb (${suburb}) is not part of the state: ${cState}`);
                break;
              case this.API_CHECK_RESULT_ENUM.POBOX_SUBURB_MISMATCH: 
                alert(`${postcode} is not the postcode for  suburb: ${suburb}`);
                break;
              default:
                alert("Something went wrong, try again later");
            }
          } else {
            this.suburbRef.current.focus();
            alert(`Search for '${suburb}' returned no results? Are you sure you entered the right suburb?`);
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