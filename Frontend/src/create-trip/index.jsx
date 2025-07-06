import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelersList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import React, { useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function Createtrip() {
  const [place, setPlace] = React.useState();
  const [formData, setFormData] = React.useState({ name: "", noOfDays: "" });
  const [autocompleteKey, setAutocompleteKey] = React.useState(Date.now());
  const [openDialog, setOpenDialog] = React.useState(false);
  const [loadingState, setLoadingState] = React.useState(false);

  const navigate=useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    // Check if required fields (name, location, budget, traveler) are filled
    if (
      !formData?.name.trim() ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all the fields", "error");
      return;
    }

    // Check if 'noOfDays' is between 1 and 10
    if (
      !formData?.noOfDays ||
      formData.noOfDays < 1 ||
      formData.noOfDays > 10
    ) {
      toast("Number of days should be between 1 and 10", "error");
      return;
    }

    setLoadingState(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    setLoadingState(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoadingState(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoadingState(false);
    navigate('/view-trip/'+docId);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  const [darkMode, setDarkMode] = React.useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "dark"
      : false
  );

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setAutocompleteKey(Date.now());
  }, [darkMode]);

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl mb-3">
        Tell us your travel preferences 🏕
      </h2>
      <p className="mt-3 text-gray-700 text-xl">
        Select your favorite destinations, activities, and travel style, and let
        AI craft the perfect itinerary for you!
      </p>

      <div className="mt-20 flex flex-col gap-10">
        {/* User Name Input */}
        <div>
          <h2 className="text-xl my-3 font-medium ">What is your name?</h2>
          <Input
            className="w-full h-14 p-4 text-lg border border-gray-300 rounded-lg"
            placeholder="Enter your name..."
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>

        {/* Destination Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">Where do you want to go?</h2>
          <GooglePlacesAutocomplete
            key={autocompleteKey}
            apiKey={GOOGLE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
              styles: {
                control: (base, state) => ({
                  ...base,
                  backgroundColor: darkMode ? "#1f2937" : "#ffffff", // Dark mode: gray-800, Light mode: white
                  color: darkMode ? "#ffffff" : "#000000",
                  borderColor: state.isFocused
                    ? darkMode
                      ? "#9ca3af" // Focus border in dark mode
                      : "#2563eb" // Focus border in light mode (blue-600)
                    : darkMode
                    ? "#4b5563" // Normal border in dark mode (gray-600)
                    : "#d1d5db", // Normal border in light mode (gray-300)
                  padding: "10px",
                  borderRadius: "8px",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: darkMode ? "#ffffff" : "#000000",
                }),
                input: (provided) => ({
                  ...provided,
                  color: darkMode ? "#ffffff" : "#000000",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: darkMode ? "#9ca3af" : "#6b7280", // Placeholder text color
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                  color: darkMode ? "#ffffff" : "#000000",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused
                    ? darkMode
                      ? "#E0E0E0" // Hover color in dark mode (gray-700)
                      : "#e5e7eb" // Hover color in light mode (gray-200)
                    : darkMode
                    ? "#1f2937" // Default option background in dark mode (gray-800)
                    : "#ffffff", // Default option background in light mode
                  color: darkMode ? "#ffffff" : "#000000",
                }),
              },
            }}
          />
        </div>

        {/* Trip Duration Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            className="w-full h-14 p-4 text-lg border border-gray-300 rounded-lg"
            placeholder="Ex.3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        {/* Budget Options */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${
                    formData?.budget == item.title &&
                    "shadow-2xl p-4 bg-gray-200 rounded-lg border-black"
                  }
                  `}
              >
                <h2 className="text-4xl mb-2">{item.icon}</h2>
                <h2 className="font-mono font-extrabold text-lg">
                  {item.title}
                </h2>
                <h2 className="text-sm text-gray-600">{item.description}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Companions */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan to travel with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelersList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${
                    formData?.traveler == item.people &&
                    "shadow-2xl p-4 bg-gray-200 rounded-lg border-black"
                  }
                  `}
              >
                <h2 className="text-4xl mb-2">{item.icon}</h2>
                <h2 className=" font-mono font-extrabold text-lg">
                  {item.title}
                </h2>
                <h2 className="text-sm text-gray-600">{item.description}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className="mt-10 mb-10 flex justify-end">
          <Button
            className="text-lg p-3 px-5 py-5 transition-transform duration-300 hover:animate-shake"
            disabled={loadingState}
            onClick={onGenerateTrip}
          >
            {loadingState ? (
              <AiOutlineLoading3Quarters   style={{ height: "1.75rem", width: "1.75rem"}}className="animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
          <div>
            <Dialog open={openDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription>
                    <div className="flex justify-center items-center">
                      <img
                        src="/logo.svg"
                        className="flex justify-center items-center"
                      />
                    </div>

                    <h2 className="font-bold text-lg mt-7">
                      Sign In With Google
                    </h2>
                    <p>
                      Sign in to the App with Google authentication securely
                    </p>
                    <Button
                      onClick={login}
                      className="w-full mt-5 flex gap-4 items-center"
                    >
                      <FcGoogle
                        style={{ height: "1.75rem", width: "1.75rem" }}
                      />
                      Sign In With Google
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createtrip;
