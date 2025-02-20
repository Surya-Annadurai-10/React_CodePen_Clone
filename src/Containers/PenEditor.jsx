import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

const PenEditor = () => {
    const {id} = useParams();
    // const location  = useLocation();

    console.log("params", id);
    console.log("location", location);
    
  return (
    <div>
        <h1>PenEditor</h1>
       <Link className={"bg-red-300"} to={"/home/trending"} >Back</Link>
    </div>
  )
}

export default PenEditor