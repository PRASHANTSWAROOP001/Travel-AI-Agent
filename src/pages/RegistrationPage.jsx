import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Register() {

  return (

    <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-full max-w-md">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Registration at Travel AI Agent</h2>
        <p className="text-center text-gray-600 mb-6">
          Join us to explore the world with AI-powered travel recommendations!
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
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Enter your password" type="password" required />
          </div>
          <Button type="submit" className="w-full">Register</Button>
        </form>
      </div>
    </div>

  )
}