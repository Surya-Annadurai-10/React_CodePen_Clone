import { createContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, Navigate, RouterProvider, useLocation, useNavigate, useParams} from "react-router-dom"
import Layout from './Containers/Layout'
import Auth from './Containers/Auth'
import Projects from './Containers/Projects'
import YourProjects from './Containers/YourProjects'
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './store'
import Pen from './Containers/Pen'
import { addPinnedProjects } from './slices/slice'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from './firebase'
import Gemini from './Containers/Gemini'


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
      },
      {
        path:"/ask_ai",
        element:<Gemini />
      }
    ]
 } ,
 {
  path : "/pen/:id",
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
const [isSideBarOpen , setIsSideBarOpen] =  useState(true);
const [clickedData , setClickedData] = useState({});
const [searchValue , setSearchValue] = useState("");
  
  return (
    <>
    <DataContext.Provider value={{searchValue,setSearchValue,clickedData,setClickedData,setIsSideBarOpen,isSideBarOpen,showSignUpPopUp,setShowSignUpPopUp}}>
    <Provider store={store}>
       <StyledEngineProvider injectFirst>
         <RouterProvider router={router} />
       </StyledEngineProvider>
     </Provider>
    </DataContext.Provider>
    </>
  )
}

export default App
