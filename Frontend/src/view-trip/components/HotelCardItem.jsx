import { GetPlacesDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState("/placeholder.jpg"); // Default fallback image
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!photoUrl || photoUrl === "/placeholder.jpg") {
      GetPlacePhoto();
    }
  }, [hotel]);
  

  const GetPlacePhoto = async () => {
    try {
      setLoading(true); // Show loading state before fetching
      const data = {
        textQuery: hotel?.hotelName,
      };
      const result = await GetPlacesDetails(data);

      const photos = result?.data?.places?.[0]?.photos;
      if (photos && photos.length > 3) {
        const imageUrl = PHOTO_REF_URL.replace("{NAME}", photos[3].name);
        setPhotoUrl(imageUrl);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      key={hotel?.hotelName}
      to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.hotelAddress}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        {loading ? (
          <div className="h-[180px] w-full bg-gray-200 animate-pulse rounded-lg"></div> // Placeholder while loading
        ) : (
          <img 
          src={photoUrl} 
          alt={hotel?.hotelName} 
          referrerPolicy="no-referrer" 
          className="rounded-lg h-[180px] w-full object-cover" 
          onError={(e) => { 
            console.error("Image failed to load:", photoUrl); 
            e.target.src = "/placeholder.jpg"; 
          }}
        />
      
        )}
        <div className="my-2 flex-col gap-2">
          <h2 className="font-medium">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
          <h2 className="text-xs">💰 {hotel?.price}</h2>
          <h2 className="text-xs">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
