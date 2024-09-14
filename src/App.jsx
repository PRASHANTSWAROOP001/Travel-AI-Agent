import { useState, lazy, Suspense } from 'react'
import {Button} from "./components/ui/button.jsx"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './App.css'
import Layout from "./layout/Layout"
import ErrorPage from "./pages/ErrorPage"
import HomePage from "./pages/HomePage"

const LoginPage = lazy(() => import("./pages/LoginPage"))
const SavedTrip = lazy(() => import("./pages/SavedTrip"))
const SearchPage = lazy(() => import("./pages/SearchPage"))
const RegistrationPage = lazy(()=>import("./pages/RegistrationPage"))


function App() {

  const router = createBrowserRouter([{
    path:"/",
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children:[
      {
        index:true,
        element: <HomePage/>
      },

      {
        path:"Registration",
        element:(
          <Suspense fallback={<div className='text-3xl text-gray-700 mt-10'> Loading... </div>}>
            <RegistrationPage/>
          </Suspense>
        )
      },

      {
        path:"Search",
        element:(
          <Suspense fallback={<div className='text-3xl text-gray-700 mt-10'> Loading... </div>}>
            <SearchPage/>
          </Suspense>
        )
      },
      {
        path:"SavedTrip",
        element:(
          <Suspense fallback={<div className='text-3xl text-gray-700 mt-10'> Loading... </div>}>
            <SavedTrip/>
          </Suspense>
        )
      },

      {
        path:"login",
        element:(
          <Suspense fallback={<div className='text-3xl text-gray-700 mt-10'> Loading... </div>}>
            <LoginPage/>
          </Suspense>
        )
      },

    ]
  }])

  return (
   <RouterProvider router={router}/>
  )
}

export default App
