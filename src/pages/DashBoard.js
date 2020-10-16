import React from 'react';
import MaterialTable from 'material-table';
import '../css/outward.css';

export default function DashBoard() {
    return (
    <div className = "dashBoard" >
        <h2>DashBoard</h2>
        <hr/>
      <MaterialTable
        title="Inward/Outward Data"
        columns={[
          { title: 'Resource', field: 'resource' },
          { title: 'Inward/Outward', field: 'type' },
        ]}
        data={[
          
        ]}        
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
  