import React,{useState} from 'react';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NumericInput from 'material-ui-numeric-input';
import '../css/outward.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as initialData from '../initialData';
import { red } from '@material-ui/core/colors';
import { ImageSwitchVideo } from 'material-ui/svg-icons';

function AddResource() {
  const [FullName, setFullName] = useState("");
  const [NickName, setNickName] = useState("");
  const [SKU, setSKU] = useState("");
  const [Type, setType] = useState("");
  const [Quantity, setQuantity] = useState();
  const [Location, setLocation] = useState("");
  const [Comment, setComment] = useState("");


  const typeProps = {
    options: initialData.types,
    getOptionLabel: (option) => option.value,
  };
  const showFormByType = () =>{
      console.log("TYPE = " , Type);
      if(Type == "tool"){
        return(
          <div className = "rowStyle">
           <Select 
                className ="selectStyle"
                styles ={{fontsize: "10px"}}
                placeholder="Transport Options "
                name="TransportOption"
                // options={initialData.units}
                // onChange={(event) => ()}
            />
            <Select 
                className ="selectStyle"
                styles ={{fontsize: "10px"}}
                placeholder="Composition Options"
                name="CompositionOption"
                // options={initialData.units}
                // onChange={(event) => ()}
            />
          </div>
        );
      }
  }
  return (
    <div className = "outward">
      <form className = 'formStyle'>
          <h6> Add Resource</h6>
          <hr/>
          <div className = "rowStyle">
            <TextField 
              label="Full Name"
              margin="dense"
              variant="outlined"
              onChange={(event) => setFullName(event.target.value)}
              value={FullName}
            />
            <TextField
              label="Nick Name"
              margin="dense"
              variant="outlined"
              onChange={(event) => setNickName(event.target.value)}
              value={NickName}
            />
          </div>

          <div>
              <Select 
                // className = "selectStyle"
                placeholder="Type"
                name="Type"
                options={initialData.types}
                onChange={(event) => setType(event.value)}
            />
          </div>
          {showFormByType()}
          <div className = "rowStyle">
            <TextField style = {{paddingRight:"2px"}}
                label="SKU"
                margin="dense"
                variant="outlined"
                onChange={(event) => setSKU(event.target.value)}
                value={SKU}
              />
            <TextField
                name="Quantity"
                margin="dense"
                variant="outlined"
                type = 'number'
                label ="Quantity"
                onChange={(event) => setQuantity(event.target.value)}
            />
            <Select 
                className ="selectStyle"
                styles ={{fontsize: "10px"}}
                placeholder="Units"
                name="Units"
                options={initialData.units}
                // onChange={(event) => ()}
            />
          </div>
          <div className = "rowStyle">
              <TextField
                  name="Location "
                  margin="dense"
                  variant="outlined"
                  label ="Location"
                  onChange={(event) => setLocation(event.target.value)}
              />
              
              <Select 
                  className ="selectStyle"
                  styles ={{fontsize: "10px"}}
                  placeholder="Owner"
                  name="Owner"
                  // options={initialData.units}
                  // onChange={(event) => ()}
              />
            </div>
        
          <Button
              value="Save"
              color="primary"
              variant="contained"
              onClick={() => this.validateAndSave()}
          >Save</Button>
          
      </form>
    </div>
  );
}

export default AddResource;