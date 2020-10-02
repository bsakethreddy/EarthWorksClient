import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import styles from '../css/Inward.css'

export default function Inward() {
  const [data,setData] = useState([])
  useEffect(()=>{
    fetch('http://localhost:5000/getTypes',{
        
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        setData(result.types)
    })
 },[])
  const typeProps = {
    options: data,
    getOptionLabel: (option) => option.name,
  };
  // handleSubmit() {
  //   alert('Inward data is added');
  //   // event.preventDefault();
  // }
  return (
    <div style = {{alignItems:"center", display:"flex", justifyContent:"center"}}>
    <form style={{ paddingLeft:50, width: 300 }} >
      <Autocomplete
        {...typeProps}
        id="auto-complete"
        autoComplete
        includeInputInList
        renderInput={(params) => <TextField {...params} label="Types" margin ="normal" />}
      />
     <Autocomplete
        {...typeProps}
        id="auto-complete"
        autoComplete
        // includeInputInList
        renderInput={(params) => <TextField {...params} label="Resources" margin="normal" />}
      />
      <Autocomplete
        {...typeProps}
        id="auto-complete"
        autoComplete
        includeInputInList
        renderInput={(params) => <TextField {...params} label="Location" margin="normal" />}
      />
      <Autocomplete
        {...typeProps}
        id="auto-select"
        autoSelect
        renderInput={(params) => <TextField {...params} label="XXXXX" margin="normal" />}
      />
      <div style ={{marginTop:'10px', marginLeft:'35px'}}>
        <Button size="medium" color = "primary" variant="contained" >
            Add
        </Button>
      </div>
    </form>
    </div>
  );
}


const types = [
  {type : 'Consumable'},
  {type: 'non-consumable'}
];

// export default CustomSelect;
