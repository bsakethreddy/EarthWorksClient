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

  const typeProps = {
    options: initialData.types,
    getOptionLabel: (option) => option.value,
  };
  useEffect(()=>{
    fetch('http://localhost:5000/getAllResources',{
    }).then(res=>res.json())
    .then(result=>{
        setAllResources(result.resources)
        console.log(result.resources)
    })
  },[])

  return (
    <div className = "outward">
      <form className = 'formStyle'>
          <h6> Outward</h6>
          <hr/>
          <div className = "rowStyle">
          <Select
              className ="selectStyle"
              styles ={{fontsize: "10px"}}
              placeholder="Resource"
              name="Resource"
              // options={initialData.units}
              // onChange={(event) => ()}
          />
          </div>
     
          <div >
          <Autocomplete className = "rowStyle"
              // {...typeProps}
              id="auto-complete"
              // name = "Person Requested"
              autoComplete
              includeInputInList
              onChange={(event) => setPersonRequested(event.target.value)}
              renderInput={(params) => <TextField {...params} label="Person Requested" margin ="normal" />}
            />
          <Autocomplete className = "rowStyle"
              // {...typeProps}
              id="auto-complete"
              // name = "Person Requested"
              autoComplete
              includeInputInList
              onChange={(event) => setPersonRequested(event.target.value)}
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
            //   onClick={() => this.validateAndSave()}
          >Save</Button>
          
      </form>
    </div>
  );
}

export default AddResource;