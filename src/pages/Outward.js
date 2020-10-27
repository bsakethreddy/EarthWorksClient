import React,{useState, useEffect} from 'react';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NumericInput from 'material-ui-numeric-input';
import '../css/outward.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as initialData from '../initialData';
import { red } from '@material-ui/core/colors';

function AddResource() {
  const [Resource, setResource] = useState("");
  const [AllResources, setAllResources] = useState([]);
  const [Quantity, setQuantity] = useState("");
  const [PersonRequested, setPersonRequested] = useState("");
  const [Transporter, setTransporter] = useState("");
  const [ToLocation, setToLocation] = useState("");
  const [Comments, setComments] = useState("");
  const [AllPersons, setAllPersons] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/getAllResources',{
    }).then(res=>res.json())
    .then(result=>{
        setAllResources(result.resources)
    })
  },[]);

  const resourceProps = {
    options: AllResources,
    getOptionLabel: (option) => option.identifier,
  };
  useEffect(()=>{
    fetch('http://localhost:5000/getAllPersons',{
    }).then(res=>res.json())
    .then(result=>{
        setAllPersons(result.persons)
    })
  },[])
  const personProps = {
    options: AllPersons,
    getOptionLabel: (option) => option.first_name + " "+ option.last_name,
  };
  const validateAndSave = () => {
    fetch('http://localhost:5000/addOutward', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({Resource, PersonRequested, Transporter, ToLocation, Quantity, Comments})
    }).then((res) => {
      res.json().then(x => alert( x.message));
    })
    .catch(() => alert("There was a error, Please try again"))
  };

  return (
    <div className = "outward">
      <form className = 'formStyle'>
          <h6> Outward</h6>
          <hr/>
     
          <div >
          <Autocomplete className = "rowStyle"
              {...resourceProps}
              id="combo-box-demo"
              autoComplete
              includeInputInList
              onChange={(event, value) => setResource( value ? value.identifier :  "")}
              renderInput={(params) => <TextField {...params} label="Resource" margin ="normal" />}
            />
          <Autocomplete className = "rowStyle"
              {...personProps}
              id="auto-complete"
              // name = "Person Requested"
              autoComplete
              includeInputInList
              onChange={(event, value) => setPersonRequested( value ? value.first_name :  "")}
              renderInput={(params) => <TextField {...params} label="Person Requested" margin ="normal" />}
            />
          <Autocomplete className = "rowStyle"
              {...personProps}
              id="auto-complete"
              // name = "Person Requested"
              autoComplete
              includeInputInList
              onChange={(event, value) => setTransporter( value ? value.first_name :  "")}
              renderInput={(params) => <TextField {...params} label="Transporter" margin ="normal" />}
            />
          </div>
          <div className = "rowStyle">
          <TextField
              name="Quantity"
              margin="dense"
              variant="outlined"
              type = 'number'
              label ="Quantity"
              onChange={(event) => setQuantity(event.target.value)}
          />
          <TextField
              name="ToLocation "
              margin="dense"
              variant="outlined"
              label ="To Location"
              onChange={(event) => setToLocation(event.target.value)}
          />
            </div>
          <TextField
              multiline
              rows = {3}
              name="Comments"
              margin="dense"
              variant="outlined"
              label ="Comments"
              onChange={(event) => setComments(event.target.value)}
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

export default AddResource;