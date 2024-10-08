import { useState } from "react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { sendPasswordResetEmail } from "@/utils/supbase"

function Reset() {
    const [email, setEmail] = useState("")
    const [loading,setLoading] = useState(false)

    const handleEmail = (e) => {
        if (e.target.value.length > 0) {
            setEmail(e.target.value)
        }
    }

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);


    const resetPassword = async () =>{
        if(email.length == 0){
            alert("add email")
            return;
        }

        if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        
        setLoading(true)
    
        try {
            await sendPasswordResetEmail(email)
        } catch (error) {
            console.error("Error happend while sending reset mail")
        }
        finally{
            setLoading(false)
        }
    }




    return (
        <div className="w-full flex flex-col items-center justify-center h-screen gap-10">

            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>Enter Email To Reset Password</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input value={email} onChange={handleEmail} id="email" placeholder="Enter Your Email" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button disabled={loading} onClick={resetPassword} size="lg" variant='green'>Reset</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Reset