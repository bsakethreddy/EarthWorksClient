import React,{useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import '../css/outward.css';
import { common } from '@material-ui/core/colors';

export default function DashBoard() {
  const [inwardData, setInwardData] = useState([]);
  useEffect( ()=>{
    fetch('http://localhost:5000/getInward',{
    }).then(res=>res.json())
    .then(result=>{
        setInwardData(result.inward)
    });  
  },[])
  console.log("data = ",inwardData)
  const columns_array = [];
  if(inwardData.length > 0){
    const keys = Object.keys(inwardData[0]);
    keys.map(x => {columns_array.push({"title" : x , field : x})})
  }
    return (
    <div className = "dashBoard" >
        <h2>DashBoard</h2>
        <hr/>
      <MaterialTable
        title="Inward"
         columns = {columns_array}
        // data = {rows_array}
        data={inwardData.map(item => Object.assign({}, item))}        
        options={{
          filtering: true,
          rowStyle: {
              fontSize: '10px'
          },
          searchFieldStyle: {
              fontSize: '10px'
          }
        }}
      />
      </div>
    )
  }
  