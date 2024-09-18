import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { logIn } from '@/utils/supbase';
import { useNavigate } from 'react-router-dom';
import { XCircle } from "lucide-react"
import { Alert,AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {

  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [isLogging , setIsLogging] = useState(false)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const showTemporaryAlert = (message, duration) => {
    setAlertMessage(message)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), duration)
  }
  const navigate = useNavigate()

  const handleLogin =  async (e) => {

    e.preventDefault();

    if(!email || !password){
      showTemporaryAlert("Please enter email and Password Both!", 3000)
      return;
    }

    setIsLogging(true)

    try {
      const data = await logIn({email,password})
      showTemporaryAlert("Logged In SuccessFully && Naviagting To Search !!", 3000)
      setTimeout(()=>{
        navigate("/premium-search")
      },3000)

    } catch (error) {
      showTemporaryAlert("Error While Login !!", 3000)
      console.error("Error While login at page: ", error)
      throw error
      
    }
    finally{
      setIsLogging(false)
    }
  }


  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Login to Travel AI Agent</h2>

        {showAlert && (
          <Alert variant="destructive" className="mb-4 mx-auto max-w-sm">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        )}

        <p className="text-center text-gray-600 mb-6">
          Welcome back! Let's continue your AI-powered travel journey.
        </p>
        <div className="flex space-x-4 mb-6">
          <Button variant="outline" className="w-1/2 flex items-center justify-center">
            <FcGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline" className="w-1/2 flex items-center justify-center">
            <FaGithub className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={email} onChange={(e)=>(setEmail(e.target.value))} placeholder="Enter your email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" value={password} onChange={(e)=>(setPassword(e.target.value))} placeholder="Enter your password" type="password" required />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="remember" className="flex items-center gap-2">
              <Input id="remember" type="checkbox" />
              Remember me
            </Label>
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" disabled={isLogging} className="w-full">{isLogging ? "Loggin in...":"Login"}</Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/?openModal=true" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
