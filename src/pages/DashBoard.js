import React,{useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import '../css/outward.css';

export default function DashBoard() {
  const [AllResources, setAllResources] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/getAllResources',{
    }).then(res=>res.json())
    .then(result=>{
        setAllResources(result.resources)
        console.log(result.resources)
    })
  },[])
    return (
    <div className = "dashBoard" >
        <h2>DashBoard</h2>
        <hr/>
      <MaterialTable
        title="Inward/Outward"
        columns={[
          { title: 'Resource', field: 'full_name' },
          { title: 'Inward/Outward', field: 'type' },
        ]}
        data={AllResources}        
        options={{
        //   filtering: true,
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
  