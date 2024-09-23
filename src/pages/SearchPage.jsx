import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';

import ReactMarkdown from 'react-markdown';

import  {GoogleGenerativeAI} from "@google/generative-ai"

function SearchPage() {
  const [city, setCity] = useState('');
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState(null); // State to store the API response
  const [progress, setProgress] = useState(0);
  const [searchAlert, setSearchAlert] = useState(false);

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleDays = (value) => {
    const day = Number(value);
    if (day > 0 && day <= 3) {
      setDays(day);
    }
  };



  const showAlert = () => {
    setSearchAlert(true);

    setTimeout(() => {
      setSearchAlert(false);
    }, 3000);
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
      }, 1000);
    }

    return () => {
      clearInterval(increaseProgress); // Properly clear the interval
    };
  }, [loading]);

  const AWANLLM_API_KEY = import.meta.env.VITE_AWAN_LLM;

  const prompt = `Plan a ${days}-day trip  itinerary to ${city}.

  Day Theme: [theme]
  Morning: [activities, accommodations, food]
  Afternoon: [activities, food]
  Evening: [activities, accommodations, food]
  General Tips: [travel, safety, culture]
  Budget Breakdown: [accommodations, food, activities] in markdown.`;


  const search = async () => {

    const geminiAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API)

    const model = geminiAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig:{
        candidateCount:1,
        maxOutputTokens:1500,
        temperature:0.7,
      }
    })

    if(!city){
      alert("Please Add City");
      return;
    }

    try {
      setLoading(true);
      setProgress(0);
      showAlert();

      const result = await model.generateContent(prompt);

      setTravelPlan(result.response.text());
  
   
    } catch (error) {
      console.error('Error occurred:', error);
      // Ensure loading is stopped even if there is an error
    } finally {
      setProgress(100)
      setCity('');
      setDays(1);
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 gap-8">
      <div className="w-full flex flex-col lg:flex-row gap-8 justify-center lg:items-start lg:justify-start">
        {/* Left side search card */}
        <Card className="w-full md:w-[350px] lg:w-[350px] shadow-lg duration-500 hover:scale-105 lg:sticky lg:top-20">
          <CardHeader>
            <CardTitle className="font-semibold text-xl">Plan Your Trip</CardTitle>
            <CardDescription className="text-lg">
              Generate Trip Plan With One Click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="w-full grid items-center gap-4">
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
                <Select  value={String(days)} onValueChange={handleDays}>
                    <SelectTrigger id='days'>
                      <SelectValue placeholder="Select Days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="2">2 Days</SelectItem>
                      <SelectItem value="3">3 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={search}>Search</Button>
          </CardFooter>
        </Card>

        {/* Right side travel plan */}
        {travelPlan && (
          <Card className="w-full lg:w-[70%] max-h-[80vh] overflow-y-auto">
            <CardContent className="px-4 py-4">
              <ReactMarkdown>{travelPlan}</ReactMarkdown>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Loading progress */}
      {loading && (
        <div className="w-full max-w-[90%] md:max-w-[80%]">
          <Progress value={progress} />
        </div>
      )}

      {/* Search alert */}
      {searchAlert && (
        <Alert variant="default" className="w-full max-w-[90%] md:max-w-[80%]">
          <Terminal className="h-4 w-4" />
          <AlertTitle>In Progress...</AlertTitle>
          <AlertDescription>
            Please Wait. Search Request Has Been Made To Server. Be Patient.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
export default SearchPage;
