import Chatbot from "@/components/Chatbot";
import { Button } from "@/components/ui/button";
import { GetPlacesDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Place Photo
  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      };
      const response = await GetPlacesDetails(data);
      
      const photos = response?.data?.places?.[0]?.photos;
      if (photos && photos.length > 3) {
        const imageUrl = PHOTO_REF_URL.replace("{NAME}", photos[3].name);
        console.log("Generated Image URL:", imageUrl); // Debugging
        setPhotoUrl(imageUrl);
      } else {
        console.warn("No valid photo found, using placeholder.");
        setPhotoUrl("/placeholder.jpg");
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
      setPhotoUrl("/placeholder.jpg"); // Fallback image
    } finally {
      setLoading(false);
    }
  };

  // Handle Sharing
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check this out!",
          text: `Hey! Check out this amazing trip to ${trip?.userSelection?.location?.label}.`,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Sharing is not supported on this device.");
    }
  };

  return (
    <div>
      <Chatbot/>
      {/* Image Section */}
      {loading ? (
        <p className="text-center">Loading image...</p>
      ) : (
        <img
          key={photoUrl} // Forces re-render
          src={photoUrl}
          alt="Trip Location"
          referrerPolicy="no-referrer" 
          className="h-[400px] w-full object-cover rounded-xl"
          onError={(e) => {
            e.target.src = "/placeholder.jpg"; // Fallback if image fails to load
          }}
        />
      )}

      {/* Trip Info */}
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">
              📆 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg">
              🍾 No. of Travelers: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>

        {/* Share Button */}
        <Button
          onClick={handleShare}
          className="flex items-center gap-2 bg-gray-700 hover:bg-black text-white px-4 py-2 rounded-lg shadow-md"
        >
          <IoIosSend /> Share
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
