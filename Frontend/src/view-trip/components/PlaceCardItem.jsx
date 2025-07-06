import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GetPlacesDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState("/placeholder.jpg"); // Default fallback
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (place?.placeName) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      setLoading(true); // Show placeholder while loading
      const data = { textQuery: place.placeName };
      const response = await GetPlacesDetails(data);
  
      const photos = response?.data?.places?.[0]?.photos;
      let imageUrl = "/placeholder.jpg"; // Default
  
      if (Array.isArray(photos) && photos.length > 0) {
        const photoName = photos[3]?.name || photos[0]?.name; // Try different indexes
        if (photoName) {
          imageUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
          console.log("Generated Image URL:", imageUrl);
        }
      } else {
        console.warn("No valid photo found, using placeholder.");
      }
  
      setPhotoUrl(imageUrl);
    } catch (error) {
      console.error("Error fetching place photo:", error);
      setPhotoUrl("/placeholder.jpg"); // Fallback image
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="border rounded-xl p-3 mt-3 flex gap-5 hover:scale-105 transition-all hover:shadow-lg cursor-pointer">
      {loading ? (
        <div className="w-[130px] h-[130px] bg-gray-200 animate-pulse rounded-xl"></div> // Placeholder while loading
      ) : (
        <img
          src={photoUrl}
          className="w-[130px] h-[130px] rounded-xl object-cover"
          referrerPolicy="no-referrer" 
          onError={(e) => (e.target.src = "/placeholder.jpg")} // Fallback if image fails
        />
      )}

      <div>
        <h2 className="font-bold text-lg">{place?.placeName}</h2>
        <p className="text-sm text-gray-400">{place?.placeDetails}</p>
        <h2 className="mt-2">🕙 {place?.timeTravel}</h2>

        {/* 🔹 Google Maps Link Button */}
        <Link
          to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`}
          target="_blank"
        >
          <Button className="flex items-center gap-2 bg-gray-600 hover:bg-black text-white px-4 py-2 rounded-lg shadow-md mt-2 w-full sm:w-40 md:w-32 text-sm sm:text-base">
            <FaLocationDot /> Let's Go
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PlaceCardItem;
