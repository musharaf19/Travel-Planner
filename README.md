# 🌍 Travel-Planner

An AI-powered travel planning web app that helps users generate personalized itineraries, explore destinations, and manage trips — all with a modern, responsive UI and seamless user experience.

---

## ✨ Features

- 🔮 **AI Itinerary Generator** – Google Gemini AI creates custom travel plans.
- 📍 **Google Places Integration** – Real-time place suggestions and details.
- 🔐 **Google OAuth Login** – Secure authentication with Google accounts.
- 🧳 **Trip Management** – Save, view, and manage your travel plans.
- 💬 **Chatbot Assistant** – Get instant AI-powered travel help.
- 🌙 **Dark/Light Mode** – Theme toggle for better accessibility.
- 🏨 **Hotel Suggestions** – AI-curated recommendations based on preferences.
- 📌 **Attractions & Activities** – Suggested must-visit places.
- 🔗 **Trip Sharing** – Share plans with friends or family.
- 📝 **Feedback System** – Users can rate and review their trips.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** – Component-based UI
- **Vite** – Lightning-fast build tool
- **Tailwind CSS** – Utility-first styling
- **Radix UI** – Accessible UI components
- **React Router DOM** – Client-side routing
- **Lucide React** – Icon set
- **Next Themes** – Theme management (dark/light mode)

### Backend
- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **Google Gemini AI** – AI content generation
- **CORS** – Cross-origin resource sharing

### APIs & Services
- **Google Places API** – Destination suggestions
- **Google OAuth** – Authentication
- **Firebase** – Hosting and database
- **EmailJS** – Send feedback via email

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js (v16+)
- npm or yarn
- Google Cloud Platform account
- Firebase account

---

## 🔐 Environment Variables

Create a `.env.local` file inside the `Frontend/` directory with the following:

```env
VITE_GOOGLE_PLACE_API_KEY=your_google_places_api_key
VITE_GOOGLE_GEMINI_AI__API_KEY=your_gemini_api_key
VITE_GOOGLE_AUTH_CLIENT_ID=your_google_oauth_client_id
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_BACKEND_URL=http://localhost:5000
