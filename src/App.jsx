import { createContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, Navigate, RouterProvider, useLocation, useNavigate, useParams} from "react-router-dom"
import Layout from './Containers/Layout'
import Auth from './Containers/Auth'
import Projects from './Containers/Projects'
import YourProjects from './Containers/YourProjects'

import { Provider, useDispatch } from 'react-redux'
import { store } from './store'
import Pen from './Containers/Pen'


export const DataContext = createContext();

const router = createBrowserRouter([
 {
    element : <Layout />,
    children :[
      {
        path : "/home/authentication",
        element : <Auth />
      },
      {
        path : "/home/trending",
        element : <Projects />
      },
      {
        path:"/your_projects",
        element :<YourProjects />
      }
    ]
 } ,
 {
  path : "/pen",
  element : <Pen />
 },
 {
  path : "",
  element : <Navigate to={"/home/trending"} />
 }
])
 
function App() {
  const [showSignUpPopUp , setShowSignUpPopUp] = useState(true);
  const [routeLink , setRouteLink] = useState("/home/authentication")
  const [isLoading , setIsLoading] = useState(false);
 


      useEffect(() =>{
        const fetchData = async() =>{
          const projectsRef = collection(firestore , "projects")
          try {
            const res = await getDocs(projectsRef);
            console.log(res.data());
          } catch (error) {
           
          }
        }
      },[])

  
  return (
    <>
    <DataContext.Provider value={{showSignUpPopUp,setShowSignUpPopUp}}>
    <Provider store={store}>
       <RouterProvider router={router} />
     </Provider>
    </DataContext.Provider>
    </>
  )
}

export default App
