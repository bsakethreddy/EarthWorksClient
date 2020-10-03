import React,{useState} from 'react';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NumericInput from 'material-ui-numeric-input';
import '../css/outward.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as initialData from '../initialData';
import { red } from '@material-ui/core/colors';

function AddResource() {
  const [Resource, setResource] = useState();
  const [Quantity, setQuantity] = useState("");
  const [PersonRequested, setPersonRequested] = useState("");
  const [PersonRecieved, setPersonRecieved] = useState("");
  const [Location, setLocation] = useState("");


  const typeProps = {
    options: initialData.types,
    getOptionLabel: (option) => option.value,
  };
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
     
          <div className = "rowStyle">
          <TextField 
              label="Person Requested"
              margin="dense"
              variant="outlined"
              onChange={(event) => setPersonRequested(event.target.value)}
              value={PersonRequested}
            />
          
          <TextField
              label="Person Recieved"
              margin="dense"
              variant="outlined"
              onChange={(event) => setPersonRecieved(event.target.value)}
              value={PersonRecieved}
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
              name="Location "
              margin="dense"
              variant="outlined"
              label ="Location"
              onChange={(event) => setLocation(event.target.value)}
          />
            </div>
        
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