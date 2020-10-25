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
  const [AllPersons, setAllPersons] = useState([]);
  const [AllOrganizations, setAllOrganizations] = useState([]);
  


  useEffect(()=>{
    fetch('http://localhost:5000/getAllResources',{
    }).then(res=>res.json())
    .then(result=>{
        setAllResources(result.resources)
    })
  },[])

  useEffect(()=>{
    fetch('http://localhost:5000/getAllPersons',{
    }).then(res=>res.json())
    .then(result=>{
        setAllPersons(result.persons)
    })
  },[])

  const resourceProps = {
    options: AllResources,
    getOptionLabel: (option) => option.identifier,
  };
  const organizationProps = {
    options: initialData.organizations,
    getOptionLabel: (option) => option.value,
  };
  const personProps = {
    options: AllPersons,
    getOptionLabel: (option) => option.first_name + " "+ option.last_name,
  };
  
  const validateAndSave = () => {
    fetch('http://localhost:5000/addInward', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({Resource, Person, Organization, Price, Quantity, Comments, Date})
    }).then(() => alert("Inward Saved Successfully"))
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
              onChange={(event, value) => setResource(value.identifier)}
              renderInput={(params) => <TextField {...params} label="Resource" margin ="normal" />}
            />
          <Autocomplete className = "rowStyle"
              style = {{padding: "0px", margin: "0px"}}
              {...personProps}
              id="combo-box-demo"
              // name = "Person Requested"
              autoComplete
              includeInputInList
              onChange={(event, value) => setPerson(value.value)}
              renderInput={(params) => <TextField {...params} label="Sourced By" margin ="normal" />}
            />
            {/* </div> */}
          {/* <Autocomplete className = "rowStyle"
              style = {{padding: "0px", margin: "0px"}}
              {...organizationProps}
              id="combo-box-demo"
              // name = "Person Requested"
              autoComplete
              includeInputInList
              onChange={(event, value) => setOrganization(value.value)}
              renderInput={(params) => <TextField {...params} label="Organization" margin ="normal" />}
            /> */}
            
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




