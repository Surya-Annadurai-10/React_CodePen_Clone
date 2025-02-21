import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { addUserData, loggedIn } from '../slices/slice';

const PenEditor = () => {
    const {id} = useParams();
    // const location  = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() =>{
         let user = JSON.parse(localStorage.getItem("userData"))
         if(user){
           dispatch(loggedIn(true));
           dispatch(addUserData(user))
           
         }else  {
           dispatch(loggedIn(false))
           navigate("/home/trending")
         };
       },[])
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