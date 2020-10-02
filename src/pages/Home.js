import React, { useEffect, useState } from 'react';
import listInitialData from '../API';


function Home() {
  const [initialData, setInitialData] = useState([]);
 
  // useEffect(() => {
  //   (async () => {
  //     const initialData = await listInitialData();
  //     setInitialData(initialData);
  //     console.log(initialData);
  //     console.log("inside useeffect");
  //   })();
  // }, []);
  
  

  // async function temp(){
  //   const initialD = await listInitialData();
  //   setInitialData(initialD);
  //   console.log(initialD);
  // };
  // temp();
  return (
    <div className='home'>
      <h1>Home</h1>
      {
        initialData
      }
    </div>
  );
}

export default Home;
