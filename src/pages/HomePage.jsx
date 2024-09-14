import React from 'react';
import { PlaneIcon, MapPin, Calendar, Plane } from 'lucide-react';
import { Button } from '../components/ui/button';

import { Link } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="w-full">
        <section className="w-full py-12 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your AI-Powered Travel Planner
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Create personalized travel itineraries with the power of AI.
                  Just tell us where you want to go and for how long!
                </p>
              </div>
              <div className="w-full max-w-sm flex items-center justify-center gap-8 ">
                <Link to="/search">
                  {' '}
                  <Button> Get Started </Button>{' '}
                </Link>
                <Link to="/Registration">
                  {' '}
                  <Button variant="green"> Register </Button>{' '}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="duration-500 hover:scale-105">
                <CardHeader>
                  <MapPin className="w-8 h-8 mb-2" />
                  <CardTitle>Customized Itineraries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Get personalized travel plans based on your destination and
                    duration.
                  </p>
                </CardContent>
              </Card>
              <Card className="duration-500 hover:scale-105">
                <CardHeader>
                  <Calendar className="w-8 h-8 mb-2" />
                  <CardTitle>Flexible Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Adjust your plans on the go with our AI-powered
                    recommendations.
                  </p>
                </CardContent>
              </Card>
              <Card className="duration-500 hover:scale-105">
                <CardHeader>
                  <Plane className="w-8 h-8 mb-2" />
                  <CardTitle>Comprehensive Guides</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Receive detailed information about attractions, restaurants,
                    and activities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  1
                </div>
                <h3 className="mt-4 text-xl font-bold">Enter Your Details</h3>
                <p className="mt-2 text-gray-500">
                  Provide your destination and the number of days for your trip.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  2
                </div>
                <h3 className="mt-4 text-xl font-bold">AI Generates Plan</h3>
                <p className="mt-2 text-gray-500">
                  Our AI uses Meta-Llama-3-8B-Instruct to create a customized
                  itinerary for you.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  3
                </div>
                <h3 className="mt-4 text-xl font-bold">
                  Receive Your Itinerary
                </h3>
                <p className="mt-2 text-gray-500">
                  Get your travel plan in an easy-to-read markdown format.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="faq"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-3xl mx-auto"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How does the AI generate travel plans?
                </AccordionTrigger>
                <AccordionContent>
                  Our AI uses the Awan Llm API to analyze your input
                  (destination and duration) and generate a comprehensive travel
                  plan. It considers popular attractions, local cuisine, and
                  activities suitable for your trip length.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Can I customize the generated itinerary?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! While the AI provides an initial plan, you can always
                  request modifications or generate new plans with different
                  preferences. The AI is flexible and can adapt to your specific
                  needs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is the service free to use?</AccordionTrigger>
                <AccordionContent>
                  We offer a free tier with limited generations per month. For
                  frequent travelers or those planning multiple trips, we have
                  premium plans available with additional features and unlimited
                  generations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  How accurate are the travel plans?
                </AccordionTrigger>
                <AccordionContent>
                  Our AI uses up-to-date information to create travel plans.
                  However, we always recommend double-checking details,
                  especially for time-sensitive information like opening hours
                  or event schedules.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
