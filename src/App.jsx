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
const About = lazy(()=>import("./pages/About"))
const PremiumSearch = lazy(()=>import("./pages/PremiumSearch.jsx"))
const Reset = lazy(()=>(import('./pages/ResetPage.jsx')))


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
        path:"About",
        element:(
          <Suspense fallback={<div className='text-3xl text-gray-700 mt-10'> Loading... </div>}>
            <About/>
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
        path:"saved-trip",
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

      {
        path:"premium-search",
        element:(
          <Suspense fallback={<div className='text-3xl text-gray-700 mt-10'> Loading... </div>}>
            <PremiumSearch/>
          </Suspense>
        )
      },
      {
        path:"forgot-password",
        element:(
          <Suspense fallback={<div className='text-3xl text-gray-700 mt-10'> Loading... </div>}>
            <Reset/>
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