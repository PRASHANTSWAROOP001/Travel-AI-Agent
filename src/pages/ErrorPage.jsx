import {useRouteError} from "react-router-dom"

function ErrorPage(){
  const error = useRouteError()
  console.log("Error at handling Client Side Routes: ", error)
  return (
    <div>

      <h1 className='text-3xl text-red-400 '>Unexpected Error Happend While Routing</h1>

      <h2>Error: {error.stausText || error.message }</h2>

    </div>
  )
}

export default ErrorPage;