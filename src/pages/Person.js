import React,{useState, useEffect} from 'react';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NumericInput from 'material-ui-numeric-input';
import '../css/outward.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as initialData from '../initialData';
import { red } from '@material-ui/core/colors';

function Person() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [JobTitle, setJobTitle] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Organization, setOrganization] = useState("");
  const [CurrentLocation, setCurrentLocation] = useState("");
  const [Address, setAddress] = useState("");
  const [AllOrganizations, setAllOrganizations] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/getOrganizations',{
    }).then(res=>res.json())
    .then(result=>{
      var x = []
        for(var i in result.orgs){
            x.push({"label": result.orgs[i].name})
        }
        setAllOrganizations(x)
        console.log(x)
    })
  },[])
  const jobtitleProps = {
    options: initialData.jobs,
    getOptionLabel: (option) => option.value,
  };
  const clearState = () => {
    setAddress("");
    setCurrentLocation("");
    setEmail("");
    setFirstName("");
    setJobTitle("");
    setLastName("");
    setOrganization("");
    setPhone("");
  }

  const validateAndSave = () => {
    fetch('http://localhost:5000/addPerson', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({FirstName, LastName, JobTitle, Phone, Email, Organization, CurrentLocation, Address})
    })
    .then(() => {
      alert("Person Successfully Added");
      clearState();
    })
    .catch(() => alert("There was a error, Please try again"))
  };
  
  return (
    <div className = "outward">
      <form className = 'formStyle'>
          <h6> Add Person</h6>
          <hr/>
          <div className = "rowStyle">
            <TextField 
              label="Full Name"
              margin="dense"
              variant="outlined"
              onChange={(event) => setFirstName(event.target.value)}
              value={FirstName}
            />
            <TextField 
              label="Last Name"
              margin="dense"
              variant="outlined"
              onChange={(event) => setLastName(event.target.value)}
              value={LastName}
            />
          </div>

          <div >
            <Autocomplete className = "rowStyle"
              {...jobtitleProps}
              id="auto-complete"
              name = "JobTitle"
              autoComplete
              includeInputInList
              onChange={(event, value) => setJobTitle(value.value)}
              renderInput={(params) => <TextField {...params} label="Job Title" margin ="normal" />}
            />
            
          </div>
     
          <div className = "rowStyle">
          <TextField style = {{paddingRight:"2px"}}
              label="Phone Number"
              margin="dense"
              variant="outlined"
              type = 'number'
              onChange={(event) => setPhone(event.target.value)}
              value={Phone}
            />
          <TextField
              name="Email"
              margin="dense"
              variant="outlined"
              label ="Email"
              onChange={(event) => setEmail(event.target.value)}
              value = {Email}
          />
          </div>
          <div className = "rowStyle">
          <TextField
              name="Location "
              margin="dense"
              variant="outlined"
              label ="Location"
              onChange={(event) => setCurrentLocation(event.target.value)}
              value = {CurrentLocation}
          />
          
          <Select 
              className ="selectStyle"
              styles ={{fontsize: "10px"}}
              placeholder="Organization"
              name="Organization"
              defaultValue = {Organization}
              options={AllOrganizations}
              onChange={(event) => setOrganization(event.label)}
          />
            </div>
          <TextField
              multiline
              rows = {3}
              name="Address"
              margin="dense"
              variant="outlined"
              label ="Address"
              onChange={(event) => setAddress(event.target.value)}
              value = {Address}
          />
        
          <Button
              value="Save"
              color="primary"
              variant="contained"
              onClick={() => validateAndSave()}
          >Save</Button>
          
      </form>
    </div>
  );
}

export default Person;



