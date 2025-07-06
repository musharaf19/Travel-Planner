import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Createtrip from "./create-trip";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Viewtrip from "./view-trip/[tripId]";
import MyTrips from "./my-trips";
import { ThemeProvider } from "./components/ThemeProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <Createtrip />,
  },
  {
    path: "/view-trip/:tripId",
    element: <Viewtrip />,
  },
  {
    path: "/my-trips",
    element: <MyTrips />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <ThemeProvider>
        <Header />
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
