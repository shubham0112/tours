import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading,setIsLoading]=useState(true);
  const [tours,setTours]=useState([]);

  const removeTour=(id)=>{
    const newTours=tours.filter((tour)=>tour.id!==id);
    setTours(newTours);
  }

  const fetchData=async ()=>{
    setIsLoading(true);
    try {
      const resp=await fetch(url);
      const tours=await resp.json();
      // console.log(tours);
      setIsLoading(false);
      setTours(tours);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchData();
  },[])

  if(loading){
    return(
      <main>
        <Loading/> 
      </main>
    );
  }
  if(tours.length===0){
    return(
      <main>
        <div className="title">
          <h2>No tours left</h2>
          <button className='btn' onClick={fetchData}>Refresh</button>
        </div>
      </main>
    );
  }
  return(
    <main>
      <Tours tours={tours} removeTour={removeTour}/>
    </main>
  );
}

export default App
