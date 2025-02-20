import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, Navigate, RouterProvider, useLocation, useNavigate, useParams} from "react-router-dom"
import Layout from './Containers/Layout'
import Auth from './Containers/Auth'
import Projects from './Containers/Projects'
import YourProjects from './Containers/YourProjects'
import PenEditor from './Containers/penEditor'
import { Provider } from 'react-redux'
import { store } from './store'



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
  element : <PenEditor />
 },
 {
  path : "",
  element : <Navigate to={"/home/trending"} />
 }
])
 
function App() {


  return (
    <>
     <Provider store={store}>
       <RouterProvider router={router} />
     </Provider>
    </>
  )
}

export default App
