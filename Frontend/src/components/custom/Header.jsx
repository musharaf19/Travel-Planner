import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { Moon, Sun } from "lucide-react"; // Theme icons
import Chatbot from "../Chatbot";

function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [welcomeText, setWelcomeText] = useState(""); // Animated text state

  // Google Login
  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data);
        window.location.reload();
      });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Smooth, non-fluctuating welcome message animation
  useEffect(() => {
    if (user?.name) {
      const text = `Welcome, ${user.name}`;
      let i = 0;

      const interval = setInterval(() => {
        setWelcomeText(text.slice(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(interval);
        }
      }, 150); // Slower typing speed

      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <header className="p-3 shadow-sm flex justify-between items-center px-5 bg-white dark:bg-gray-900 dark:text-white">
      {/* Logo & Title */}
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="Logo" className="h-10" />
        <a href="/">
          <h1 className="text-2xl font-semibold p-3 animate-bounce">
            Hey There....!
          </h1>
        </a>
      </div>

      {/* Animated Welcome Message */}
      {user && (
        <h2 className="font-serif absolute left-1/2 transform -translate-x-1/2 text-sm font-medium bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          {welcomeText}
        </h2>
      )}

      {/* Dark Mode Toggle & Buttons */}
      <div className="flex items-center gap-5">
        <Button
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-full p-2 h-10 w-10"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </Button>

        {user ? (
          <>
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>

            {/* User Profile Dropdown */}
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[35px] w-[35px] rounded-full cursor-pointer"
                />
              </PopoverTrigger>
              <PopoverContent className="w-fit p-2 text-center flex flex-col gap-3 mt-5 mr-10">
                <Button
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                  className="w-full"
                >
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button onClick={login} className="flex gap-2 items-center">
            <FcGoogle size={20} /> Sign In
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
