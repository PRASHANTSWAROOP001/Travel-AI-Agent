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

import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';

import ReactMarkdown from 'react-markdown';

function SearchPage() {
  const [city, setCity] = useState('');
  const [days, setDays] = useState(0);
  const [loading, setLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState(null); // State to store the API response
  const [progress, setProgress] = useState(0);
  const [searchAlert, setSearchAlert] = useState(false);

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleDays = (e) => {
    setDays(e.target.value);
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

  const prompt = `Plan a ${days}-day trip to ${city}. Start with a title like "Experience [CITY]" that summarizes the overall trip theme. Each day should follow this structure:
  
  Day Theme: Briefly describe the main theme or experience for the day (e.g., exploring local cuisine, visiting temples, enjoying outdoor activities, etc.).
  Morning: List of activities, accommodations, and food options that align with the day's theme.
  Afternoon: List of activities and food options.
  Evening: List of activities, accommodations, and food options.
  After listing the agenda for all days:
  
  Include a 'General Tips' section with travel recommendations, safety tips, and cultural notes specific to [CITY].
  Provide a 'Budget Breakdown' with estimated costs for accommodations, food, and activities.
  Give all the data in MarkDown Format.`;

  const search = async () => {
    try {
      setLoading(true);
      setProgress(0);
      showAlert();
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

        setTravelPlan(travelPlanData); // Save the travel plan in the state

        setProgress(100);
      } 
      else {
        console.error('Data Could Not Be Fetched', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      // Ensure loading is stopped even if there is an error
    } finally {
      setCity('');
      setDays(0);
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 gap-8">
      <div className="w-full max-w-[90%] md:max-w-none md:w-auto flex flex-col md:flex-row items-center justify-center gap-8">
        <Card className="w-full md:w-[350px] h-fit shadow-lg duration-500 hover:scale-105">
          <CardHeader>
            <CardTitle className="font-semibold text-xl">Plan Your Trip</CardTitle>
            <CardDescription className="text-lg">Generate Trip Plan With One Click.</CardDescription>
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
                  <Input
                    type="number"
                    id="days"
                    value={days}
                    onChange={handleDays}
                    placeholder="Enter Days"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={search}>Search</Button>
          </CardFooter>
        </Card>

        {travelPlan && (
          <Card className="w-full md:w-[60%] max-h-[80vh] overflow-y-auto">
            <CardContent className="px-4 py-4">
              <ReactMarkdown>{travelPlan}</ReactMarkdown>
            </CardContent>
          </Card>
        )}
      </div>

      {loading && (
        <div className="w-full max-w-[90%] md:max-w-[80%]">
          <Progress value={progress} />
        </div>
      )}

      {searchAlert && (
        <Alert variant= 'default' className="w-full max-w-[90%] md:max-w-[80%]">
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
