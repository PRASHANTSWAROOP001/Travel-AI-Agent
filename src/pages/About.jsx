import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Globe, Users, Zap, Sparkles, Lock } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Travel AI</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-600">
            Revolutionizing travel planning with AI-powered personalized itineraries
          </p>
        </section>

        <section className="mb-16 mx-auto max-w-4xl">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-2xl">Our Inspiration</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-4 text-gray-700">
                Travel AI was born from the frustration of spending countless hours planning trips. We wanted to create
                a solution that simplifies the process, making it easy for anyone to plan their perfect getaway.
              </p>
              <p className="text-gray-700">
                By leveraging the power of Large Language Models (LLMs), we've created an app that understands
                city-specific data and user preferences, offering tailored travel recommendations in seconds.
              </p>
              <div className="mt-6 flex items-center rounded-lg bg-purple-100 p-4 text-purple-700">
                <Sparkles className="mr-3 h-6 w-6" />
                <p className="font-medium">
                  The most exciting part? Watching our AI provide incredibly accurate and localized suggestions.
                  It's like having a local guide for every city, right at your fingertips!
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16 mx-auto max-w-4xl">
          <UserComparison />
        </section>

        <section className="mb-16 mx-auto max-w-4xl">
          <Card className="mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle>Technologies Used</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  "React", "Next.js", "TypeScript", "Tailwind CSS", "ShadCN UI", "Supabase",
                  "Awan LLM API", "Meta Llama Model", "Vercel"
                ].map((tech) => (
                  <li key={tech} className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-gray-700">{tech}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <CardTitle>Why We're Unique</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {[
                  "AI-powered itineraries tailored to your preferences",
                  "Up-to-date, city-specific recommendations",
                  "Seamless integration of local insights and hidden gems",
                  "Collaborative planning features for group trips"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}

function UserComparison() {
  const features = [
    { name: "Generate Itineraries", icon: Globe, guest: true, loggedIn: true },
    { name: "Customization", icon: Users, guest: false, loggedIn: true },
    { name: "Save Itineraries", icon: Zap, guest: false, loggedIn: true },
    { name: "Collaborate with Friends", icon: Users, guest: false, loggedIn: true },
    { name: "Access to Premium Features", icon: Sparkles, guest: false, loggedIn: true },
  ]

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">User Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1"></div>
          <div className="text-center font-semibold">Guest Users</div>
          <div className="text-center font-semibold">Logged-In Users</div>

          {features.map((feature, index) => (
            <>
              <div key={`feature-${index}`} className="flex items-center gap-2">
                <feature.icon className="w-5 h-5 text-gray-600" />
                <span className="text-sm">{feature.name}</span>
              </div>
              <div key={`guest-${index}`} className="flex justify-center">
                {feature.guest ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div key={`logged-${index}`} className="flex justify-center">
                {feature.loggedIn ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            </>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-blue-700">
            <Lock className="w-5 h-5" />
            <span className="font-semibold">Pro Tip:</span>
          </div>
          <p className="mt-2 text-sm text-blue-600">
            Sign up for a free account to unlock all features and enhance your travel planning experience!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}