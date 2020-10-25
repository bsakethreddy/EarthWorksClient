import React,{useState, useEffect} from 'react';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NumericInput from 'material-ui-numeric-input';
import '../css/outward.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as initialData from '../initialData';
import { red } from '@material-ui/core/colors';
import { ImageSwitchVideo } from 'material-ui/svg-icons';
import {Link } from 'react-router-dom';
import { FormHelperText } from '@material-ui/core';

function AddResource() {
  const [FullName, setFullName] = useState("");
  const [NickName, setNickName] = useState("");
  const [SKU, setSKU] = useState("");
  const [Type, setType] = useState("");
  const [Quantity, setQuantity] = useState();
  const [Location, setLocation] = useState("");
  // const [Comment, setComment] = useState("");
  const [AllOwners, setAllOwners] = useState([]);
  const [Owner, setOwner] = useState("");

  const typeProps = {
    options: initialData.types,
    getOptionLabel: (option) => option.value,
  };
  useEffect(()=>{
    console.log(initialData.units)
    fetch('http://localhost:5000/getAllPersons',{
    }).then(res=>res.json())
    .then(result=>{
      var x = []
        for(var i in result.persons){
            x.push({"label": result.persons[i].first_name +" " + result.persons[i].last_name})
        }
        setAllOwners(x)
        console.log(x)
        
    })
  },[])

  const validateAndSave = () => {
    fetch('http://localhost:5000/addResource', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({FullName, NickName, SKU, Type, Quantity, Location, Owner})
    }).then(() => alert("Resource Saved Successfully"))
    .catch(() => alert("There was a error, Please try again"))
  };
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
            <Autocomplete className = "rowStyle"
              {...typeProps}
              id="auto-complete"
              name = "Type"
              autoComplete
              includeInputInList
              onChange={(event) => setType(event.target.value)}
              renderInput={(params) => <TextField {...params} label="Type" margin ="normal" />}
            />
          </div>
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
            </div>
            <div className = "rowStyle">
              <Select 
                  className ="selectStyle"
                  styles ={{fontsize: "10px"}}
                  placeholder="Owner"
                  name="Owner"
                  options={AllOwners}
                  onChange={(event) => setOwner(event.label)}
              />
              
            

            <Link style={{ textDecoration: "none" }} to = "/addPerson">
              <Button
                value="Save"
                color="primary"
                variant="contained"
            >Add Person</Button>
              <FormHelperText>Owner not found? Add one and come back!!</FormHelperText>
            </Link>
            </div>
        
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