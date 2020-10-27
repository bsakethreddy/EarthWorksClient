import React,{useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import '../css/outward.css';

export default function DashBoard() {
  const [inwardData, setInwardData] = useState([]);
  const [outwardData, setOutwardData] = useState([]);

  useEffect( ()=>{
    fetch('http://localhost:5000/getInward',{
    }).then(res=>res.json())
    .then(result=>{
        setInwardData(result.inward)
    });  
  },[inwardData])

  useEffect( ()=>{
    fetch('http://localhost:5000/getOutward',{
    }).then(res=>res.json())
    .then(result=>{
        setOutwardData(result.outward)
    });  
  },[null])


  var columns_array = [];
  if(inwardData.length > 0 || outwardData.length > 0){
    columns_array = []
    for(var i=0;i<outwardData.length;i++){
      inwardData.push(outwardData[i])
    }
    console.log("inwarddata = ",inwardData)
    var keys1, keys2;
    if(inwardData.length>0){
       keys1 = Object.keys(inwardData[0])
    }
    if(outwardData.length>0){
      keys2 = Object.keys(outwardData[0])
    }
    
    for(var i in keys2)
    {
      
      if(keys1.includes(keys2[i]))
      {
          continue
      }
      else{
        keys1.push(keys2[i])
      }
      
    }
    console.log("check"+keys1)
    keys1.map(x => {columns_array.push({"title" : x , field : x})})
  }

 

    return (
    <div className = "dashBoard" >
        <h2>DashBoard</h2>
        <hr/>
      <MaterialTable
        title="Inward/Outward"
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
  