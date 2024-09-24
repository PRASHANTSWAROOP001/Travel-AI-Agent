#
🧳 Travel AI Agent 🏖️

**A smart travel planner powered by AI, React, Supabase, and Gemini API**

## Overview

Travel AI Agent is a web app designed to create travel plans in one click. Simply enter a city and the number of days, and let the AI generate a detailed itinerary just for you! Whether you're a guest or a logged-in user, this app offers flexibility in planning your trips.

I built this project to learn Supabase and have a little fun with AI! Now, it's ready to help others explore the world with ease.

---

## ✨ Features

### Guest Users:
- **View/Create Plans** for up to 3 days.
  
### Logged In Users:
- **Customize and create** plans for up to 7 days (one week).
- **Save your trips**, view them later, and even delete them.
- Full **authentication support**: register, login, logout, and reset your password (reset feature is a work in progress 🔨).

### Supabase Database:
- Save and fetch your travel plans seamlessly.

---

## 💡 Motivation

I wanted to learn Supabase and thought, why not make learning fun by building something that helps others? I also love the idea of saving people hours of research by creating a one-click travel planning tool! 

Even though I don’t get to travel much, I figured I could help others make their trips more accessible and fun!

---

## 🛠️ Tech Stack

- **Frontend:** React.js with Tailwind CSS & Shadcn UI.
- **Backend:** Supabase for authentication and data storage.
- **AI Travel Plan Generator:** Gemini API (formerly experimented with OpenAI and Awan LLMs).
- **Rendering Markdown:** React Markdown.

---

## 🚧 Challenges

I started with OpenAI’s API for generating travel plans but quickly hit their free-tier limits. That’s when I learned all about **tokens** and **temperature** in LLM models. 

After some research, I switched to Awan LLM—fun times, but it gave some... *wild* results. Especially when calculating trip costs, it felt like I was getting hit with the infamous "white men price" 😂.

Then the Awan API crashed entirely, so I moved on to **Google's Gemini API**. Now the project runs smoothly, and the trip plans are on point!

---

## 👨‍💻 Learnings

Authentication is tough! But after this project, I have so much respect for the basics. Supabase definitely made the journey easier, so props to them! It has been a wild ride, but I came out of it knowing more about LLMs, authentication, and building cool stuff on the web.

---

## 🔮 Future Plans

- Finish the password reset feature.
- Improve trip cost accuracy.
- Add support for more complex itineraries (multiple cities, activities, etc.).

---

### Try It Out Today!
Feel free to explore and let the AI plan your next adventure! [Live Link](https://travel-ai-agent.netlify.app/) 👨‍💻
