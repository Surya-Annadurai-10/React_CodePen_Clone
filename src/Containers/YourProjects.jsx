import React, { useContext, useEffect } from 'react'
import { DataContext } from '../App';
import SideBar from '../Components/SideBar';
import { useSelector } from 'react-redux';
import SignUpPopUp from '../Components/SignUpPopUp';
import { useNavigate } from 'react-router-dom';
import { addUserData, loggedIn } from '../slices/slice';

const YourProjects = () => {
const ctx = useContext(DataContext);
console.log(ctx);



const stateIsLoggedIn = useSelector(state => state.codepenData.isLoggedIn);
console.log("stateIsLoggedIn" , stateIsLoggedIn);

const navigate = useNavigate();

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

  return (
    <div>
      {
        stateIsLoggedIn ? 
        <div>
          <h1>Your Projects</h1>
        </div>
         : 
   <>
    {
      ctx.showSignUpPopUp ? <SignUpPopUp /> : null
    }
   </>
      }

    </div>
  )
}

export default YourProjects