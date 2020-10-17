import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import {Link } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import { FormHelperText } from '@material-ui/core';
import styles from '../css/Inward.css'
import * as initialData from '../initialData';
import Select from 'react-select';

export default function Inward() {
  const [Resource, setResource] = useState("");
  const [Person, setPerson] = useState("");
  const [Comments, setComments] = useState("");
  const [Organization, setOrganization] = useState("");
  const [Quantity, setQuantity] = useState();
  const [Price, setPrice] = useState();
  const [Date, setDate] = useState();
  const [AllResources, setAllResources] = useState([]);
  
  useEffect(()=>{
    fetch('http://localhost:5000/getResources',{
    }).then(res=>res.json())
    .then(result=>{
        setAllResources(result)
    })
  },[])

  const resourceProps = {
    options: initialData.AllResources,
    getOptionLabel: (option) => option.value,
  };
  const organizationProps = {
    options: initialData.organizations,
    getOptionLabel: (option) => option.value,
  };
  const personProps = {
    options: initialData.persons,
    getOptionLabel: (option) => option.value,
  };
  
  const validateAndSave = () => {
    fetch('http://localhost:5000/addInward', {
      method: 'POST',
      body: JSON.stringify({Resource, Person, Organization, Price, Quantity, Comments, Date})
    }).then(() => alert("Resource Saved Successfully"))
    .catch(() => alert("There was a error, Please try again"))
  };
  return (
    <div className = "outward">
      <form className = 'formStyle'>
          <h6> Inward</h6>
          <hr/>
          <div className = "rowStyle">
          
          <Link style={{ textDecoration: "none" }} to = "/addResource">
          <FormHelperText>Resource not found? Add one and come back!!</FormHelperText>
            <Button
                value="Add Resource"
                color="primary"
                variant="contained"
                helperText="Resource not found?"
              //   onClick={() => this.validateAndSave()}
            >Add Resource</Button>
          </Link>
          <Link style={{ textDecoration: "none" }} to = "/addPerson">
          <FormHelperText>Source By not found? Add one and come back!!</FormHelperText>
            <Button
                value="Save"
                color="primary"
                variant="contained"
              //   onClick={() => this.validateAndSave()}
            >Add Person</Button>
          </Link>
          </div>
          {/* <div className = "rowStyle"> */}
          <Autocomplete className = "rowStyle"
              style = {{padding: "0px", margin: "0px"}}
              {...resourceProps}
              id="combo-box-demo"
              // name = "Person Requested"
              autoComplete
              includeInputInList
              onChange={(event) => setResource(event.target.value)}
              renderInput={(params) => <TextField {...params} label="Resource" margin ="normal" />}
            />
          <Autocomplete className = "rowStyle"
              style = {{padding: "0px", margin: "0px"}}
              {...personProps}
              id="combo-box-demo"
              // name = "Person Requested"
              autoComplete
              includeInputInList
              onChange={(event) => setPerson(event.target.value)}
              renderInput={(params) => <TextField {...params} label="Sourced By" margin ="normal" />}
            />
            {/* </div> */}
          <Autocomplete className = "rowStyle"
              style = {{padding: "0px", margin: "0px"}}
              {...organizationProps}
              id="combo-box-demo"
              // name = "Person Requested"
              autoComplete
              includeInputInList
              onChange={(event) => setOrganization(event.target.value)}
              renderInput={(params) => <TextField {...params} label="Organization" margin ="normal" />}
            />
            
            <div className = "rowStyle">
            <TextField 
                name="Quantity"
                margin="dense"
                variant="outlined"
                type = 'number'
                label ="Quantity"
                onChange={(event) => setQuantity(event.target.value)}
            />
              <TextField style = {{paddingLeft : "5px", paddingRight: "5px"}}
                  name="Price"
                  margin="dense"
                  variant="outlined"
                  type = 'number'
                  label ="Price"
                  onChange={(event) => setPrice(event.target.value)}
              />
              <TextField
                  type = "date"
                  name="Date"
                  margin="dense"
                  variant="outlined"
                  // label ="Date"
                  onChange={(event) => setDate(event.target.value)}
              />
            </div>
            <TextField className = "rowStyle"
              multiline
              rows = {3}
              name="Comments"
              margin="dense"
              variant="outlined"
              label ="Comments"
              onChange={(event) => setComments(event.target.value)}
            />
          <Button className = "rowStyle"
              value="Save"
              color="primary"
              variant="contained"
               onClick={() => validateAndSave()}
          >Save</Button>
          
      </form>
    </div>
  );
}




