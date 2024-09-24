import { useState, useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"

import { useSearchParams, useNavigate } from "react-router-dom"

import { updatePassword } from "@/utils/supbase"



export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  useEffect(()=>{
   
   const accessToken = searchParams.get("access_token");
   if(!accessToken){
    alert("Access Token Is Not Defined Check Mail.")
   }


  },[])


  const handleResetPassword = async() => {
    setLoading(true)

    try {
        const {success, message } = await updatePassword(password)
        if(!success){
            throw new Error("Error: ", message)
        }
        alert("Password Updated Successfully.")
        navigate("/login")

        
    } catch (error) {
        console.error("Error while updating password: ", error);

    }
    finally{
        setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Update Password</h2>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </button>
          </div>
          <button
            disabled={loading}
            onClick={handleResetPassword}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  )
}