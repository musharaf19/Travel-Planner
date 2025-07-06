import { GetPlacesDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import Viewtrip from "@/view-trip/[tripId]";
import { Scale } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";

function UserTripCardItem({ trip, onDelete }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };
    const result = await GetPlacesDetails(data).then((resp) => {

      const photourl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoUrl(photourl);
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (onDelete) {
      onDelete(trip.id);
    }
  };

  return (
    <div>
      <Link to={"/view-trip/" + trip?.id}>
        <div className="hover:scale-105 transition-all">
          <div className="relative">
            <img
              src={photoUrl}
              referrerPolicy="no-referrer"
              className="object-cover rounded-xl w-full h-[150px]"
            />
            <button
              className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1 hover:bg-red-100 z-10"
              onClick={handleDelete}
              type="button"
            >
              <Trash className=" w-8 h-8 hover:text-red-600" />
            </button>
          </div>
          <div>
            <h2 className="font-bold text-lg mt-3">
              {trip?.userSelection?.location?.label}
            </h2>
            <h2 className="text-sm text-gray-500">
              {trip?.userSelection?.noOfDays} Days trip with{" "}
              {trip?.userSelection?.budget} Budget
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default UserTripCardItem;
