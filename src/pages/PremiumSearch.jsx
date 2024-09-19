import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';



import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"



import ReactMarkdown from 'react-markdown';

import { isUserLoggedIn , insertData } from '../utils/supbase';

import { useNavigate } from 'react-router-dom';
export default function PremiumSearchPage() {

  const [city, setCity] = useState('');
  const [days, setDays] = useState(0);
  const [loading, setLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState(null);
  const [progress, setProgress] = useState(0);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("")
  const [alertTitle, setAlertTitle] = useState("")

  const [checkingAuth, setCheckingAuth] = useState(true);

  const [options, setOptions] = useState("");

  const showTemporaryAlert = (title, message, duration) => {
    setAlertTitle(title)
    setAlertMessage(message)
    setShowAlert(true)

    setTimeout(() => (setShowAlert(false)), duration)

  }

  const navigate = useNavigate()

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const checkingAuthentication = async () => {
    try {

      const login = await isUserLoggedIn()

      console.log("checking login at search page.", login)

      if (login == false) {
        navigate("/login")
      }
      else {
        setCheckingAuth(false)
      }

    }
    catch (error) {
      console.error("Error while checking logged in user at searchPage: ", error)
      throw error;
    }

  }

  useEffect(() => {
    checkingAuthentication();
  }, [])



  const handleDays = (e) => {
    let day = Number(e.target.value)
    if (day > 0 && day <= 7) {
      setDays(day)
    }
    else if (days > 7) {
      setDays(7)
    }
    else {
      setDays(1)
    }
  };


  useEffect(() => {
    let increaseProgress;
    if (loading) {
      increaseProgress = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) {
            return prev + 10;
          }
          return prev;
        });
      }, 2000);
    }
    return () => {
      clearInterval(increaseProgress);
    };
  }, [loading]);





  const AWANLLM_API_KEY = import.meta.env.VITE_AWAN_LLM

  const prompt = `Create a personalized ${days}-day trip itinerary for ${city}. ${options.length > 0 ? `Please include this activity in your plan if possible: ${options}.` : ""} Begin with a title that reflects the overall theme of the trip, such as "Explore the Best of [CITY]."

  For each day, follow this format:
  
  1. **Day Theme**: Briefly describe the focus of the day (e.g., cultural experiences, nature exploration, historical tours).
  2. **Morning**: List activities, food options, and any notable accommodations.
  3. **Afternoon**: Continue with planned activities and meal suggestions.
  4. **Evening**: Suggest nightlife, restaurants, or evening relaxation spots.
  
  Once all days are planned, provide:
  - **General Travel Tips**: Practical advice for navigating [CITY], including safety tips, best travel times, and cultural nuances.
  - **Budget Breakdown**: A rough estimate of the costs involved for accommodations, food, and activities, categorized by day.
  
  All output should be formatted in **Markdown**.`

  const search = async () => {
    try {
      setLoading(true);
      showTemporaryAlert("In Progress...", "Please Wait. Search Request Has Been Made To Server. Be Patient.", 3000)
      setProgress(0);

      const response = await fetch(
        'https://api.awanllm.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${AWANLLM_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'Meta-Llama-3-8B-Instruct',
            messages: [
              {
                role: 'system',
                content:
                  'You are a travel agent that curates personalized travel plans.',
              },
              { role: 'user', content: prompt },
            ],
            repetition_penalty: 1.1,
            temperature: 0.7,
            top_p: 0.9,
            top_k: 40,
            max_tokens: 2000,
            stream: false,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const travelPlanData = data.choices[0].message.content;
        setTravelPlan(travelPlanData);
        setProgress(100);
      }
      else {
        console.error('Data Could Not Be Fetched', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      showTemporaryAlert("Could Not Search", "Error Happend While Searching", 3000)
    } finally {
      setCity("")
      setDays(0);
      setLoading(false);
    }
  };

  const handleOptions = (value) =>{
    setOptions(value)
  }


  const insertTripData = async ()=>{
    if(city && travelPlan){
      await insertData(city,travelPlan)
      console.log("data inserted successfully from search page.")
    }
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="w-full lg:w-[30%] h-fit shadow-lg">
          <CardHeader>
            <CardTitle className="font-semibold text-xl">Plan Your Trip</CardTitle>
            <CardDescription className="text-lg">Generate Trip Plan With One Click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="flex flex-col space-y-3">
                <Label htmlFor="city">City</Label>
                <Input
                  type="text"
                  id="city"
                  value={city}
                  onChange={handleCity}
                  placeholder="Enter The City Name"
                />
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="days">Days</Label>
                <Input
                  type="number"
                  id="days"
                  value={days}
                  onChange={handleDays}
                  placeholder="Enter Days"
                />
              </div>

              <div className="flex flex-col space-y-3">
                <Label htmlFor="framework">Customiztion</Label>
                <Select onValueChange={handleOptions}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      <SelectLabel>Popular Options</SelectLabel>
                      <SelectItem value="cuisines">Explore Local Cuisines</SelectItem>
                      <SelectItem value="landmarks">Visit Historical Landmarks</SelectItem>
                      <SelectItem value="temples">Explore Local Temples</SelectItem>
                      <SelectItem value="nature">Relax at Scenic Nature Spots</SelectItem>
                      <SelectItem value="nightlife">Discover Nightlife & Entertainment</SelectItem>
                      <SelectItem value="shopping">Shopping & Local Markets</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Unique Options</SelectLabel>
                      <SelectItem value="hidden-gems">Hidden Cultural Gems</SelectItem>
                      <SelectItem value="adventure">Outdoor Adventure & Hiking</SelectItem>
                      <SelectItem value="art-architecture">Art & Architecture Exploration</SelectItem>
                      <SelectItem value="wellness">Wellness & Spa Retreats</SelectItem>
                      <SelectItem value="sustainable">Sustainable Travel</SelectItem>
                      <SelectItem value="craftsmanship">Local Craftsmanship & Workshops</SelectItem>
                      <SelectItem value="photography">Photographer`s Paradise</SelectItem>
                    </SelectGroup>

                  </SelectContent>
                </Select>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between gap-4">
            <Button onClick={search} disabled={loading} className="w-full">{loading ? "Searching ...": "Search"}</Button>
            <Button variant="outline" disabled={loading} className="w-full" onClick={insertTripData}><Link to="/saved-trips" >
              Saved Trip
            </Link></Button>

          </CardFooter>
        </Card>

        {travelPlan && (
          <Card className="w-full lg:w-[65%] max-h-[80vh] overflow-y-auto">
            <CardContent className="px-4 py-4">
              <ReactMarkdown>{travelPlan}</ReactMarkdown>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button>Save Trip</Button>
            </CardFooter>
          </Card>
        )}
      </div>

      {loading && (
        <div className="w-full mt-8">
          <Progress value={progress} />
        </div>
      )}

      {showAlert && (
        <Alert variant="default" className="w-full mt-8">
          <Terminal className="h-4 w-4" />
          <AlertTitle> {alertTitle}</AlertTitle>
          <AlertDescription>
            {alertMessage}
          </AlertDescription>
        </Alert>
      )}

    </div>
  );
}